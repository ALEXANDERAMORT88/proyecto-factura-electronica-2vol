<?php

// Permitir cualquier origen (puedes restringirlo a http://localhost:4200 si quieres)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Si es una petición OPTIONS, respondemos vacío y terminamos
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . '/../controllers/register.php';

$authController = new AuthController();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$uri = $_SERVER["REQUEST_URI"];

header("Content-Type: application/json");

// Rutas para registrar.

if ($requestMethod === "POST"  && strpos($uri, "/register") !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $authController->register($data);
} elseif ($requestMethod === "POST" && strpos($uri, "/login") !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $authController->register($data);
} else {
    echo json_encode(["success" => false, "message" => "Ruta no encontrada"]);
}