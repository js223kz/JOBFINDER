app.service('AuthenticationService', ['$http', '$state', function($http, $state){                          
    var self = this;
    
    self.authenticateUser = function(token){
        var data = {token : token}
        
        $http.post('backend/checkAuthentication.php', data).success(function(response){
            if(response === 'unauthorized'){
                $state.go('login');
            }else{
               console.log('Logged in');
                return response;
            }
         }).error(function(error){
            console.log(error);
            $state.go('login');
        });
    }
            
}]);