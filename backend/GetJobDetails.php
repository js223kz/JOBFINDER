<?php 
include('PlatsbankenApiRequest.php');

    try{
        if (isset($_GET['jobid'])) {
            if(is_numeric($_GET['jobid'])){
                $jobId = $_GET['jobid'];
                $jobDetails = getResponse("platsannonser/$jobId");

                header('Content-Type: application/json');
                echo $jobDetails;
            }else{
               echo http_response_code(400);
            }
        }
    }catch(Exception $e){
        echo http_response_code(500);
    }
?>