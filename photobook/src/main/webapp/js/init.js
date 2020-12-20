'use strict';

function initRegister() {
    if (session.page !== pages.REGISTER) {
        $('#maincontainer').load('register.html'); // Load registration page
        session.page = pages.REGISTER;
    }
}

function initLogin() {
    if (session.page !== pages.LOGIN) {
        $('#maincontainer').load('login.html'); // Load login page
        session.page = pages.LOGIN;
    }
}

function initDashboard() {
    if (session.page !== pages.DASHBOARD) {
        $('#maincontainer').load('dashboard.html'); // Load dashboard
        session.page = pages.DASHBOARD;
    }
}

function initAllUsers() {
    if (session.page !== pages.ALLUSERS) {
        $('#maincontainer').load('allusers.html'); // Load dashboard
        session.page = pages.ALLUSERS;
    }
}
function initAllOnlineUsers() {
    if (session.page !== pages.ONLINEUSERS) {
        $('#maincontainer').load('onlineUsers.html'); // Load dashboard
        session.page = pages.ONLINEUSERS;
    }
}

function initLoggedIn() {
    if (session.page !== pages.PROFILE) {
        $('#maincontainer').load('profile.html'); // Load dashboard
        session.page = pages.PROFILE;
    }
}
function initLogout() {
    session.username = 'none';
    session.state = states.LOGGED_OUT;

    // Invalidate cookie
    var data = new FormData();
    data.append('invalidate', 'y');
    ajaxRequest('GET', 'http://localhost:8080/photobook/session', data, function(o){

    });

    initLogin();
}

function initMain() {
    if (session.page !== pages.MAIN) {
        $('#maincontainer').load('main.html');
        session.page = pages.MAIN;
    }
}

function initFriends() {
    if (session.page !== pages.FRIENDS) {
        $('#maincontainer').load('findUsers.html');
        session.page = pages.FRIENDS;
    }
}

// Event listeners
$('#regbtn').on('click', initRegister);
$('#lgnbtn').on('click', initLogin);
$('#lgobtn').on('click', initLogout);
$('#navdashboard').on('click', initDashboard);
$('#navallusers').on('click', initAllUsers);
$('#navallonlineusers').on('click', initAllOnlineUsers);
$('#navmain').on('click', initMain);
$('#navfriends').on('click', initFriends);
//$('#navsearch').on('click', initSearch);
$('#loggedinas').on('click', initLoggedIn);


// Default should be the registration form
$('#lgobtn').css('display', 'none');
$('#searchbar').css('display', 'none');
$('#navdashboard').css('display', 'none');
$('#navallusers').css('display', 'none');
//$('#navallonlineusers').css('display', 'none');
//$('#navfriends').css('display', 'none');
$('#navmain').css('display', 'none');
initRegister();
session.page = pages.REGISTER;

// Initialize
$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-register')) {
        document.getElementById("country").addEventListener('change', address_check);
        document.getElementById("address").addEventListener('change', address_check);
        document.getElementById("town").addEventListener('change', address_check);
        document.getElementById("autoFillBtn").addEventListener("click", getLoc);
        document.getElementById("pw1").addEventListener('change', password_check);
        document.getElementById("pw2").addEventListener('change', password_check);
        document.getElementById("showMapBtn").addEventListener('click', showMapClick);
        document.getElementById("signUpBtn").addEventListener("click", registerClick);
        document.getElementById("usernm").addEventListener("change", nameCheck);
        //faceRec.init();
    }
});


$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-login')) {
        //faceRecLog.init();
        document.getElementById("lgnBtn").addEventListener('click', loginClick);
    }
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-dashboard')) {
        document.getElementById('editprofile').addEventListener('click', editProfile);
        document.getElementById("submitchanges").setAttribute('disabled', 'disabled');
        document.getElementById('submitchanges').addEventListener('click', submitEdits);
        document.getElementById('deleteprofile').addEventListener('click', deleteUser);

        getUserDashboard();

    }
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-allusers')) {
        getAllUsers();
    }
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-allonlineusers')) {
        getOnlineUsers();
    }
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-friends')) {
        getFriends();
    }
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-mainpage')) {
        $('#postbtn').on('click', createPost);
        $('#postimgbtn').on('click', openModal);
        $('#pilink').on('click', linkPostImage);
        $('#pitake').on('click', takePostimage);
        $('#imglnkbtn').on('click', linkPostImageClick);
        $('#sortBtn').on('click', handleSort);
        getTop10Posts();
    }
});

$(function () {
    ajaxRequest('GET', 'http://localhost:8080/photobook/allusers', undefined, function (o) {
        var res = JSON.parse(o.responseText);
        var user = [];
        for (let i = 0; i < res.length; i++)
            user.push(res.users[i])
        $("#searchbar").autocomplete({
            source: user,
            select: function (event, ui) {
                session.page = pages.OTHERPROFILE;
                $('#maincontainer').load('profile.html', function () {
                    $('#Usernameprofile').text($('#searchbar').val());
                    $('#profilepostbody').css('display', 'none');
                    $('#profilepostbtn').css('display', 'none');
                    $('#postimgbtn').css('display', 'none');

                });
            }
        });
    });
});

$(document).on('DOMNodeInserted', function (e) {
    if ($(e.target).hasClass('container-fluid text-center s-profile')) {
        $('#Usernameprofile').text(session.username);
        $('#profilepostbtn').on('click', createPost);
        $('#postimgbtn').on('click', openModal);
        $('#pilink').on('click', linkPostImage);
        $('#pitake').on('click', takePostimage);
        $('#imglnkbtn').on('click', linkPostImageClick);
        getUserPosts(session.username);
    }
});

// Get session?
ajaxRequest('GET', 'http://localhost:8080/photobook/session', undefined, function(o){
    var cookies = document.cookie;
    if(/username/.test(cookies)){
        var username = /username=([\w-_]*)/.exec(cookies)[1];
        session.username = username;
        session.state = states.LOGGED_IN;
        initDashboard();
    }else{
        console.log("Cookies wasnt logged in");
    }
});