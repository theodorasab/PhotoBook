'use strict';

const pages = {
    INIT: -1,
    REGISTER: 0,
    LOGIN: 1,
    DASHBOARD: 2,
    ALLUSERS: 3,
    MAIN: 4,
    PROFILE: 5,
    OTHERPROFILE: 6,
    OTHERPROFILECLICKED: 7,
    ONLINEUSERS: 8,
    FRIENDS: 9,
}

const states = {
    INIT: -1,
    LOGGED_OUT: 0,
    LOGGED_IN: 1,
}

var session = {
    // States
    pageIn : pages.INIT,
    stateIn : states.INIT,

    // Callbacks
    pageChanged: pageChanged,
    stateChanged: stateChanged,

    // Page Get/Set
    get page(){
        return this.pageIn;
    },
    set page(value){
        this.pageIn = value;
        this.pageChanged(value);
    },

    // State Get/Set
    get state(){
        return this.stateIn;
    },
    set state(value){
        this.stateIn = value;
        this.stateChanged(value);
    },

    // Logged in username
    username: 'none',
}

function pageChanged(){
}

function stateChanged(){
    if(session.state == states.LOGGED_IN){ // Logged in
        document.getElementById('lgnbtn').style.display = 'none';
        document.getElementById('regbtn').style.display = 'none';
        document.getElementById('lgobtn').style.display = 'flex';
        $('#loggedinas').html('Logged in as ' + session.username);
        $('#navdashboard').css('display', 'flex');
        $('#navallusers').css('display', 'flex');
        $('#navmain').css('display', 'flex');
        $('#searchbar').css('display', 'flex');
    }else if(session.state == states.LOGGED_OUT){ // Logged out
        document.getElementById('lgobtn').style.display = 'none';
        document.getElementById('lgnbtn').style.display = 'flex';
        document.getElementById('regbtn').style.display = 'flex';
        $('#loggedinas').html('');
        $('#navdashboard').css('display', 'none');
        $('#navallusers').css('display', 'none');
        $('#navmain').css('display', 'none');
        $('#searchbar').css('display', 'none');
    }else{
        console.log('Unknown state occured...');
    }
}

// Initial