app.controller('JobDetailsController', function($scope, CountyDataService, PlatsbankenService, JobIdService){

    $scope.$on('id_shared',function(){
      var id = JobIdService.getId();
        console.log(id);
    });

  
});
