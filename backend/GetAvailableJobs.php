<?php 
error_reporting(~0); ini_set('display_errors', 1);
include('PlatsbankenApiRequest.php');

    if (isset($_GET['county'])) {
      $county = $_GET['county'];

      var_dump($county);
    }

    //$county = $_GET["param"];
   // $result= json_decode(file_get_contents('Php://input'));
   // var_dump($result["county"]);
    $jobCategory = "3";
    //$result = getResponse("platsannonser/matchning?lanid=$county&yrkesomradeid=$jobCategory");

    //$echo json_encode($result);

    /*$fp = fopen('files/cities.json', 'w');
    fwrite($fp, $result);
    fclose($fp);*/
?>