<?php

     include('databaseconnection.php');
     //takes a json encoded string and converts it into php variables
    $userInput = json_decode(file_get_contents('Php://input'));
    
    $username = $userInput->username;
    $password = hashPassword($userInput->password);  

       
    $query = "INSERT INTO users (username, password) VALUES (:username, :password)";

    $prepare = $db->prepare($query);
    $execute = $prepare->execute(array(
        ":username" => $username,
        ":password" => $password
    ));

    //takes php variables and convert them into json encoded string
    echo json_encode($username);

    function hashPassword($password)
    {
        $options = [
            'cost' => 9,
        ];
        $password = password_hash($password, PASSWORD_DEFAULT, $options);//can return null
        return $password;
    }
?>