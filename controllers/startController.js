app.controller('StartController', function($scope, CountyDataService, PlatsbankenService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    $scope.jobs = "";
    $scope.isDataInCache = false;
       
    $scope.getCachedPosition = function(){
        var position = CountyDataService.getCachedPosition();
        if(position === null){
           $scope.upDatePosition();
        }
        $scope.updatePositionText(position);
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
        $scope.jobs = PlatsbankenService.getCachedJobs();
        
        if($scope.jobs === null){
            $scope.upDatePosition();
        }
    };
    
    $scope.upDatePosition = function(){
        CountyDataService.updateUserPosition().then(function(position){
            $scope.updatePositionText(position);
            $scope.upDateJobs(position.id);
        }, function(reason){
            $scope.error = reason;
        });
    };  
    
    if(sessionStorage.getItem("userPosition") === null){
        $scope.upDatePosition();
    }else{
        $scope.getCachedPosition();
        $scope.isDataInCache = true;
        $scope.getCachedJobs();
    }   
});
