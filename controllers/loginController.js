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
            localStorage.setItem("username", JSON.stringify({username: response}));
        }).error(function(error){
            console.log(error);
        })
    }
    
    $scope.loginUser = function(){
        var userInput = {
            username: $scope.loginData.username,
            password: $scope.loginData.password
        }
        
         $http.post('backend/login.php', userInput).success(function(response){
            console.log(response);
            localStorage.setItem("username", JSON.stringify({username: response[0]}));
        }).error(function(error){
            console.log(error);
        })
    }
    
});