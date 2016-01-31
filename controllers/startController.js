app.controller('StartController', function($scope, $state){

    $scope.doneLoading = false;

    $scope.goToPlatsbanken = function(){
        $scope.doneLoading = true;
        $state.go('platsbanken');
    };
});
