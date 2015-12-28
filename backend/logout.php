<?php 
    include('databaseconnection.php');

    $reqData = json_decode(file_get_contents('Php://input'));
    $token = $reqData->token;

    // Delete rows in "sites", according to the value of "category" column
    $stmt = "UPDATE users SET token = '' WHERE token = $token";
    $query = $db->prepare($stmt);
    $query->execute();
        





?>