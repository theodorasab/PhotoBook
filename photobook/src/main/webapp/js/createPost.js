'user strict';

var postState = {
    image64 : '',
    imageURL : ''
}

function createPost(){
    var data = new FormData();

    if (session.page == pages.PROFILE) {
        data.append('description', $('#profilepostbody').val());
    } else if (session.page == pages.MAIN) {
        data.append('description', $('#postbody').val());
    }

    if(postState.image64 != ''){
        data.append('imageB64', encodeURIComponent(postState.image64));
    }else if(postState.imageURL != ''){
        data.append('imageURL', encodeURIComponent(postState.imageURL));
    }

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(function (pos){
    //         var lat = pos.coords.latitude;
    //         var lon = pos.coords.longitude;
    //         data.append('longitude', lon);
    //         data.append('latitude', lat);
    //     });
    // }else{
    //     console.log("Not supported");
    // } 
    
    if(data.get('description') == '') return;

    // Fix sizes
    var canv = document.getElementById('postCanvas');
    const context = canv.getContext('2d');
    context.clearRect(0, 0, canv.width, canv.height);
    $('#postbody').css('height', '100%');
    $('#profilepostbody').css('height', '100%');
    // $('#postbody').val = '';
    // $('#profilepostbody').val = '';

    // ajaxRequest('POST', 'http://localhost:8080/photobook/createPost', data, function(){
        
    //     if (session.page == pages.PROFILE) {
    //         $('#userposts').html('');
    //         getUserPosts();
    //     } else if (session.page == pages.MAIN) {
    //         $('#posts').html('');
    //         getTop10Posts();
    //     }
    // });

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (pos){
            var lat = pos.coords.latitude;
            var lon = pos.coords.longitude;
            data.append('longitude', lon);
            data.append('latitude', lat);
            ajaxRequest('POST', 'http://localhost:8080/photobook/createPost', data, function(){
        
                if (session.page == pages.PROFILE) {
                    $('#userposts').html('');
                    getUserPosts(session.username);
                } else if (session.page == pages.MAIN) {
                    $('#posts').html('');
                    getTop10Posts();
                }
            });
        });
    }else{
        console.log("Not supported");
    } 
}