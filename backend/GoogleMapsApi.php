<?php
/*Handles all communication with Google Maps API*/

    function getResponse($lat, $lng){
        $curl = curl_init();
        $url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lng";

        curl_setopt ($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

        $result = curl_exec ($curl);
        if($errno = curl_errno($curl)) {
            throw new Exception();
        }
        curl_close ($curl);
        return $result;
    }
?>