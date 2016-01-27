app.service('JobDetailsService', ['$http', '$q', function($http, $q){
    this.getCachedJobDetails = function(){
        var jobDetails = JSON.parse(sessionStorage.getItem('jobDetails'));
        if(jobDetails != undefined){
            return jobDetails;
        }else{
            return null;
        }
    },

    
    this.getJobDetails = function(jobId){ 
        var deferred = $q.defer();
        $http.get('backend/GetJobDetails.php?jobid='+jobId).then(function(response){
            sessionStorage.setItem('jobDetails', JSON.stringify(response.data));
            deferred.resolve();                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
        });
       return deferred.promise;
    }  
   
   
   
}]);

//