Delete User:

Every user gets the ability to delete their own account through their dashboard, invoking deleteUser to our server.

Cryptography of passwords:

MD5 was used to hash the password both in login and register so the server never sees the original password.

Users status:

Any user that has done an action in the past minute is marked as online and can be listed in "Online Users"

Use face++ to recognize faces with known usernames in posts:

If an image is present on a post, it will be sent for analyzing to the Face++ API which will then return whether it has a known registered user with this image.

Comments for posts:

Every user can add a comment to every post while also being able to edit and delete their own using the buttons on the side.

Ratings of posts:

Every user can rate a post, creating a Rating for current post with a unique ID.

User recommendations:

The find friends section lists a number of users with the same interests as our current user, according to their ratings in same posts.

Sorting:

An attempt of sorting was made under js/getUserPosts.js
