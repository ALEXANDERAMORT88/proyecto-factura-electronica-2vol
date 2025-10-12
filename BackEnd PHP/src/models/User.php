<?php

require_once __DIR__ . '/../config/db.php';

class User {
    private $collection;

    public function __construct() {
        $db = new DataBase();
        $this->collection = $db->getCollection("empresas");
    }

    // Registrar empresa 
    public function register($data) {

        //Validar todos los campos obligatorios
        $required = ["tipoDocumento", "nombre", "celular", "numeroDocumento", "email", "passwordIngreso"];

        foreach($required as $field) {
            if (empty($data[$field])) {
                return [
                    "success" => false,
                    "message" => "El campo '$field' es obligatorio"
                ];
            }
        }

        //Validamos si ya existe el número de documento. 

        $user = $this->collection->findOne(["numeroDocumento" => $data["numeroDocumento"]]);

        if ($user) {
            return ["success" => false, "message" => "El número de documento ya esta registrado"];
        }

        // Encriptar las contraseña 

        $data["passwordIngreso"] = password_hash($data["passwordIngreso"], PASSWORD_BCRYPT);

    // Inserta a mongoDB
    try {
        $result = $this->collection->insertOne($data);

        return[
            "success" => true,
            "message" => "Usuario registrado exitosamente",
            "empresa" => [
                "_id" => (string)$result->getInsertedId()
            ]
        ];
    } catch (Exception $e) {
        return [
            "success" => false,
            "message" => "Error al registrar: " . $e->getMessage()
        ];
    }
}

    //Login usuario 

    public function login($email, $passwordIngreso) {
        $user = $this->collection->findOne(["email" => $email]);

        if (!$user) {
            return ["succese" => false, "message" => "Usuario no encontrado"];
        }
        // verificamos la contraseña
        if (password_verify($passwordIngreso, $user["passwordIngreso"])) {
            return ["succses" => true, "message" => "Autenticación Exitosa"];
        } else {
            return ["success" => false, "message" => "Contraseña incorrecta"];
        }
    }
}