app.controller('JobDetailsController', function($scope, JobIdService, JobDetailsService){
    $scope.error = "";
    $scope.id = "";
    
    $scope.$on('id_shared',function(){
        $scope.id = JobIdService.getId();
        JobDetailsService.getJobDetails($scope.id).then(function(jobDetails){
        }, function(error){
        $scope.error = error;
        });

     });
    
     

});
