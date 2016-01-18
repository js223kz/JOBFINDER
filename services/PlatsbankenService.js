app.service('PlatsbankenService', ['$http', '$q', function($http, $q){
       this.upDateJobs = function(county){ 
        return $q(function(resolve, reject){
            $http.get('backend/GetAvailableJobs.php?county='+county).then(function(response){
                var date = new Date();
                sessionStorage.setItem('lastUpdated', JSON.stringify(date)).then(function(){
                    sessionStorage.setItem('jobList', JSON.stringify(response)).then(function(){
                    resolve(JSON.parse(sessionStorage.getItem('jobList')));   
                }, function(reason){
                       reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
                    });
                }, function(reason){
                   reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
                });
          }, function(error){
                reject("Vi kan för närvarande inte hämta information från platsbanken. Försök igen om en stund.");
            });
        });
     },    
    
    this.getCachedJobs = function(){
        return $q(function(resolve, reject){
            var storedJobs = JSON.parse(sessionStorage.getItem('jobList'));
            var jobs = storedJobs.matchningslista.matchningdata;
            if(jobs != undefined){
                resolve(jobs);
            }else{
                reject("Kan inte hämta chachade jobb.")
            }
        });
    } 
}]);
