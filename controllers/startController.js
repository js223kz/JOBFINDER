"use strict";
//Application navigation
app.controller('StartController', function($scope, $state, JobDetailsService){

    //$scope.loading = false;
    $scope.showInfo = false;

    //empty cached jobdetails if set
    JobDetailsService.emptyJobDetailCache();

    $scope.goToPlatsbanken = function(){
        $state.go('platsbanken');
        //$scope.loading = true;
    };
    
    $scope.showJobfinderInfo = function(){
        $scope.showInfo = true;
    }
    
    $scope.close = function(){
        $scope.showInfo = false;
    }
});
