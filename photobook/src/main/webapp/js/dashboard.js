'use strict';

var editing = 0;

function editProfile(){
    if(editing){
        document.getElementById("username").setAttribute('disabled', 'disabled');
        document.getElementById("email").setAttribute('disabled', 'disabled');
        document.getElementById("password").setAttribute('disabled', 'disabled');
        document.getElementById("gender").setAttribute('disabled', 'disabled');
        document.getElementById("firstname").setAttribute('disabled', 'disabled');
        document.getElementById("lastname").setAttribute('disabled', 'disabled');
        document.getElementById("country").setAttribute('disabled', 'disabled');
        document.getElementById("town").setAttribute('disabled', 'disabled');
        document.getElementById("address").setAttribute('disabled', 'disabled');
        document.getElementById("occupation").setAttribute('disabled', 'disabled');
        document.getElementById("interests").setAttribute('disabled', 'disabled');
        document.getElementById("info").setAttribute('disabled', 'disabled');
        document.getElementById("editprofile").value = "Edit Profile";
        document.getElementById("submitchanges").setAttribute('disabled', 'disabled');
        editing = 0;
    }else{
        document.getElementById("username").removeAttribute('disabled', 'disabled');
        document.getElementById("email").removeAttribute('disabled', 'disabled');
        document.getElementById("password").removeAttribute('disabled', 'disabled');
        document.getElementById("gender").removeAttribute('disabled', 'disabled');
        document.getElementById("firstname").removeAttribute('disabled', 'disabled');
        document.getElementById("lastname").removeAttribute('disabled', 'disabled');
        document.getElementById("country").removeAttribute('disabled', 'disabled');
        document.getElementById("town").removeAttribute('disabled', 'disabled');
        document.getElementById("address").removeAttribute('disabled', 'disabled');
        document.getElementById("occupation").removeAttribute('disabled', 'disabled');
        document.getElementById("interests").removeAttribute('disabled', 'disabled');
        document.getElementById("info").removeAttribute('disabled', 'disabled');
        document.getElementById("editprofile").value = "Stop Editing";
        document.getElementById("submitchanges").removeAttribute('disabled', 'disabled');
        editing = 1;
    }
}

function getUserDashboard(){
    var query = new FormData();
    query.append('username', session.username);

    ajaxRequest('GET', 'http://localhost:8080/photobook/user', query, function(o){
        var res = JSON.parse(o.responseText);
        document.getElementById('username').placeholder = res['userName'];
        document.getElementById('userid').placeholder = res['userID'];
        document.getElementById('regsince').placeholder = res['registeredSince'];
        document.getElementById('email').placeholder = res['email'];
        document.getElementById('password').placeholder = res['password'];
        document.getElementById('gender').placeholder = res['gender'];
        document.getElementById('firstname').placeholder = res['firstName'];
        document.getElementById('lastname').placeholder = res['lastName'];
        document.getElementById('country').placeholder = res['country'];
        document.getElementById('town').placeholder = res['town'];
        document.getElementById('birthdate').placeholder = res['birthDate'];
        document.getElementById('address').placeholder = res['address'];
        document.getElementById('occupation').placeholder = res['occupation'];
        document.getElementById('interests').placeholder = res['interests'];
        document.getElementById('info').placeholder = res['info'];
    });
}

function submitEdits(){
    var submitData = new FormData();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let gender = document.getElementById('gender').value;
    let country = document.getElementById('country').value;
    let town = document.getElementById('town').value;
    let address = document.getElementById('address').value;
    let occupation = document.getElementById('occupation').value;
    let interests = document.getElementById('interests').value;
    let info = document.getElementById('info').value;

    console.log(firstname);

    // submitData.append('username', session.username);
    if(username != "") submitData.append('username', username);
    if(email != "") submitData.append('email', email);
    if(password != "") submitData.append('password', password);
    if(firstname != "") submitData.append('firstname', firstname);
    if(lastname != "") submitData.append('lastname', lastname);
    if(gender != "") submitData.append('gender', gender);
    if(country != "") submitData.append('country', country);
    if(town != "") submitData.append('town', town);
    if(address != "") submitData.append('address', address);
    if(occupation != "") submitData.append('occupation', occupation);
    if(interests != "") submitData.append('interests', interests);
    if(info != "") submitData.append('info', info);

    ajaxRequest('POST', 'http://localhost:8080/photobook/edit', submitData, function(o){
        editProfile();
    });
}