<?php
// Configuraciòn de conexiòn a MongoDB

require_once __DIR__ . '/../../vendor/autoload.php';

use MongoDB\Client;


class DataBase
{
    private $empresa;
    private $db;

    public function __construct()
    {
        try {
            //Conexión local 
            $this->empresa = new Client("mongodb://localhost:27017");
            $this->db = $this->empresa->selectDatabase("DBEmpresas");
        } catch (Exception $e) {
            die(json_encode(["error" => "Error al conectar a MongoDB: " . $e->getMessage()]));
        }
    }
    public function getCollection($collection)
    {
        return $this->db->selectCollection(($collection));
    }
}
