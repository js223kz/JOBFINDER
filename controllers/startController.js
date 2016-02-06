app.controller('StartController', function($scope, $state){

    $scope.loading = false;
    $scope.showInfo = false;

    $scope.goToPlatsbanken = function(){
        $state.go('platsbanken');
        $scope.loading = true;
    };
    
    $scope.showJobfinderInfo = function(){
        $scope.showInfo = true;
    }
    
    $scope.close = function(){
        $scope.showInfo = false;
    }
});
