<?php 
error_reporting(~0); ini_set('display_errors', 1);
include('PlatsbankenApiRequest.php');

    if (isset($_GET['jobid'])) {
        $jobId = $_GET['jobid'];
        $jobDetails = getResponse("platsannonser/$jobId");

        //header('Content-Type: application/json');
        echo $jobDetails;
    }
?>