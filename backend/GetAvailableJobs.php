<?php
include('PlatsbankenApiRequest.php');

    try{
        if (isset($_GET['county'])) {
            if(is_numeric($_GET['county'])){
                $countyId = $_GET['county'];
                $jobCategory = "3";
                $availableJobs = getResponse("platsannonser/matchning?lanid=$countyId&yrkesomradeid=$jobCategory");

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