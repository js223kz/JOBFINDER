app.controller('JobDetailsController', function($scope, JobIdService, JobDetailsService, $state){
    $scope.loading = true;
    $scope.setJobtextInfo = function(){
        var data = JobDetailsService.getCachedJobDetails();
        var base = data.platsannons;
        $scope.headLine = base.annons.annonsrubrik;
        $scope.text = base.annons.annonstext;
        $scope.numberOfPositions = base.annons.antal_platser;
        $scope.workPlace = base.arbetsplats.arbetsplatsnamn;
        $scope.address = base.arbetsplats.besoksadress;
        $scope.city = base.arbetsplats.besoksort;
        $scope.webPage = base.arbetsplats.hemsida;
        $scope.phone = base.arbetsplats.telefonnummer;
        $scope.dailyHours = base.villkor.arbetstid;
        $scope.timeSpan = base.villkor.varaktighet;
        $scope.salary = base.villkor.lonetyp;
        $scope.car = base.krav.egenbil;
        $scope.reference = base.ansokan.referens;
        $scope.applicationWeb = base.ansokan.webadress;
        $scope.applicationEmail = base.ansokan.epostadress;
        $scope.lastDay = base.ansokan.sista_ansokningsdag;
        $scope.otherInfo = base.ansokan.ovrigt_om_ansokan;
        
        $scope.loading = false;
    };
    
    $scope.goBack = function(){
        $state.go('platsbanken');
    }
    
    if(JobDetailsService.getCachedJobDetails() === null){
        JobDetailsService.getJobDetails(JobIdService.getId()).then(function(){
            $scope.setJobtextInfo();
            
         }, function(error){
            $scope.error = error;
        });
    }else{
        $scope.setJobtextInfo();
    }
});
           