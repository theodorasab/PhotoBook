'use strict';

function loginClick(){
    var body = new FormData();
    var username = document.getElementById("usernm").value;
    var password = document.getElementById("pw1").value;
    body.append('username', document.getElementById("usernm").value);
    body.append('password', CryptoJS.MD5(document.getElementById("pw1").value));
    // body.append('password', document.getElementById("pw1").value);

    if(username == undefined){

        return;
    }else if(password == undefined){

        return;
    }

    ajaxRequest('POST', 'http://localhost:8080/photobook/login', body, function(o){
        var res = JSON.parse(o.responseText);
        if(res.success == 1){
            session.username = username;
            session.state = states.LOGGED_IN;

            // Get session?
            var data = new FormData();
            data.append('username', username);
            ajaxRequest('GET', 'http://localhost:8080/photobook/session', data, function(o){
            });

            initDashboard();
        }else{
            if(res.bad_arguments == "username"){
                $('#ajxres').html('User does not exist!');
                $('#ajxres').css('color', 'red');
            }else{
                $('#ajxres').html('Wrong password!');
                $('#ajxres').css('color', 'red');
            }
        }
    });
}