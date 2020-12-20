'use strict';

// Global var so we don't have to do multiple http requests
var loc = {
    lon : 0,
    lat : 0
};

// Check if address exists
var address_check = function(){
    // Get elements
    var country = document.getElementById("country");
    var town = document.getElementById("town");
    var address = document.getElementById("address");

    var data = new FormData();
    data.append('q', address.value + ',' + town.value + ',' + country.options[country.selectedIndex].text);
    data.append('polygon_geojson', '1');
    data.append('format', 'jsonv2');

    // Make request
    if(town.value != "" && address.value != ""){
        ajaxRequest('GET', 'https://nominatim.openstreetmap.org/search', data, function(o){
            var response = JSON.parse(o.responseText);
            if(response == ''){
                document.getElementById("validAddress").style.display = "flex";
                document.getElementById("address").style.borderColor = 'rgba(198,33,33,0.5)';
                document.getElementById("town").style.borderColor = 'rgba(198,33,33,0.5)';
                document.getElementById("country").style.borderColor = 'rgba(198,33,33,0.5)';
                document.getElementById("showMapBtn").setAttribute("disabled", "disabled");
                document.getElementById("signUpBtn").setAttribute("disabled", "disabled");

                // If map is active and given wrong address, hide it
                if(map.show){
                    document.getElementById("map").style.height = "0px";
                    document.getElementById("map").innerHTML = "";
                    document.getElementById("showMapBtn").innerHTML = "Reveal Address In Map";
                    map.show = false;
                }
            }else{
                document.getElementById("validAddress").style.display = "none";
                document.getElementById("signUpBtn").removeAttribute("disabled", "disabled");
                document.getElementById("address").style.borderColor = 'rgba(18,225,166,0.5)';
                document.getElementById("town").style.borderColor = 'rgba(18,225,166,0.5)';
                document.getElementById("country").style.borderColor = 'rgba(18,225,166,0.5)';
                document.getElementById("showMapBtn").removeAttribute("disabled", "disabled");
                loc.lon = response[0]['lon'];
                loc.lat = response[0]['lat'];


                // Refresh map if its already active
                if(map.show){
                    document.getElementById("map").innerHTML = "";
                    showMap(loc.lon, loc.lat);
                    document.getElementById("showMapBtn").innerHTML = "Hide Map";
                }
            }
        });
    }
};


// document.getElementById("country").addEventListener('change', address_check);
// document.getElementById("address").addEventListener('change', address_check);
// document.getElementById("town").addEventListener('change', address_check);