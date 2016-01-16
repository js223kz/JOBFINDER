app.controller('StartController', function($scope, CountyDataService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    var userPosistion = {
            lat: undefined,
            lng: undefined,
            city: undefined,
            county: undefined,
            id: undefined,
     }
        
    
    
    if(localStorage.getItem("userPosition") === null){
        
        CountyDataService.getUserPosition().then(function(position){
            if(angular.isNumber(position.lat) && angular.isNumber(position.lng)){
                
                userPosistion.lat = position.lat;
                userPosistion.lng = position.lng;
                CountyDataService.getCountyName(position).then(function(json){
                    
                    CountyDataService.getCountyCode(json).then(function(position){
                        userPosistion.county = position.county;
                        userPosistion.city = position.city;
                        
                        CountyDataService.getCountyId().then(function(countyId){
                            userPosistion.id = countyId;
                            localStorage.setItem("userPosition", JSON.stringify(userPosistion));
                            
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
       
    }else{
        var storedPosition = localStorage.getItem("userPosition");
        var jsonObj = JSON.parse(storedPosition);
        $scope.city = jsonObj.city;
        $scope.county = jsonObj.county;
    }
});