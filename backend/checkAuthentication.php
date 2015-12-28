<?php 

    include('databaseconnection.php');
    $data = json_decode(file_get_contents('Php://input'));

    $token = $data->token;

    $checkToken = $db->query("SELECT * FROM users WHERE token = '$token'");
    $tokenFound = $checkToken->fetchObject();

    if(count($tokenFound) === 1){
        echo 'authorized';
    }else{
        echo 'unauthorized';
    }



?>