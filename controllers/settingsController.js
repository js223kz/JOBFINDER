app.controller('SettingsController', function($scope, $http, $state){
    
    
    $scope.UpdateCounties = function(){
         $http.get('backend/getCounties.php').success(function(response){
            console.log(response);
         }).error(function(error){
            console.log(error);
        });
   };
   
    $scope.UpdateCities = function(){
        $http.get('backend/getCities.php').success(function(response){
            console.log(response);
         }).error(function(error){
            console.log(error);
        });
    };
    
     $scope.UpdateCounties();
    
   // localStorage.setItem("settings", "Malmö");
    
});