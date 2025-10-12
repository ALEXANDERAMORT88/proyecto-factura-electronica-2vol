<?php

// Servicio para registrar un usuario en MongoDB

// Con require_once incluimos el archivo User.php ubicado en la carpeta models.
// __DIR__ obtiene la ruta del directorio actual y garantiza que el archivo se busque correctamente sin importar desde dónde se ejecute el script.
// Esto permite acceder a las clases o funciones del modelo de usuario necesarias para registrar o gestionar empresas.
require_once __DIR__ . '/../models/User.php';


// Declaramos una clase.
class AuthController
{
    // Se define una propiedad que solo podremos usar dentro de la clase, con el propósito de guardar una instancia del modelo User. 
    private $userModel;
     // El constructor sera ejecutado cuando se crea new AuthController.
    public function __construct()
    {
        // Se crea una nueva instancia de la clase User y se asigna a la propiedad $this->userModel
        $this->userModel = new User();
    }

    // Es el metodo publico que espera recibir un array asociativo $request que contiene los capos del formulario. 
    public function register($request)
    {
        // Se crea la variable que contiene un array y con el uso del operador ?? podemos validar si tiene datos o no, y poder registrar el usuario. 
        $data = [
            "tipoDocumento" => $request["tipoDocumento"] ?? "",
            "nombre" => $request["nombre"] ?? "",
            "celular" => $request["celular"] ?? "",
            "numeroDocumento" => $request["numeroDocumento"] ?? "",
            "email" => $request["email"] ?? "",
            "passwordIngreso" => $request["passwordIngreso"] ?? ""
        ];
        // Llama al merodo register del modelo User pasando $data. Espera que método del modelo retorne algún resultado. 
        $result = $this->userModel->register($data);
        // echo nos ayuda a imprimir la respuesta HTTP en consola y json_encode lo que hace es convertir esa respuesta en JSON. 
        echo json_encode($result);
    }
    // Es el metodo publico que va a extraer email y passwordIngreso del $request y tambien usamos el operador ??.
    public function login($request)
    {
        $email = $request["email"] ?? "";
        $passwordIngreso = $request["passwordIngreso"] ?? "";

        // realizamos el llamado y esperamos que el modelo valide las credenciales y nos devuelva un resultado. (por ejemplo: éxito/fallo, token, datos del usuario).
        $result = $this->userModel->login($email, $passwordIngreso);
        // Nuevamente usamos echo y json_encode para responder. 
        echo json_encode($result);
    }
}
