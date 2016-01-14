<?php

include('afApiRequest.php');

    $result = getResponse("platsannonser/soklista/kommuner");
    print $result;
?>