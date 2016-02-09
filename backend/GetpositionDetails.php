<?php


ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
//gets all jobs within users county
//based on user current position
include('GoogleMapsApi.php');

    try{
        $data = json_decode(file_get_contents("php://input"));
        $lat = $data->lat;
        $lng = $data->lng;
        if(is_numeric($lat) && is_numeric($lng)){
            //sends extension url to GoogleMapsApi.php
            $positionDetails = getResponse($lat, $lng);
            //send response to frontend
            header('Content-Type: application/json');
            echo $positionDetails;

        }else{
            echo http_response_code(400);
        }
    }catch(Exception $e){
        echo http_response_code(500);
    }
?>