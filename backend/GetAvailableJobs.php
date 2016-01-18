<?php 
error_reporting(~0); ini_set('display_errors', 1);
include('PlatsbankenApiRequest.php');

    if (isset($_GET['county'])) {
        $countyId = $_GET['county'];
        $jobCategory = "3";
        $availableJobs = getResponse("platsannonser/matchning?lanid=$countyId&yrkesomradeid=$jobCategory");
        
        header('Content-Type: application/json');
        echo $availableJobs;
    }
?>