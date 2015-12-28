app.controller('ListsController', function($scope, $state, $http, AuthenticationService){
    var token;
    
    if(localStorage['token']){
        token = localStorage['token'];
        
    }else{
        token = "something";
    }
    
    AuthenticationService.authenticateUser(token);
   
    $scope.logout = function(){
        var data = {
            token : token
        }
        
        $http.post("backend/logout.php", data).success(function(response){
            console.log(response);
            localStorage.clear();
            $state.go('login');
        }).error(function(error){
            console.log(error);
        });
    }
    
});