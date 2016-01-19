app.service('PlatsbankenService', ['$http', '$q', '$filter', function($http, $q, $filter){
    var latestUpdate = 'latestUpdate';
    var jobList = 'jobList';
    
    this.upDateJobs = function(countyId){ 
        var deferred = $q.defer();
        $http.get('backend/GetAvailableJobs.php?county='+countyId).then(function(response){
            var date = new Date();
            sessionStorage.setItem(latestUpdate, date);
            sessionStorage.setItem(jobList, JSON.stringify(response));
            deferred.resolve(JSON.parse(sessionStorage.getItem(jobList)));                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
        });
       return deferred.promise;
    },    
    
    this.getCachedJobs = function(){    
        var cachedJobs = JSON.parse(sessionStorage.getItem(jobList));
        //var jobs = storedJobs.matchningslista.matchningdata;
        if(cachedJobs != undefined){
            return cachedJobs;
        }else{
            return null;
        } 
    } 
   
   this.getLatestUpdate = function(){
       var update = sessionStorage.getItem(latestUpdate);
       return update;
   }
   
}]);
