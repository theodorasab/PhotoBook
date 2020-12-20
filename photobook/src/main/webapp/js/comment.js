function renderComments(postID){

    fetch('comment.html')
                .then(response => response.text())
                .then(text => makeComments(text, postID));

}

function makeComments(preset, postID){
    let comment = preset.toString();
    var data = new FormData();
    data.append('postID', postID);
    $('#commentlist' + postID).html('');

    ajaxRequest('GET', 'http://localhost:8080/photobook/getComments', data, function(o){
        var res = JSON.parse(o.responseText);

        for(let i = 0; i < res.length; i++){
            let thisComment = comment;
            thisComment = thisComment.replace('COMMENT_BODY', res[i].comment);
            thisComment = thisComment.replace('TIMEAGO_H', getTime(res[i].createdAt));
            thisComment = thisComment.replace('USERNAME_H', res[i].userName);
            thisComment = thisComment.replaceAll('COMMIID_H', res[i].ID);

            $('#commentlist' + postID).append(thisComment);

            // Event handlers
            $('#editCom' + res[i].ID).on('click', function(event){
                let id = event.target.id;
                editComment(id.slice(7), postID);
            });

            $('#deleteCom' + res[i].ID).on('click', function(event){
                let id = event.target.id;
                deleteComment(id.slice(9), postID);
            });
        
            if(session.username != res[i].userName){
                $('#deleteCom' + res[i].ID).css('display', 'none');
                $('#editCom' + res[i].ID).css('display', 'none');
            }
        }
        // myComment = myComment.replace('USERNAME_H', postID);
    });
    
}

function deleteComment(commentID, postID){
    var toDel = new FormData();
    toDel.append('commentID', commentID);

    ajaxRequest('GET', 'http://localhost:8080/photobook/deleteComment', toDel, function(o){
        renderComments(postID);
    });
}

function editComment(commentID, postID){
    $('#editCom' + commentID).html('Post Edit');
    $('#comm' + commentID).html('<input class="form-control" id="editBody' + commentID + '" placeholder="Add a comment" type="text">');
    $('#editCom' + commentID).off('click').on('click', function(){
        editCommentReq(commentID, postID, $('#editBody' + commentID).val());
    });
}

function editCommentReq(commentID, postID, comment){
    var editData = new FormData();
    editData.append('commentID', commentID);
    editData.append('comment', comment);

    ajaxRequest('GET', 'http://localhost:8080/photobook/editComment', editData, function(o){
        renderComments(postID);
    });
}