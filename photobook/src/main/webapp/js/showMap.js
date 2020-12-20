'use strict';

var map = {
    show : false,
}

// Show map in page
function showMap(lon, lat){
    // Get elements
    var country = document.getElementById("country");
    var town = document.getElementById("town");
    var address = document.getElementById("address");
    var zoom = 15;
    var map = new OpenLayers.Map("map");

    map.addLayer(new OpenLayers.Layer.OSM());

    // Transform coordinates
    var lonLat = new OpenLayers.LonLat(lon, lat)
        .transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ).transform(
            new OpenLayers.Projection("EPSG:900913"),
            map.getProjectionObject()
    );
    
    // Add markers
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(lonLat));

    // Center map
    map.setCenter(lonLat, zoom);
}

function showMapClick(){;
    if(!map.show){
        document.getElementById("map").style.height = "200px";
        showMap(loc.lon, loc.lat);
        document.getElementById("showMapBtn").innerHTML = "Hide Map";
        map.show = true;
    }else{
        document.getElementById("map").innerHTML = "";
        document.getElementById("showMapBtn").innerHTML = "Reveal Address In Map";
        document.getElementById("map").style.height = "0px";
        map.show = false;
    }
}

// Show map button event handler
// document.getElementById("showMapBtn").addEventListener('click', function(){
//     if(!map.show){
//         document.getElementById("map").style.height = "200px";
//         showMap(loc.lon, loc.lat);
//         document.getElementById("showMapBtn").innerHTML = "Hide Map";
//         map.show = true;
//     }else{
//         document.getElementById("map").innerHTML = "";
//         document.getElementById("showMapBtn").innerHTML = "Reveal Address In Map";
//         document.getElementById("map").style.height = "0px";
//         map.show = false;
//     }
// });