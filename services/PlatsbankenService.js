"use strict";

app.service('PlatsbankenService', function($http, $q, $filter, SessionStorageService){
    var latestUpdate = SessionStorageService.latestUpdateSession();
    var jobList = SessionStorageService.jobListSession();
     
    this.getCachedJobs = function(){
        var deferred = $q.defer();
        var cachedJobs = JSON.parse(sessionStorage.getItem(jobList));
            if(cachedJobs !== undefined){
                deferred.resolve(cachedJobs.data.matchningslista.matchningdata);
            }else{
                deferred.reject("Vi kan för närvarande inte hämta information från platsbanken.");
            }
     return deferred.promise;
    } 
    
    this.upDateJobs = function(countyId){ 
        var deferred = $q.defer();
        $http.get('backend/GetAvailableJobs.php?county='+countyId).then(function(response){
            var date = new Date();
            sessionStorage.setItem(latestUpdate, date);
            sessionStorage.setItem(jobList, JSON.stringify(response));
            deferred.resolve();                   
        }, function(error){
            deferred.reject("Vi kan för närvarande inte hämta information från platsbanken.");
        });
       return deferred.promise;
    },    
      
   this.getLatestUpdate = function(){
      return sessionStorage.getItem(latestUpdate);
   }
   
});
