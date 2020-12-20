'use strict';

function registerClick(){
    var body = new FormData();
    body.append('username', document.getElementById("usernm").value);
    body.append('email', document.getElementById("email").value);
    body.append('password', CryptoJS.MD5(document.getElementById("pw1").value));
    body.append('firstname', document.getElementById("fname").value);
    body.append('lastname', document.getElementById("lname").value);
    body.append('birthdate', document.getElementById("bday").value);
    body.append('country', document.getElementById("country").value);
    body.append('town', document.getElementById("town").value);
    body.append('address', document.getElementById("address").value);
    body.append('occupation', document.getElementById("work").value);
    body.append('safe', document.getElementById("safe").value);
        
    if(document.getElementById("g1").checked){
        body.append('gender', 'Male');
    }else if(document.getElementById("g2").checked){
        body.append('gender', 'Female');
    }else{
        body.append('gender', 'N/A');
    }
    
    body.append('interests', document.getElementById("inter").value);
    body.append('info', document.getElementById("ginfo").value);

    // Check form validation
    if(!validate()) return;
    
    ajaxRequest('POST', 'http://localhost:8080/photobook/register', body, function(o){
        var res = JSON.parse(o.responseText);
        var successfull = '<h2 class="mb-3">Adder User!</h2><dl class="row">';

        // Add all attributes
        successfull += make_dt('Username', res['userName']);
        successfull += make_dt('E-Mail', res['email']);
        successfull += make_dt('Gender', res['gender']);
        successfull += make_dt('First Name', res['firstName']);
        successfull += make_dt('Last Name', res['lastName']);
        successfull += make_dt('Birth Date', res['birthDate']);
        successfull += make_dt('Country', res['country']);
        successfull += make_dt('Town', res['town']);
        successfull += make_dt('Address', res['address']);
        successfull += make_dt('Work', res['occupation']);
        successfull += make_dt('Interests', res['interests']);
        successfull += make_dt('General Info', res['info']);
        
        successfull += '</dl>';
        successfull += '<h2 class="mb-3">You can now login as this user</h2><dl class="row">';
        $('#maincontainer').html(successfull);
    }, function(o){
        if(o.readyState == 4){
            var res = JSON.parse(o.responseText);

            if(res['unsafe'] == true){
                $('#ajxres').html('XSS detected!');
                $('#ajxres').css('color', 'red');
            }else{
                var bad_args = res['bad_arguments'];
                var dis_args = "";

                if(bad_args.includes('username')) dis_args += 'username,';
                if(bad_args.includes('email')) dis_args += 'email,';
                if(bad_args.includes('password')) dis_args += 'password,';
                if(bad_args.includes('firstname')) dis_args += 'firstname,';
                if(bad_args.includes('lastname')) dis_args += 'lastname,';
                if(bad_args.includes('birthdate')) dis_args += 'birthdate,';
                if(bad_args.includes('town')) dis_args += 'town,';
                if(bad_args.includes('occupation')) dis_args += 'occupation,';
                if(bad_args.includes('interests')) dis_args += 'interests,';
                url = url.slice(0, -1);

                dis_args += " were not valid."

                $('#ajxres').html(dis_args);
            }
        }
    });
}

function make_dt(key, value){
    var dt = '<dt class="col-sm-5"></dt>';
    dt += '<dt class="col-sm-1">' + key + ' : </dt>';
    dt += '<dd class="col-sm-1">' + value + '</dd>';
    dt += '<dt class="col-sm-5"></dt>';
    return dt;
}

function validate(){
    var invalid = "";
    if(document.getElementById("sform").checkValidity()) return true;

    $('#ajxres').html('Form is incomplete or invalid!');
    $('#ajxres').css('color', 'red');
    return false;
}