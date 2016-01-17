app.service('PlatsbankenService', ['$http', '$q', function($http, $q){
    this.getAvailableJobs = function(county){
       return $q(function(resolve, reject){
                
                $http.get('backend/GetAvailableJobs.php?county='+county)
                .success(function(response){
                    console.log(response);
                    resolve(response);
                }).error(function(error){
                    console.log(error);
                    reject("Vi kan för tillfället inte hämta information om din position. Försök igen!");
                });    
                
            });
    }
    
    
    
    
}]);