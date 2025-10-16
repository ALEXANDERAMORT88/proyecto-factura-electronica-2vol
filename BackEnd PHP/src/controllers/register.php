<?php

// Inicilmente lo que hacemos es importar los archivos que contienen la clase User. 
require_once __DIR__ . '/models/User.php';

// Vamos a indicarle al navegador que vamos  a tener respuestas en tipo JSON.
header('Content-Type: application/json; charset=utf-8');
// Creamoas una instancia de la calse User, para usar sus metodos. 
$userModel = new User();

// Función para crear una empresa el cual rescibe como parametro $data.
function crearEmpresa($data)
{
    // Nos permite usar esta variable 
    global $userModel;


    // Lo que haremos a continuación dentro den try es ejecutar si hay un error. 
    try {
        // Validaciones básicas, para validar si los campos vienen vacios 
        if (empty($data['email']) || empty($data['passwordIngreso']) || empty($data['nombre'])) {
            http_response_code(400);

            // Devolvemos un JSON en consola
            echo json_encode([
                'message' => 'Error en la validación de datos',
                'errores' => 'Los campos nombre, email y contraseña son obligatorios.'
            ]);
            return;
        }

        // Registrar empresa, lo que hace es llamar al metodo User para guardar la empresa en DB. 
        $result = $userModel->register($data);

        http_response_code(201);
        echo json_encode([
            'message' => 'Empresa creada exitosamente ✅',
            'empresa' => $result
        ]);
        // Y dentro del catch campturamos el error y asi evitamos que el programa se caiga. 
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Error interno del servidor 📟',
            'error' => $e->getMessage()
        ]);
    }
}

// Función para iniciar sesión
function login($request)
{
    global $userModel;

    try {
        // Creamos una variable la cual contenga request y con el operdor ?? validamos si no exite use por defecto "".
        $email = $request["email"] ?? "";
        $passwordIngreso = $request["passwordIngreso"] ?? "";

        if (empty($email) || empty($passwordIngreso)) {
            http_response_code(400);
            echo json_encode([
                'message' => 'Debe ingresar el correo electrónico y la contraseña'
            ]);
            return;
        }
        // llamamos al metodo Login para validar las credenciales contra la DB. 
        $result = $userModel->login($email, $passwordIngreso);

        //Hacemos la validacion si no es null o false continuamos con el registro de inicio de sesión. 
        if ($result) {
            http_response_code(200);
            echo json_encode([
                'message' => 'Inicio de sesión exitoso ✅',
                'usuario' => $result
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'message' => 'Credenciales inválidas ❌'
            ]);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Error interno del servidor 📟',
            'error' => $e->getMessage()
        ]);
    }
}

// Ruteo simple según el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Verificar si el login viene por ?action=login
    if (isset($_GET['action']) && $_GET['action'] === 'login') {
        // Leemos el cuerpo POST, el JSON que enviamos desde Angular. 
        $input = json_decode(file_get_contents('php://input'), true);
        login($input);
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        crearEmpresa($input);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'message' => 'Método no permitido'
    ]);
}
