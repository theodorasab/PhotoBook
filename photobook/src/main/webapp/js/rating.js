function renderRatings(postID){
    var data = new FormData();
    var avg = 0;
    data.append('postID', postID);

    ajaxRequest('GET', 'http://localhost:8080/photobook/getPostRatings', data, function(o){
        var res = JSON.parse(o.responseText);

        let counter = 0;
        for(let i = 0; i < res.length; i++){
            counter += res[i].rate;
        }

        if(res.length > 0) avg = parseFloat(counter / res.length).toFixed(2);
            
        $('#avg' + postID).html(avg);
    });
}