"use strict";

//Lists available jobs
app.controller('PlatsbankenController', function($scope, $state, $filter, CountyDataService, PlatsbankenService, JobDetailsService, JobIdService){
    $scope.error = "";
    $scope.city = "";
    $scope.county = "";
    $scope.loading = true;
    $scope.jobs = "";

    //empty cached jobdetails
    JobDetailsService.emptyJobDetailCache();
    
    $scope.isDataInCache = false;
  
    //Backbutton
    $scope.goBack = function(){
        $state.go('start');
    }
    
    //User clicks on specific job in list
    $scope.getjobDetails = function(id){
        $scope.loading = true;
        JobIdService.sendId(id);
        $state.go('jobdetails');
    };
    
    //Shows user current position
    $scope.updatePositionText = function(position){
        $scope.city = position.city;
        $scope.county = position.county;
    };

    
    $scope.upDateJobs = function(){
        var position = CountyDataService.getCachedPosition();
        var timeToUpdate = $scope.checkLatestUpdateJobs();
        
        //checks if time to update (3 hour interval)
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
            //if not time to update
            PlatsbankenService.getCachedJobs().then(function(jobs){
                $scope.jobs = jobs;
            }, function(error){
                $scope.error = error;
            })
        }
        $scope.loading = false;
    };

    //User clicked update position
    //or no position is cached
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
    
    //Checks how long joblist has been cached
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

    //When application loads
    //if first time user update position and jobs
    //if not first time user get cached data
    //if cached jobs are older than three hours update jobs
    if(CountyDataService.getCachedPosition() === undefined){
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
