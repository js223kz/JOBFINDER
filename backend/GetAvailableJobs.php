<?php

//gets all jobs within users county
//based on user current position
include('PlatsbankenApiRequest.php');

    try{
        //gets county id from frontend
        if (isset($_GET['county'])) {
            //check to se that it is a number
            if(is_numeric($_GET['county'])){
                $countyId = $_GET['county'];
                $jobCategory = "3";

                //sends extension url to PlatsbankenApiRequest.php
                $availableJobs = getResponse("platsannonser/matchning?lanid=$countyId&yrkesomradeid=$jobCategory");

                //send response to frontend
                header('Content-Type: application/json');
                echo $availableJobs;
            }else{
               echo http_response_code(400);
            }
        }
    }catch(Exception $e){
        echo http_response_code(500);
    }
?>