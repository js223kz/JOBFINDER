app.service('UserPositionService', ['$q', '$scope', '$geolocation', function($q, $scope, $geolocation){
    //get device latitude and longitude
        this.getUserPosition =  function(){
            return $q(function(resolve, reject){
                var geolocation = $geolocation;
                geolocation.getCurrentPosition().then(function(location) {
                var position = {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
                if(!location.coords.error){
                    resolve(position);
                }else{
                    reject("Vi kan inte hämta din position för tillfället.");
                }
                });        
            });
        },    
}]);