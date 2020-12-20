function openModal(){
     // Get the modal
    var modal = document.getElementById("myModal");

     // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    $('#imglnk').css('display', 'none');
    $('#imglnkbtn').css('display', 'none');
    $('#cameraTakeBtn').css('display', 'none');
    $('#postVid').css('display', 'none');
    $('#videoCanv').css('display', 'none');


    modal.style.display = "block";
    

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        $('#piupload').css('display', 'inline');
        $('#pitake').css('display', 'inline');
        $('#pilink').css('display', 'inline');
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $('#piupload').css('display', 'inline');
        $('#pitake').css('display', 'inline');
        $('#pilink').css('display', 'inline');
    }}
}

// function openModal(){
//     $('#postbody').css('height', '70%');
// }

function uploadPostImage(event){
    if(event.target.files){
        var canv = document.getElementById('postCanvas');
        var ctx = canv.getContext("2d");
        var img =  event.target.files[0];
        var reader = new FileReader();

        //faceRec.chImg(img);

        reader.readAsDataURL(img);
        reader.onloadend = function (e) {
            var myImage = new Image();
            postState.image64 = reader.result; // Save b64
            myImage.src = e.target.result;
            myImage.onload = function(ev) {

            ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height,
                                   0, 0, canv.width, canv.height);
            let imgData = canv.toDataURL("image/jpeg",0.75);
            // faceRec.imgUpl();
            }
        }
        $('#myModal').css('display', 'none');
        $('#postbody').css('height', '70%');
        $('#profilepostbody').css('height', '70%');
    }
}

function linkPostImage(){
    $('#piupload').css('display', 'none');
    $('#pitake').css('display', 'none');
    $('#pilink').css('display', 'none');
    $('#imglnk').css('display', 'inline');
    $('#imglnkbtn').css('display', 'inline');
}

function linkPostImageClick(){
    var link = $('#imglnk').val();
    if(link == '') return;

    // Create canvas
    var myCanvas = document.getElementById('postCanvas');
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        ctx.drawImage(img, 0, 0, img.width, img.height,
            0, 0, myCanvas.width, myCanvas.height);
    };
    img.src = link;

    $('#myModal').css('display', 'none');
    $('#postbody').css('height', '70%');

    postState.imageURL = link;
    $('#myModal').css('display', 'none');
    $('#piupload').css('display', 'inline');
    $('#pitake').css('display', 'inline');
    $('#pilink').css('display', 'inline');
}

function takePostimage(){
    console.log('AAaaa');
    $('#piupload').css('display', 'none');
    $('#pitake').css('display', 'none');
    $('#pilink').css('display', 'none');
    $('#cameraTakeBtn').css('display', 'inline');
    $('#postVid').css('display', 'inline');

    var video = document.getElementById('postVid');
    var canvas = document.getElementById('videoCanv');
    var context = canvas.getContext('2d');

    var mediaConfig = {
        video: true,
      };

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
        $('#piupload').css('display', 'inline');
        $('#pitake').css('display', 'inline');
        $('#pilink').css('display', 'inline');
        $('#cameraTakeBtn').css('display', 'none');
        $('#postVid').css('display', 'none');
    }

      // Trigger photo take
      document.getElementById('cameraTakeBtn').addEventListener('click', function () {
        $('#videoCanv').css('display', 'inline');
        context.drawImage(video, 0, 0, 190, 190);
        var pic = canvas.toDataURL('image/jpeg', 1.0);
        postState.image64 = pic;

        var canv = document.getElementById('postCanvas');
        var ctx = canv.getContext("2d");

        //faceRec.chImg(img);

        var myImage = new Image();
        myImage.onload = function(ev) {

            ctx.drawImage(myImage, 0, 0, myImage.width, myImage.height,
                                   0, 0, canv.width, canv.height);
            

            $('#piupload').css('display', 'inline');
            $('#pitake').css('display', 'inline');
            $('#pilink').css('display', 'inline');
            $('#cameraTakeBtn').css('display', 'none');
            $('#postVid').css('display', 'none');
            $('#myModal').css('display', 'none');
            $('#postbody').css('height', '70%');
            $('#profilepostbody').css('height', '70%');
            
        }
        myImage.src = pic;
    });
}