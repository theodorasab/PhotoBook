'use strict';

// Get location with geolocation
var getLoc = function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(fillLoc);
    }else{
        console.log("Not supported");
    }
};

// Autofill location
var fillLoc = function(pos){
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    var data = new FormData();
    data.append('lat', lat);
    data.append('lon', lon);
    data.append('format', 'jsonv2');

    // Get info about location at lon lat
    ajaxRequest('GET', 'https://nominatim.openstreetmap.org/reverse', data, function(o){
        var response = JSON.parse(o.responseText);
        var country = response['address']['country_code'];
        var town = response['address']['town'];
        if(town == undefined) town = response['address']['city'];
        if(town == undefined) town = response['address']['municipality'];
        var addr = response['address']['suburb'];
        if(addr == undefined) addr = response['address']['village'];
        if(addr == undefined) addr = response['address']['road'];

        document.getElementById("country").value = country.toUpperCase();
        document.getElementById("town").value = town;
        document.getElementById("address").value = addr;

        // Trigger change event
        var myev = document.createEvent("HTMLEvents");
        myev.initEvent("change", false, true);
        document.getElementById("address").dispatchEvent(myev);

    });
};

// document.getElementById("autoFillBtn").addEventListener("click", getLoc);