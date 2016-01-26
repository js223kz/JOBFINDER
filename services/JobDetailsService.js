app.service('JobDetailsService', ['$http', '$q', function($http, $q){
   this.getJobDetails = function(jobId){ 
       console.log(jobId);
        var deferred = $q.defer();
        $http.get("backend/GetJobDetails.php?jobid='+jobId").then(function(response){
            console.log(JSON.stringify(response));
            deferred.resolve();                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
        });
       return deferred.promise;
    }   
   
}]);

//