app.controller('StartController', function($geolocation, $scope, $http){
    
    $scope.userPos = {
        lat: undefined,
        lng: undefined,
        city: undefined,
        county: undefined,
        id: undefined,
    }
    $scope.$geolocation = $geolocation;
    $scope.baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
   

    // basic usage
   $geolocation.getCurrentPosition().then(function(location) {
        $scope.location = location;
        $scope.lat = $scope.location.coords.latitude;
        $scope.lng = $scope.location.coords.longitude;
        
        $http.get($scope.baseUrl + $scope.lat + ',' + $scope.lng)
            .success(function(response){
                
            $scope.getCountyCode(response, $scope.lat, $scope.lng);
            
            }).error(function(error){
                return null;
        });         
    });

    $scope.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs*/ 
    
    $scope.getCountyCode = function(response, lat, lng){
        
         //getting name of county   
        $scope.countyPosition = response["results"].length -2;
        $scope.county = response["results"][$scope.countyPosition].formatted_address;
        $scope.userPos.county = $scope.county.split(',')[0];
        
        //getting name of city
        $scope.cityPosition = response["results"].length -4;
        $scope.city = response["results"][$scope.cityPosition].formatted_address;
        $scope.userPos.city = $scope.city.split(',')[0];
        
        $scope.userPos.lat = lat;
        $scope.userPos.lng = lng;

        $scope.getCountyId($scope.userPos.county);
    };
    
    $scope.getCountyId = function(county){
        
        $http.get("files/counties.json").success(function(response){
            angular.forEach(response, function(value, index) {
                    if(value.namn == county){
                        $scope.userPos.id = value.id;
                        localStorage.setItem("userPosition", JSON.stringify($scope.userPos));
                    }
                  
              
            });
            
        }).error(function(error){
            
        });
    };
});

 