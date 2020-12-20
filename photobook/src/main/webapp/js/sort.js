function handleSort(){
    var alg = $('#sort').val();

    if(alg == 'RE'){
        getTop10Posts();
    }else if(alg == 'RA'){
        getPostsSortedRating();
    }else if(alg == 'HE'){
        getPostsSortedHeat();
    }
}