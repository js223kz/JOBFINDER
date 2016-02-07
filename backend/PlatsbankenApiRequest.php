<?php
include('Settings.php');

    function getResponse($urlExtension){
        $curl = curl_init();
        $url = "http://api.arbetsformedlingen.se/af/v0/" . $urlExtension;
        
        curl_setopt ($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
       
        $headers = getHeaders();
        
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            
        $result = curl_exec ($curl);
        if($errno = curl_errno($curl)) {
            throw new Exception();
        }
        curl_close ($curl);  
        return $result;
    }   
?>