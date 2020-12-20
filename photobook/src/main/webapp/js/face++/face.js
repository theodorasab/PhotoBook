'use strict';

/*
    Author: Panagiotis Papadakos papadako@csd.uoc.gr

    Try to read this file and understand what the code does...
    Then try to complete the missing functionality

    For the needs of the hy359 2020 course
    University of Crete

    At the end of the file there are some comments about our trips

*/

/*  face recognition that is based on faceplusplus service */
var faceRec = (function () {

  // Object that holds anything related with the facetPlusPlus REST API Service
  var faceAPI = {
    apiKey: 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c',
    apiSecret: '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip',
    app: 'hy359',
    // Detect
    // https://console.faceplusplus.com/documents/5679127
    detect: 'https://api-us.faceplusplus.com/facepp/v3/detect',  // POST
    // Set User ID
    // https://console.faceplusplus.com/documents/6329500
    setuserId: 'https://api-us.faceplusplus.com/facepp/v3/face/setuserid', // POST
    // Get User ID
    // https://console.faceplusplus.com/documents/6329496
    getDetail: 'https://api-us.faceplusplus.com/facepp/v3/face/getdetail', // POST
    // addFace
    // https://console.faceplusplus.com/documents/6329371
    addFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface', // POST
    // Search
    // https://console.faceplusplus.com/documents/5681455
    search: 'https://api-us.faceplusplus.com/facepp/v3/search', // POST
    // Create set of faces
    // https://console.faceplusplus.com/documents/6329329
    create: 'https://api-us.faceplusplus.com/facepp/v3/faceset/create', // POST
    // update
    // https://console.faceplusplus.com/documents/6329383
    update: 'https://api-us.faceplusplus.com/facepp/v3/faceset/update', // POST
    // removeface
    // https://console.faceplusplus.com/documents/6329376
    removeFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/removeface', // POST
  };

  // Object that holds anything related with the state of our app
  // Currently it only holds if the snap button has been pressed
  var state = {
    photoSnapped: false,
    uploaded: false,
  };

  var g_img;

  // function that returns a binary representation of the canvas
  function getImageAsBlobFromCanvas(canvas) {

    // function that converts the dataURL to a binary blob object
    function dataURLtoBlob(dataUrl) {
      // Decode the dataURL
      var binary = atob(dataUrl.split(',')[1]);

      // Create 8-bit unsigned array
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Return our Blob object
      return new Blob([new Uint8Array(array)], {
        type: 'image/jpg',
      });
    }

    var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
    return dataURLtoBlob(fullQuality);

  }

  // function that returns a base64 representation of the canvas
  function getImageAsBase64FromCanvas(canvas) {
    // return only the base64 image not the header as reported in issue #2
    return canvas.toDataURL('image/jpeg', 1.0).split(',')[1];

  }

  // Function called when we upload an image
  function uploadImage() {
    if (state.photoSnapped || state.uploaded) {
      var canvas = document.getElementById('canvas');
      var image = getImageAsBase64FromCanvas(canvas);
      var data = new FormData();

      //
      document.getElementById("pfpUpl").innerHTML = "Contacting Server...";
      document.getElementById("pfpUpl").style.color = "green";

      // Set key and secret
      data.append('api_key', faceAPI.apiKey);
      data.append('api_secret', faceAPI.apiSecret);

      // ---- Detect face ----
      // Image
      if(state.uploaded) data.append('image_file', g_img);
      else data.append('image_base64', image);

      // Attributes
      data.append('return_attributes', "gender,age,smiling,emotion,ethnicity,beauty");

      // Request
      ajaxRequest('POST', faceAPI.detect, data, function(o){
        var response = JSON.parse(o.responseText);

        // Check if succeeded
        if(response['face_num'] != 0){
          var setID_data = new FormData();
          var user_name = document.getElementById("usernm").value;
          var face_token = response['faces'][0]['face_token'];

          // Set key and secret
          setID_data.append('api_key', faceAPI.apiKey);
          setID_data.append('api_secret', faceAPI.apiSecret);
          setID_data.append('face_token', face_token);
          setID_data.append('user_id', user_name);

          // Show attributes
          var info = getAttr(response);
          document.getElementById("attr").innerHTML = info;
          document.getElementById("attr").style.color = "red";

          // Set user ID
          ajaxRequest('POST', faceAPI.setuserId, setID_data, function(o){
            var response = JSON.parse(o.responseText);
            var face_token = response['face_token'];
            var save_data = new FormData();
            save_data.append('api_key', faceAPI.apiKey);
            save_data.append('api_secret', faceAPI.apiSecret);
            save_data.append('outer_id', faceAPI.app);
            save_data.append('face_tokens', face_token);

            // Add face to group
            ajaxRequest('POST', faceAPI.addFace, save_data, function(o){
              var response = JSON.parse(o.responseText);

              // Check if success
              if(response['face_added'] == 1){
                document.getElementById("pfpUpl").innerHTML = "Successfully Uploaded!";
                document.getElementById("pfpUpl").style.color = "green";
                document.getElementById("takePfp").setAttribute("disabled", "disabled");
              }else{
                document.getElementById("pfpUpl").innerHTML = "Couldn't Upload Picture!";
                document.getElementById("pfpUpl").style.color = "red";
              }
            });
          });
        }else{
          alert("No face recognized");
        }
      });
    } else {
      alert('No image has been taken!');
    }
  }

  // Function for initializing things (event handlers, etc...)
  function init() {
    // Put event listeners into place
    // Notice that in this specific case handlers are loaded on the onload event
    window.addEventListener('DOMNodeInserted', function (e) {

      if ($(e.target).hasClass('container-fluid text-center s-register')) {
        // Grab elements, create settings, etc.
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video = document.getElementById('video');
        var mediaConfig = {
          video: true,
        };
        var errBack = function (e) {
          console.log('An error has occurred!', e);
        };

        // Take pfp event listener
        document.getElementById("takePfp").addEventListener("click", takepfp);

        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
              video.play();
            };
          });
        }else{
          document.getElementById("vidNotSupported").style.display = "inline";
        }

        // Trigger photo take
        document.getElementById('snap').addEventListener('click', function () {
          context.drawImage(video, 0, 0, 190, 190);
          document.getElementById("takePfp").removeAttribute("disabled", "disabled");
          state.photoSnapped = true; // photo has been taken
        });
      }

    }, false);

  }

  function takepfp(){
    // Show elements
    document.getElementById("canvas").style.display = "block";
    document.getElementById("video").style.display = "block";
    document.getElementById("snap").style.display = "inline";
    document.getElementById("upload").style.display = "inline";
    
    // Change text and disable
    document.getElementById("takePfp").innerHTML = "Set";
    document.getElementById("takePfp").setAttribute("disabled", "disabled");

    // Put new trigger
    document.getElementById("takePfp").removeEventListener("click", takepfp);
    document.getElementById('takePfp').addEventListener('click', uploadImage);
  }

  // Get attributes
  function getAttr(response){
    var age = response['faces'][0]['attributes']['age']['value'];
    var gender = response['faces'][0]['attributes']['gender']['value'];
    var info = "Face++ recognized you as a ";
    info += age + " year old ";
    info += gender;

    var emotion = response['faces'][0]['attributes']['emotion'];
    var maxEmotion = null;
    var maxVal = -1;

    // Find maximum emotion
    for (var entry in emotion) {
        var value = emotion[entry]
        if (value > maxVal) {
          maxEmotion = entry;
          maxVal = value;
        }
    }

    info += " with an emotion of " + maxEmotion + "!";

    return info;
  }

  // Changes the state of image uploaded
  function imgUpl(){
    state.uploaded = true;
    state.photoSnapped = false;
    document.getElementById("takePfp").removeAttribute("disabled", "disabled");
  }

  function chImg(image){
    g_img = image;
  }

  // Public API of function for facet recognition
  // You might need to add here other methods based on your implementation
  return {
    init: init,
    imgUpl: imgUpl,
    chImg: chImg,
  };

})();




















/*  face recognition that is based on faceplusplus service */
var faceRecLog = (function () {

  // Object that holds anything related with the facetPlusPlus REST API Service
  var faceAPI = {
    apiKey: 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c',
    apiSecret: '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip',
    app: 'hy359',
    // Detect
    // https://console.faceplusplus.com/documents/5679127
    detect: 'https://api-us.faceplusplus.com/facepp/v3/detect',  // POST
    // Set User ID
    // https://console.faceplusplus.com/documents/6329500
    setuserId: 'https://api-us.faceplusplus.com/facepp/v3/face/setuserid', // POST
    // Get User ID
    // https://console.faceplusplus.com/documents/6329496
    getDetail: 'https://api-us.faceplusplus.com/facepp/v3/face/getdetail', // POST
    // addFace
    // https://console.faceplusplus.com/documents/6329371
    addFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface', // POST
    // Search
    // https://console.faceplusplus.com/documents/5681455
    search: 'https://api-us.faceplusplus.com/facepp/v3/search', // POST
    // Create set of faces
    // https://console.faceplusplus.com/documents/6329329
    create: 'https://api-us.faceplusplus.com/facepp/v3/faceset/create', // POST
    // update
    // https://console.faceplusplus.com/documents/6329383
    update: 'https://api-us.faceplusplus.com/facepp/v3/faceset/update', // POST
    // removeface
    // https://console.faceplusplus.com/documents/6329376
    removeFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/removeface', // POST
  };

  // Object that holds anything related with the state of our app
  // Currently it only holds if the snap button has been pressed
  var state = {
    photoSnapped: false,
    uploaded: false,
  };

  var g_img;

  // function that returns a binary representation of the canvas
  function getImageAsBlobFromCanvas(canvas) {

    // function that converts the dataURL to a binary blob object
    function dataURLtoBlob(dataUrl) {
      // Decode the dataURL
      var binary = atob(dataUrl.split(',')[1]);

      // Create 8-bit unsigned array
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Return our Blob object
      return new Blob([new Uint8Array(array)], {
        type: 'image/jpg',
      });
    }

    var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
    return dataURLtoBlob(fullQuality);

  }

  // function that returns a base64 representation of the canvas
  function getImageAsBase64FromCanvas(canvas) {
    // return only the base64 image not the header as reported in issue #2
    return canvas.toDataURL('image/jpeg', 1.0).split(',')[1];

  }

  // Function called when we upload an image
  function uploadImage() {
    if (state.photoSnapped || state.uploaded) {
        var canvas = document.getElementById('canvas');
        var image = getImageAsBase64FromCanvas(canvas);
        var data = new FormData();

        // Info
        document.getElementById("pfpUpl").innerHTML = "Contacting Server...";
        document.getElementById("pfpUpl").style.color = "green";

        // Set key and secret
        data.append('api_key', faceAPI.apiKey);
        data.append('api_secret', faceAPI.apiSecret);
        data.append('outer_id', faceAPI.app);

        // ---- Detect face ----
        // Image
        if(state.uploaded) data.append('image_file', g_img);
        else data.append('image_base64', encodeURIComponent(image));

        // Search face
        ajaxRequest('POST', faceAPI.search, data, function(o){
            var response = JSON.parse(o.responseText);
            var maxconf = 0;
            var maxname = "";
            
            // Get max confidence
            for(var i = 0; i < response['results'].length; i++){
                var obj = response['results'][i];
                if (obj['confidence'] > maxconf){
                    maxconf = obj['confidence']
                    maxname = obj['user_id'];
                }
            }

            if(maxname != ""){
                document.getElementById("pfpUpl").innerHTML = "Matched username: " + maxname;
                document.getElementById("usernm").value = maxname;
                document.getElementById("pfpUpl").style.color = "green";
            }else{
                document.getElementById("pfpUpl").innerHTML = "Couldn't find a user....";
                document.getElementById("pfpUpl").style.color = "red";
            }
        });
    } else {
      alert('No image has been taken!');
    }
  }

  // Function for initializing things (event handlers, etc...)
  function init() {
    // Put event listeners into place
    // Notice that in this specific case handlers are loaded on the onload event
    window.addEventListener('DOMNodeInserted', function (e) {

      if ($(e.target).hasClass('container-fluid text-center s-login')) {
        // Grab elements, create settings, etc.
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video = document.getElementById('video');
        var mediaConfig = {
          video: true,
        };
        var errBack = function (e) {
          console.log('An error has occurred!', e);
        };

        // Take pfp event listener
        document.getElementById("takePfp").addEventListener("click", uploadImage);
        document.getElementById("exampleRadios1").addEventListener("change", function(){
            if(document.getElementById("exampleRadios1").checked){

                document.getElementById("usernm").setAttribute("disabled", "disabled");
                takepfp();
            }
            
        });

        document.getElementById("exampleRadios2").addEventListener("change", function(){
          if(document.getElementById("exampleRadios2").checked){
              document.getElementById("canvas").style.display = "none";
            document.getElementById("video").style.display = "none";
            document.getElementById("snap").style.display = "none";
            document.getElementById("takePfp").style.display = "none";
            document.getElementById("upload").style.display = "none";
            document.getElementById("usernm").removeAttribute("disabled", "disabled");
          }
          
        });

        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
              video.play();
            };
          });
        }else{
          document.getElementById("vidNotSupported").style.display = "inline";
        }

        // Trigger photo take
        document.getElementById('snap').addEventListener('click', function () {
          context.drawImage(video, 0, 0, 190, 190);
          document.getElementById("takePfp").removeAttribute("disabled", "disabled");
          state.photoSnapped = true; // photo has been taken
        });

      }
  
    }, false);

  }

  function takepfp(){
    // Show elements
    document.getElementById("canvas").style.display = "block";
    document.getElementById("video").style.display = "block";
    document.getElementById("snap").style.display = "inline";
    document.getElementById("takePfp").style.display = "inline";
    document.getElementById("upload").style.display = "inline";
    
    // Change text and disable
    document.getElementById("takePfp").innerHTML = "Search";
    document.getElementById("takePfp").setAttribute("disabled", "disabled");
  }

  // Changes the state of image uploaded
  function imgUpl(){
    state.uploaded = true;
    state.photoSnapped = false;
    document.getElementById("takePfp").removeAttribute("disabled", "disabled");
  }

  function chImg(image){
    g_img = image;
  }

  // Public API of function for facet recognition
  // You might need to add here other methods based on your implementation
  return {
    init: init,
    imgUpl: imgUpl,
    chImg: chImg,
  };

})();
