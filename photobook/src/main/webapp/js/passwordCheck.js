'use strict';

// Checks if ids pw1 and pw2 have the same value
var password_check = function(){
    // Get elements
    var first = document.getElementById("pw1");
    var second = document.getElementById("pw2");

    // Check values
    if((first.value != second.value) && (second.value != "")){
        document.getElementById("passwordMatch").style.display = "flex";
        document.getElementById("signUpBtn").setAttribute("disabled", "disabled");
        document.getElementById("pw1").style.borderColor = 'rgba(198,33,33,0.5)';
        document.getElementById("pw2").style.borderColor = 'rgba(198,33,33,0.5)';
    }else if(second.value != ""){
        document.getElementById("passwordMatch").style.display = "none";
        document.getElementById("signUpBtn").removeAttribute("disabled", "disabled");
        document.getElementById("pw1").style.borderColor = 'rgba(18,225,166,0.5)';
        document.getElementById("pw2").style.borderColor = 'rgba(18,225,166,0.5)';
    }
}

// Add onchange property
// document.getElementById("pw1").addEventListener('change', password_check);
// document.getElementById("pw2").addEventListener('change', password_check);