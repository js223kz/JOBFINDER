app.controller('StartController', function($scope, $state, $filter, CountyDataService, PlatsbankenService, JobIdService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    $scope.jobs = "";
    $scope.isDataInCache = false;
 
    $scope.getjobDetails = function(id){
        JobIdService.sendId(id);
        $state.go('jobdetails');
    };
    
    $scope.updatePositionText = function(position){
        $scope.city = position.city;
        $scope.county = position.county;
    };
    
    $scope.upDateJobs = function(){
        var position = CountyDataService.getCachedPosition();
        var timeToUpdate = $scope.checkLatestUpdateJobs();
               
        if(timeToUpdate){
            console.log("dags att uppdatera");
            PlatsbankenService.upDateJobs(position.id).then(function(){
            }, function (error){
                $scope.error = error;
            });
        }
         $scope.jobs = PlatsbankenService.getCachedJobs();
    };
    
    $scope.upDatePosition = function(){
        CountyDataService.updateUserPosition().then(function(position){
            $scope.updatePositionText(position);
            PlatsbankenService.upDateJobs(position.id).then(function(){
               $scope.jobs = PlatsbankenService.getCachedJobs();
                if($scope.jobs == null){
                    $scope.error = "Det finns inga lediga jobb där du befinner dig. Vi föreslår en flytt.";
                }
            }, function(error){
                $scope.error = reason;
            })
        }, function(reason){
            $scope.error = reason;
        });
    };  
    
    $scope.checkLatestUpdateJobs = function(){
        var milli = 60 * 60 * 1000;
        var lastUpdated = PlatsbankenService.getLatestUpdate();
        lastUpdated = new Date(lastUpdated);
        var now = new Date();
        
        var difference = Math.abs(lastUpdated - now);
        
        if(difference/milli > 3){
            return true;
        }else{
            return false;
        }
    }
    
    //check when application loads
    //if first time user update position and jobs
    //if not first time user get cached data
    //if cached jobs are older than three hours update jobs
    if(CountyDataService.getCachedPosition() === null){
        $scope.upDatePosition();
        console.log("uppdaterar allt");
    }else{
        var position = CountyDataService.getCachedPosition();
        if(position == null){
            $scope.upDatePosition();
            console.log("uppdaterar allt");
        }else{
            console.log("Hämtar cachat");
            $scope.updatePositionText(position);
            $scope.isDataInCache = true;
            $scope.upDateJobs(); 
        }       
    }   
});
