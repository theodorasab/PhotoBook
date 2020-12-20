'user strict';

function deletePost(postID) {
    var data = new FormData();
    data.append('postID', postID);
    ajaxRequest('GET', 'http://localhost:8080/photobook/deletePost', data, function () {

        if (session.page == pages.PROFILE) {
        $('#userposts').html('');
            getUserPosts(session.username);
        } else if (session.page == pages.MAIN) {
            $('#posts').html('');
            getTop10Posts();
        }


    });
}

