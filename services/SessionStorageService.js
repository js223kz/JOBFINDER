"use strict";
/**
 * a service that returns strings of session names
 * to avoid string dependencies in controllers and
 * services
 */
app.service('SessionStorageService', function(){
   this.jobListSession = function(){
       return "jobList";
   },

    this.positionSession = function(){
       return "userPosition";
   },
    
    this.jobDetailsSession = function(){
       return "jobDetails";
   },
   
   this.latestUpdateSession = function(){
       return "latestUpdate";
   }
});
