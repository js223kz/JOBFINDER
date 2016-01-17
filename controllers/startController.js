app.controller('StartController', function($scope, CountyDataService, PlatsbankenService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    var userPosition = {
            lat: undefined,
            lng: undefined,
            city: undefined,
            county: undefined,
            id: undefined,
     }
    if(localStorage.getItem("userPosition") === null){
        setUserPosition();
    }else{
        
        var storedPosition = localStorage.getItem("userPosition");
        var jsonObj = JSON.parse(storedPosition);
        $scope.city = jsonObj.city;
        $scope.county = jsonObj.county;
        var countyId = jsonObj.id;
        console.log(countyId);
        //PlatsbankenService.getAvailableJobs(countyId);
        
        
        
        /*var position = CountyDataService.getUserPosition().then(function(position){          
        var lat = jsonObj.lat;
        var lng = jsonObj.lng;
            
            if(position.lat != lat || position.lng != lng){
                $scope.setUserPosition();
            }
            
        }, function(reason){
            $scope.error = reason; 
        });
        
        
        $scope.city = jsonObj.city;
        $scope.county = jsonObj.county;
        var county = jsonObj.id;*/
        //PlatsbankenService.getAvailableJobs(county);
    }    
    
    $scope.upDatePosition = function(){
        setUserPosition();
    }
    
    function setUserPosition(){
       CountyDataService.getUserPosition().then(function(position){
            if(angular.isNumber(position.lat) && angular.isNumber(position.lng)){
                userPosition.lat = position.lat;
                userPosition.lng = position.lng;
                
                CountyDataService.getCountyName(position).then(function(json){
                                    
                    CountyDataService.getCountyCode(json).then(function(position){
                        userPosition.county = position.county;
                        userPosition.city = position.city;
                                               
                        CountyDataService.getCountyId(userPosition.county).then(function(countyId){
                            userPosition.id = countyId;
                            
                            if(localStorage.getItem("userPosition") != undefined){
                                localStorage.removeItem("userPosition");
                                //localStorage.removeNamedItem("userPosition");
                            }
                            localStorage.setItem("userPosition", JSON.stringify(userPosition));
                            $scope.city = userPosition.city;
                            $scope.county = userPosition.county;
                        }, function(reason){
                           $scope.error = reason; 
                        });
                    }, function(reason){
                        $scope.error = reason;
                    });
                }, function(reason){
                    $scope.error = reason;
                });
            }else{
                $scope.error = "Positionen har angivits i ett felaktigt format. Processen avbryts.";
            }
        }, function(reason){
            $scope.error = reason;
        }); 
    }   
});