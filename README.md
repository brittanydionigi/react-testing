The Day I POOPED MYSELF

### API

#### Users

To sign in send a post request to - `/api/users`
  To sign in you will need to pass in email and password to the body.
  Emails should be sent in all lowercase.

To create an account - `/api/users/new`
  Creating an account must have all input fields filled in (name, email, password)
  You must send all three into the body. Passwords are case sensitive.
  Keep in mind the response only gives the new user ID.

To add favorites - `/users/favorites/new`
  Once the user is signed in they should be able to save favorites.
  To save a favorite you must send in the movie_id, user_id and title.

To get all favorites for a user - `/users/:id/favorites`
  To get a users favorite movies you need to send in the user ID.

To delete a single favorite - `/users/:id/favorites/:favID`
  To delete a users favorite you must send in the users id and id of the movie.


Iteration options:

0: Pull in movie API
  * Pull most recent movies from ?????? given api.
  * Display each movie

1: Sign In / Sign Out functionality
  * Be able to sign in and sign out.
  * Ability to create a user.
  * Flash messages based off errors - ex: Email already exists.
  * Should only take legit emails - regex

2: Favorites
  * Each movie should be displayed with a favorite button.
  * If the user is not signed in and clicks on a favorite button the user will be prompted with the request to
  create an account.
  * After being clicked the movie card should have a visual change.
  * If the user visits `/favorites` the should see a list of all their favorite movies.
