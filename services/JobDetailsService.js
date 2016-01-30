app.service('JobDetailsService', function($http, $q, SessionStorageService){
    var details = SessionStorageService.jobDetailsSession();
    
    this.getCachedJobDetails = function(){
        var jobDetails = JSON.parse(sessionStorage.getItem(details));
        if(jobDetails != undefined){
            return jobDetails;
        }else{
            return null;
        }
    },

    
    this.getJobDetails = function(jobId){ 
        var deferred = $q.defer();
        $http.get('backend/GetJobDetails.php?jobid='+jobId).then(function(response){
            sessionStorage.setItem(details, JSON.stringify(response.data));
            deferred.resolve();                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
        });
       return deferred.promise;
    }  
   
   
   
});

