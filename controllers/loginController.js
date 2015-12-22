app.controller('LoginController', function($scope, $http){
    
    //variables
    $scope.registerData = {
        username: undefined,
        password: undefined
    }
    
    $scope.loginData = {
        username: undefined,
        password: undefined
    }
    
    //functions
    $scope.registerUser = function(){
        var userInput = {
            username: $scope.registerData.username,
            password: $scope.registerData.password
        }
        
        $http.post('backend/register.php', userInput).success(function(response){
            console.log(response);
        }).error(function(error){
            console.log(error);
        })
    }
    
    $scope.loginUser = function(){
        var userInput = {
            username: $scope.loginData.username,
            password: $scope.loginData.password
        }
    }
    
});