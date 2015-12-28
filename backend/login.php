<?php
    include('databaseconnection.php');

    //takes a json encoded string and converts it into php variables
    $userInput = json_decode(file_get_contents('Php://input'));
    
    $username = $userInput->username;
    $password = $userInput->password;

    $user = $db->query("SELECT * FROM users WHERE username = '$username'");

    $userFound = $user->fetchObject();
    
    $token;
    if(count($userFound) === 1){
        //found user with username
        if(password_verify($password, $userFound->password)){
            $token = generateToken($username);
            $stmt = "UPDATE users SET token=:token WHERE username=:username";
            $query = $db->prepare($stmt);
            $execute = $query->execute(array(
                "token" => $token,
                "username" => $username
            ));
            
            echo $token;
        
        }else{
            //password is wrong
        }
    }else{
        //username is wrong
    }

    function generateToken($username){
        session_start();
        $secretKey='xf3hdgstloy';
        $sessionId = session_id();
        session_unset();
        return $username.$sessionId.$secretKey;
    }

    

?>