<?php 
/*gets details on a specific job*/
include('PlatsbankenApiRequest.php');

    try{
        //jobid from frontend
        if (isset($_GET['jobid'])) {

            $jobId = $_GET['jobid'];

            //sends urlextension to PlatsbankenApiRequsest.php
            $jobDetails = getResponse("platsannonser/$jobId");

            //send response to frontend
            header('Content-Type: application/json');
            echo $jobDetails;

        }
    }catch(Exception $e){
        echo http_response_code(500);
    }
?>