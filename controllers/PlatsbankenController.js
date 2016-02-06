app.controller('PlatsbankenController', function($scope, $state, $filter, CountyDataService, PlatsbankenService, JobIdService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    $scope.jobs = "";
    $scope.loading = true;
    $scope.isDataInCache = false;

    $scope.getjobDetails = function(id){
        $scope.loading = false;
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
            PlatsbankenService.upDateJobs(position.id).then(function(){
                PlatsbankenService.getCachedJobs().then(function(jobs){
                    $scope.jobs = jobs;
                }, function(error){
                    $scope.error = error;
                })
            }, function (error){
                $scope.error = error;
            });
        }else{
            PlatsbankenService.getCachedJobs().then(function(jobs){
                $scope.jobs = jobs;
            }, function(error){
                $scope.error = error;
            })
        }


        $scope.loading = false;
    };

    $scope.upDatePosition = function(){
        CountyDataService.updateUserPosition().then(function(position){
            $scope.updatePositionText(position);
            PlatsbankenService.upDateJobs(position.id).then(function(){
                PlatsbankenService.getCachedJobs().then(function(jobs){
                    $scope.jobs = jobs;
                    $scope.loading = false;

                }, function(error){
                    $scope.error = error;
                })

            }, function(error){
                $scope.error = error;
            })
        }, function(error){
            $scope.error = error;
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
    }else{
        var position = CountyDataService.getCachedPosition();
        if(position == null){
            $scope.upDatePosition();
        }else{
            $scope.updatePositionText(position);
            $scope.isDataInCache = true;
            $scope.upDateJobs();
        }
    }
});
