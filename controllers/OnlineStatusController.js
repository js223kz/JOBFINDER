app.controller( 'OnlineStatusController', function($scope, OnlineStatusService) {
    $scope.onlineStatus = OnlineStatusService;

    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status_string = online ? 'online' : 'offline';
        console.log($scope.onlineStatus.isOnline());
    });
});