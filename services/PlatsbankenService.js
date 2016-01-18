app.service('PlatsbankenService', ['$http', '$q', function($http, $q){
   this.upDateJobs = function(county){ 
        var deferred = $q.defer();
        $http.get('backend/GetAvailableJobs.php?county='+county).then(function(response){
            var date = new Date();
            sessionStorage.setItem('lastUpdated', JSON.stringify(date));
            sessionStorage.setItem('jobList', JSON.stringify(response));
            deferred.resolve(JSON.parse(sessionStorage.getItem('jobList')));                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
        });
       return deferred.promise;
    },    
    
    this.getCachedJobs = function(){    
        var cachedJobs = JSON.parse(sessionStorage.getItem('jobList'));
        //var jobs = storedJobs.matchningslista.matchningdata;
        if(cachedJobs != undefined){
            return cachedJobs;
        }else{
            return null;
        } 
    } 
}]);
