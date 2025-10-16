<?php
// Configuraciòn de conexiòn a MongoDB

// Incluimos el archivo autoload.php generado por Composer.
// Este archivo carga automáticamente las calses necesarias, como MongoDB/Client.
require_once __DIR__ . '/../../vendor/autoload.php';

// se importa la clase Client del paquete de MongoDB para poder crear la conexión.
use MongoDB\Client;

//Creamos la DB, la cual gestionará la conexión y el acceso a la DB. 
class DataBase
{
    //Propiedades privadas que almacenarán la conexión (cliente) y la DB seleccionada. 
    private $empresa;
    private $db;

    // Constructor: se ejecuta automáticamente cuando se crea una instancia de la clase.
    public function __construct()
    {
        try {
            // Se intenta establecer una conexión local con el servidor de MongoDB,
            // usando el puerto por defecto (27017).
            $this->empresa = new Client("mongodb://localhost:27017");
            // Se selecciona la base de datos llamada "DBEmpresas" y se guarda en la propiedad $db.
            $this->db = $this->empresa->selectDatabase("DBEmpresas");
        } catch (Exception $e) {
            // Si ocurre un error durante la conexión, se captura la excepción y se detiene el script,
            // devolviendo un mensaje de error en formato JSON.
            die(json_encode(["error" => "Error al conectar a MongoDB: " . $e->getMessage()]));
        }
    }

    // Método público que permite obtener una colección específica de la base de datos.
    // Ejemplo de uso: $database->getCollection("empresas");
    public function getCollection($collection)
    {
        // Retorna el objeto de la colección solicitada (permite realizar operaciones CRUD sobre ella).
        return $this->db->selectCollection(($collection));
    }
}
