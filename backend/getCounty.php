<?php 
error_reporting(~0); ini_set('display_errors', 1);
include('afApiRequest.php');

    $result = getResponse("platsannonser/soklista/kommuner?lanid=9");

    $fp = fopen('files/cities.json', 'w');
    fwrite($fp, $result);
    fclose($fp);

    //$file = "files/counties.json";
    //$json = json_decode(file_get_contents($file), true);

    //$fp = fopen('files/cities.json', 'w');
    //echo '<pre>' . print_r($json, true) . '</pre>';



?>