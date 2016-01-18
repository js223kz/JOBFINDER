app.controller('StartController', function($scope, CountyDataService, PlatsbankenService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    $scope.jobs = "";
    $scope.isDataInCache = false;
    
    
    
    $scope.getCachedPosition = function(){
        CountyDataService.getCachedPosition().then(function(position){
            $scope.updatePositionText(position).then(function(){
            }, function(reason){
           });
        }, function(reason){
            $scope.error = reason;                                   
        });
    };
    
    $scope.updatePositionText = function(position){
        $scope.city = position.city;
        $scope.county = position.county;
    };
    
    
   $scope.upDateJobs = function(position){
        //sätta en tidsgräns annars hämta cachat
        PlatsbankenService.upDateJobs(position.id).then(function(jobs){
            $scope.jobs = jobs;
        }, function(reason){
            $scope.error = reason;
        });
    };
    
    $scope.getCachedJobs = function(){
        PlatsbankenService.getCachedJobs().then(function(jobs){
            
        }, function(reason){
            $scope.error = reason;
        });
    };
    
    $scope.upDatePosition = function(){
        CountyDataService.updateUserPosition().then(function(position){
            $scope.updatePositionText(position).then(function(){
                $scope.upDateJobs(position.id).then(function(){
                    
                }, function(reason){
                    $scope.error = reason;
                });
                
            }, function(reason){
                $scope.error = reason;
            });
        }, function(reason){
            $scope.error = reason;
        });
    };
         
    if(sessionStorage.getItem("userPosition") === null){
        $scope.upDatePosition();
    }else{
        $scope.isDataInCache = true;
        $scope.getCachedPosition().then(function(){
            $scope.getCachedJobs().then(function(){
                
            }, function(reason){
                $scope.error = reason;
            });
        }, function(reason){
            $scope.error = reason;
        });
    }   
});
