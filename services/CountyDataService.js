"use strict";
/*Gets user current position and
call Google Api to fetch current position
county*/
app.service('CountyDataService', function($http, $geolocation, $window, $q, SessionStorageService){

    var userPos = SessionStorageService.positionSession();
    
    //Is geolocation supported in users browser
    function supported() {
        return 'geolocation' in $window.navigator;
    }
    
    //returns chached position data
    this.getCachedPosition = function(){
        var position = JSON.parse(sessionStorage.getItem(userPos));
        if(position != undefined){
            return position;
        }else{
            return null;
        }
    }    

    //returns device current position
    function getUserPosition(){
        var deferred = $q.defer();
        if(supported()){
           var geolocation = $geolocation;
            geolocation.getCurrentPosition().then(function(location) {
                var position = {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
                if(!location.coords.error){
                    deferred.resolve(position);
                }else{
                  deferred.reject("Kan inte hämta din position. Försök igen.");
                }
            });        
        }else{
           deferred.reject("Din browser stödjer inte geolocation.");
        }
        return deferred.promise;  
    }
            
    //get position information from google maps
    function getCountyName(position){
        var deferred = $q.defer();
        var baseurl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
        var userposition = {
            lat: position.lat,
            lng: position.lng
        }

        $http.post("backend/GetPositionDetails.php", userposition).then(function(response){
            deferred.resolve(response);
        }, function(error){
            deferred.reject("Vi kan för tillfället inte hämta information om din position från Google Maps.");
        }); 
        return deferred.promise;
    }

    //retrieve county name and city name from json returned by Google maps    
    function getCountyCode(json){
        var deferred = $q.defer();
        var position = {
            city: undefined,
            county: undefined
        }
        //getting name of county (always on the same position in json response)
        var countyPosition = json.data["results"].length -2;
        var county = json.data["results"][countyPosition].formatted_address;
        var modifiedCounty = county.split(',')[0];
        modifiedCounty = modifiedCounty.replace("County", "län");
        position.county = modifiedCounty;

        //getting name of city (always on the same position in json response)
        var cityPosition = json.data["results"].length -4;
        var city = json.data["results"][cityPosition].formatted_address;
        position.city = city.split(',')[0];

        if(position.city != undefined || position.county != undefined){
            deferred.resolve(position);
        }else{
            deferred.reject("Vi kan för tillfället inte hämta information om vilket län du befinner dig i.")
        } 
        return deferred.promise;
    }
    
    //get county id from static json file with counties and id:s
    function getCountyId(county){
        var deferred = $q.defer();
        var countyId = null;
        $http.get("/files/counties.json").then(function(response){
            response.data.forEach(function(countyName){
                if(countyName.namn === county){
                    countyId = countyName.id;
                }
            });
            if(countyId != null){
                deferred.resolve(countyId)
            }else{
                deferred.reject("Länet du befinner dig i finns inte i listan över Sveriges län.");
            }
        }, function(error){
            deferred.reject("Länet du befinner dig i finns inte i listan över Sveriges län.");
        });
        return deferred.promise;
    }   
    
    /*Updates position when user requests
    application or presses update button*/
    this.updateUserPosition = function(){
        var deferred = $q.defer();
        var userPosition = {
        lat: undefined,
        lng: undefined,
        city: undefined,
        county: undefined,
        id: undefined
        }

       getUserPosition().then(function(position){
           if(angular.isNumber(position.lat) && angular.isNumber(position.lng)){
            userPosition.lat = position.lat;
            userPosition.lng = position.lng;

           getCountyName(position).then(function(json){
                getCountyCode(json).then(function(positionData){
                    userPosition.city = positionData.city;
                    userPosition.county = positionData.county;

                    getCountyId(positionData.county).then(function(countyId){
                        userPosition.id = countyId;
                        sessionStorage.setItem(userPos, JSON.stringify(userPosition));
                        deferred.resolve(userPosition);

                    }, function(reason){
                        deferred.reject(reason);
                    });

                }, function(reason){
                    deferred.reject(reason);
                });
            }, function(reason){
                deferred.reject(reason);
            });

         }else{
             deferred.reject("Positionen har angivits i ett felaktigt format. Processen avbryts.");
         }

        }, function(reason){
            deferred.reject(reason);
        });
        return deferred.promise;
    }
});
