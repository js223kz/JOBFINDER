<?php
    function getResponse($urlExtension){
        $curl = curl_init();
        $url = "http://api.arbetsformedlingen.se/af/v0/" . $urlExtension;
        
        curl_setopt ($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        $headers = array();
        $headers[] = 'From: js223kz@student.lnu.se';
        $headers[] = 'Accept: application/json';
        $headers[] = 'Accept-Language: sv';
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            
        $result = curl_exec ($curl);
        if(curl_errno($curl)){
            echo "fick ett fel";
            echo curl_error;
            throw new Exception(curl_error($curl));
        }
        curl_close ($curl);  
        return $result;
    }   
?>