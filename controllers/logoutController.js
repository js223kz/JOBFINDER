app.controller('LogoutController', function($scope, $state, $http){
    var token = localStorage["token"];
    
    $scope.logout = function(){
        var data = {
            token : token
        }
        
        $http.post("backend/logout.php", data).success(function(response){
            console.log(response);
            localStorage.clear();
            state.go('login');
        }).error(function(error){
            console.log(error);
        });
    }
    
});