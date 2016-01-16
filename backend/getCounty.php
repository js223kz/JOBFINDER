<?php 
error_reporting(~0); ini_set('display_errors', 1);
include('afApiRequest.php');
    //$result = getResponse("55.39226069999999420" ,"12.836723099999999")
    //$result = getResponse("platsannonser/soklista/kommuner?lanid=9");

    $fp = fopen('files/cities.json', 'w');
    fwrite($fp, $result);
    fclose($fp);

    //$file = "files/counties.json";
    //$json = json_decode(file_get_contents($file), true);

    //$fp = fopen('files/cities.json', 'w');
    //echo '<pre>' . print_r($json, true) . '</pre>';



        $curl = curl_init();
        $url = "http://api.arbetsformedlingen.se/af/v0/" . $urlExtension;
        
        curl_setopt ($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
       
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            
        $result = curl_exec ($curl);
        if(curl_errno($curl)){
            //echo "fick ett fel";
            throw new Exception(curl_error($curl));
        }
        curl_close ($curl);  
        return $result;

?>