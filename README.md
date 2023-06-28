# Social Network API

## Description
This social network API allows you to perform CRUD operations on users, thoughts, and reactions to those thoughts.
I created this app as an exercise in using [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/).

## Installation
Before running the app, you insert sample data into the database with `npm run seed`.  Environment variables can be used
to customize the database connection string (`MONGODB_URI`, default `mongodb://127.0.0.1:27017/socialNetworkDB`), and
the app's port (`PORT`, default `3001`).  These values will be picked up automatically if they are stored in a `.env`
file in the project's root.  See [dotenv](https://www.npmjs.com/package/dotenv) for more details.

## Usage
The User model has the following fields:
* `_id` (`ObjectId`, will be given a default value if none is provided)
* `username` (`String`, must be unique)
* `email` (`String`, must be unique, must be a valid email address)
* `thoughts` (array of Thought `ObjectId`s)
* `friends` (array of User `ObjectId`s)

The following paths can be used to interact with Users:
* `/api/users` (`GET` returns all users, `POST` creates a user)
* `/api/users/:userId` (`GET`, `PUT`, and `DELETE` data for a particular user)
* `/api/users/:userId/friends/:friendId` (`POST` adds the User with `_id`=`friendId` to the User with `_id`=`userId`'s friend list, and `DELETE` removes them)

The Thought model has the following fields:
* `_id` (`ObjectId`, will be given a default value)
* `thoughtText` (`String`, max length 280)
* `createdAt` (`Date`, default value: `Date.now()`)
* `username` (`String`)
* `reactions` (Array of Reactions)

Reactions have the following fields:
* `reactionId` (`ObjectId`, will be given a default value)
* `reactionBody` (`String`, max length 280)
* `username` (`String`)
* `createdAt` (`Date`, default value: `Date.now()`)

The following paths can be used to interact with Thoughts and Reactions:
* `/api/thoughts` (`GET` returns all thoughts, `POST` creates a thought)
* `/api/thoughts/:thoughtId` (`GET`, `PUT`, and `DELETE` data for a particular thought)
* `/api/thoughts/:thoughtId/reactions` (`POST` adds a new reaction, `DELETE` removes one)

When creating a Thought, if a valid `username` is provided, the Thought's `_id` will be added to the User's `thoughts` array.  If a User's
`username` is updated, that change will be propagated to all Thoughts in their `thoughts` array, but not to Reactions.  Deleting a User also 
deletes all of their Thoughts.

## Credits
The email validation regex was taken from [the HTML spec](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address).
Sample data was generated with [https://loremipsum.io/](https://loremipsum.io/).

## License
MIT