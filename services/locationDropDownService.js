app.service('LocationDropDownService', ['$http', '$state', function($http, $state){                          
    var self = this;
    
    self.getLocations = function(){
        
        
        $http.post('backend/getLocations.php', data).success(function(response){
            if(response === 'unauthorized'){
                //$state.go('login');
            }else{
               //console.log('Logged in');
                return response;
            }
         }).error(function(error){
            console.log(error);
            $state.go('login');
        });
    }
            
}]);