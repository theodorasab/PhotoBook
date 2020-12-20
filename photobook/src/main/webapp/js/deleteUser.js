'user strict';

function deleteUser() {
    var data = new FormData();
    data.append('username', session.username);
    ajaxRequest('GET', 'http://localhost:8080/photobook/deleteUser', data, function () {
        $('#lgobtn').css('display', 'none');
        $('#searchbar').css('display', 'none');
        $('#navdashboard').css('display', 'none');
        $('#navallusers').css('display', 'none');
        $('#navmain').css('display', 'none');
        initLogout();
        initRegister();
    });
}