'use strict';

function getAllUsers(){


    ajaxRequest('GET', 'http://localhost:8080/photobook/allusers', undefined, function(o){
        var res = JSON.parse(o.responseText);
        for (let i = 0; i < res.length; i++) {
            if (res.users[i].startsWith("<")) {
                continue;
            } else
            $('#userlist').append('<li class="list-group-item list-group-item-info bg-cl">' + res.users[i] + '</li>');
        }

    });

}

function getOnlineUsers() {
    ajaxRequest('GET', 'http://localhost:8080/photobook/onlineUsers', undefined, function (o) {
        var res = JSON.parse(o.responseText);
        for (let i = 0; i < res.length; i++)
            $('#onlineuserlist').append('<li class="list-group-item list-group-item-info bg-cl">' + res.users[i] + '</li>');
    });

}


function getFriends() {
    ajaxRequest('GET', 'http://localhost:8080/photobook/findFriends', undefined, function (o) {
        var res = JSON.parse(o.responseText);
        for (let i = 0; i < res.length; i++)
            $('#friendslist').append('<li href="#" class="list-group-item list-group-item-info bg-cl">' + res.users[i] + '</li>');
    });

}