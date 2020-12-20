'use strict';

// Draw in canvas after uploading from computer
var imageUploaded = function(event){
    if(event.target.files){
        var canv = document.getElementById('canvas');
        var ctx = canv.getContext("2d");
        var img =  event.target.files[0];
        var reader = new FileReader();

        faceRec.chImg(img);

        reader.readAsDataURL(img);
        reader.onloadend = function (e) {
            var myImage = new Image();
            myImage.src = e.target.result;
            myImage.onload = function(ev) {

            ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height,
                                   0, 0, canv.width, canv.height);
            let imgData = canv.toDataURL("image/jpeg",0.75);
            faceRec.imgUpl();
            }
        }
    }
  }


function search(token){
    var dat = new FormData();
    dat.append('api_key', 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c');
    dat.append('api_secret', '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip');
    dat.append('face_token', token);
    dat.append('outer_id', 'hy359');

    ajaxRequest('POST', 'https://api-us.faceplusplus.com/facepp/v3/search', dat, function(o){
        var response = JSON.parse(o.responseText);
        console.log(response);
    });
}