<?php
    include('databaseconnection.php');

    //takes a json encoded string and converts it into php variables
    $userInput = json_decode(file_get_contents('Php://input'));
    
    $username = $userInput->username;
    $password = $userInput->password;

    $user = $db->query("SELECT username FROM users WHERE username = '$username' AND password = '$password'");

    $user = $user->fetchAll();

    //takes php variables and convert them into json encoded string
    echo json_encode($user);

?>