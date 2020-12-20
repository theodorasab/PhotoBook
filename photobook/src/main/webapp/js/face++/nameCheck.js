'use strict';

// Checks if name is valid and enables take pfp button
var nameCheck = function(){
    var nameInp = document.getElementById("usernm");

    if(nameInp.value != "" && nameInp.checkValidity()){
        document.getElementById("takePfp").removeAttribute("disabled", "disabled");
    }else{
        document.getElementById("takePfp").setAttribute("disabled", "disabled");
    }

};

// document.getElementById("usernm").addEventListener("change", nameCheck);