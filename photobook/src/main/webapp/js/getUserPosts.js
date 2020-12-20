'user strict';

function getUserPosts(dataUser) {
    var data = new FormData();
    if (session.page == pages.OTHERPROFILECLICKED) {
        data.append('username', dataUser);
    } else if (session.page == pages.PROFILE) {
        data.append('username', session.username);
    } else if (session.page != pages.PROFILE) {
        data.append('username', $('#searchbar').val());
    }
    console.log(data);
    ajaxRequest('POST', 'http://localhost:8080/photobook/getUser', data, function (o) {
        var res = JSON.parse(o.responseText);

        fetch('post.html')
                .then(response => response.text())
                .then(text => makePosts(text, res, 'userposts'))

    });
}

function getPostsSortedHeat(){
    ajaxRequest('GET', 'http://localhost:8080/photobook/getMainPosts', undefined, function (o) {
        var res = JSON.parse(o.responseText);

        fetch('post.html')
                .then(response => response.text())
                .then(text => console.log('Sort this heated' + res))
    });
}

function getPostsSortedRating(){
    ajaxRequest('GET', 'http://localhost:8080/photobook/getMainPosts', undefined, function (o) {
        var res = JSON.parse(o.responseText);
        var arr = res;


        var ratings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var posts =   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var sorted = [];

        
        console.log(sorted);
        for(let i = 0; i < res.length; i++){
            ratings[i] = $('#avg' + res[i].postID).html();
            posts[i] = res[i].postID;
        }

        for(let i = 0; i < res.length; i++){
            var max = 0;
            var maxID = 0;
            for(let j = 0; j < arr.length; j++){
                if($('#avg' + arr[j].postID).html() > max){
                    max = $('#avg' + arr[j].postID).html();
                    maxID = arr[j].postID;
                }
            }
            sorted[i].push(res[i]);
            arr = arr.filter((el) => {
                return el.postID !== maxID;
            });
        }


        // Sort res by rating


        $('#posts').html('');
        console.log(sorted);
        fetch('post.html')
                .then(response => response.text())
                .then(text => sortRating(text, sorted, 'userposts'))
    });
}

function getTop10Posts() {

    ajaxRequest('GET', 'http://localhost:8080/photobook/getMainPosts', undefined, function (o) {
        var res = JSON.parse(o.responseText);

        fetch('post.html')
                .then(response => response.text())
                .then(text => makePosts(text, res, 'posts'))
    });
}

function makePosts(postPreset, post, append) {

    for (let i = 0; i < post.length; i++) {
        let currentPost = postPreset;
        currentPost = currentPost.replace('USERNAME_H', post[i].userName);
        currentPost = currentPost.replace('user_h', post[i].userName);
        currentPost = currentPost.replace('DESC_H', post[i].description);
        currentPost = currentPost.replace('TIME_H', getTime(post[i].createdAt));
        currentPost = currentPost.replace('TGEO_H', 'TGEO_H' + post[i].postID);
        getGeo(post[i].postID, post[i].latitude, post[i].longitude);
        currentPost = currentPost.replaceAll('POSTID_H', post[i].postID);
        currentPost = currentPost.replace('CANVID_H', post[i].postID);
        currentPost = currentPost.replace('RECOG_H', post[i].postID);
        currentPost = currentPost.replace('POSTCOMID_H', post[i].postID);
        renderComments(post[i].postID);
        renderRatings(post[i].postID);

        $('#' + append).append(currentPost);
        $('#del' + post[i].postID).on('click', function (event) {
            let id = event.target.id;
            deletePost(id.slice(3));
        });

        $('#postcomm' + post[i].postID).on('click', function (event) {
            var commdata = new FormData();
            commdata.append('userName', session.username);
            commdata.append('comment', $('#commentpostbody' + post[i].postID).val());
            commdata.append('postID', post[i].postID);

            ajaxRequest('POST', 'http://localhost:8080/photobook/createComment', commdata, function (o) {

                renderComments(post[i].postID);
            });
        });

        $('#rateBtn' + post[i].postID).on('click', function(event){
            let id = event.target.id;
            ratePost(id.slice(7));
        });

        $('#go' + post[i].userName).on('click', function (event) {
            $('#maincontainer').load('profile.html', function () {
                session.page = pages.OTHERPROFILECLICKED;
                $('#Usernameprofile').text(post[i].userName);
                getUserPosts(post[i].userName);
                $('#profilepostbody').css('display', 'none');
                $('#profilepostbtn').css('display', 'none');
                $('#postimgbtn').css('display', 'none');
            });
        });


        // Display image
        $('#canv' + post[i].postID).css('display', 'none');
        if (post[i].imageBase64 != '' && post[i].imageBase64 != 'null') {
            drawImage(post[i].postID, post[i].imageBase64, 'b64');
            // setTimeout(function(){
            //     recognizeImage(post[i].postID, post[i].imageBase64, 'b64');
            // }, 1000);
            //recognizeImage(post[i].postID, post[i].imageBase64, 'b64');
        } else if (post[i].imageURL != '' && post[i].imageURL != 'null') {
            drawImage(post[i].postID, post[i].imageURL, 'url');
            // setTimeout(function(){
            //     recognizeImage(post[i].postID, post[i].imageURL, 'url');
            // }, 1000);
            //recognizeImage(post[i].postID, post[i].imageURL, 'url');
        }

        if (session.username != post[i].userName)
            $('#del' + post[i].postID).css('display', 'none');


    }

    return;
}

function drawImage(postID, img, type) {
//    console.log('PostID '+ postID + img);
    $('#canv' + postID).css('display', 'inline');
    var canvas = document.getElementById('canv' + postID);
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height,
                0, 0, canvas.width, canvas.height);
        recognizeImage(postID, img, type);

//        console.log('Set');
    };
    image.src = img;
}

function getGeo(postID, lat, lon) {
    if (lat == null || lat == undefined || lat == 'undefined' || lat == '' || lon == '' || lon == null || lon == undefined || lon == 'undefined')
        return;
    var data = new FormData();
    data.append('lat', lat);
    data.append('lon', lon);
    data.append('format', 'jsonv2');

    // Get info about location at lon lat
    ajaxRequest('GET', 'https://nominatim.openstreetmap.org/reverse', data, function (o) {
        var response = JSON.parse(o.responseText);
        var town = response['address']['town'];
        if (town == undefined)
            town = response['address']['city'];
        if (town == undefined)
            town = response['address']['municipality'];

        // Trigger change event
        $('#TGEO_H' + postID).append(', ' + town);

    });
}

function recognizeImage(postID, img, type) {
    var data = new FormData();
    data.append('api_key', 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c');
    data.append('api_secret', '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip');
    if (type == 'b64')
        data.append('image_base64', encodeURIComponent(img));
    else
        data.append('image_url', img);
    data.append('outer_id', 'hy359');

    ajaxRequest('POST', 'https://api-us.faceplusplus.com/facepp/v3/search', data, function (o) {
        var response = JSON.parse(o.responseText);

        var maxconf = 0;
        var maxname = "";

        // Get max confidence
        for (var i = 0; i < response['results'].length; i++) {
            var obj = response['results'][i];
            if (obj['confidence'] > maxconf) {
                maxconf = obj['confidence']
                maxname = obj['user_id'];
            }
        }

        if (maxname != "") {
            $('#recog' + postID).html('Detected user ' + maxname);
        }
    });
}

function ratePost(postID){
    var data = new FormData();
    var rate = 0;

    console.log('star5' + postID);
    if(document.getElementById("star5" + postID).checked){
        rate = 5;
    }else if(document.getElementById("star4" + postID).checked){
        rate = 4;
    }else if(document.getElementById("star3" + postID).checked){
        rate = 3;
    }else if(document.getElementById("star2" + postID).checked){
        rate = 2;
    }else if(document.getElementById("star1" + postID).checked){
        rate = 1;
    }else{
        rate = 0;
    }

    data.append('postID', postID);
    data.append('rate', rate);
    ajaxRequest('GET', 'http://localhost:8080/photobook/ratePost', data, function(o){
        renderRatings(postID);
    });
}
