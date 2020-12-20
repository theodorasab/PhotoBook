function getTime(createdAt) {
    var since = '';
    datetime = createdAt.split(' ');
    date = datetime[0].split('-');
    time = datetime[1].split(':');

    var today = new Date();

    var ago = today.getDate() * 86400 + today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds() - date[2] * 86400 - time[0] * 3600 - time[1] * 60 - time[2];

    if (ago < 60) {
        since = Math.floor(ago) + ' seconds ago';
    } else if (ago < 3600) {
        since = Math.floor(ago / 60) + ' minutes ago';
    } else if (ago < 86400) {
        since = Math.floor(ago / 3600) + ' hours ago';
    } else {
        since = Math.floor(ago / 86400) + ' days ago';
    }

    return since;
}