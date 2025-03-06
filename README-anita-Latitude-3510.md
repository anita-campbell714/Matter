# Matter

Welcome to MATTER - an events platform.

This platform allows community members to view, sign up for, and add events to their own personal calendars. Staff members also have additional functionality to create and manage events.

## Instructions

Minimum version of Node.js, needed to run the project:

-   `"node": "v22.2.0"`

1. Start off by cloning the repository to your local database. To do this: open your terminal and `cd` into your prefered directory. Then do the following:

    - run the command `git clone https://github.com/NeetzBeatz/be-nc-news.git`

    - `cd` into this newly cloned repository
    - Open the repository in your [VS Code](https://code.visualstudio.com/) software

        - you can use the command: `code .` as a shortcut to open the repository in [VS Code](https://code.visualstudio.com/) from your terminal

**To install frontend and backend dependencies** 2. In your [VS Code](https://code.visualstudio.com/) terminal, navigate to the backend server folder (/matter/matter-api): - `npm install` - `nodemon listen.js` to start the MongoDB database.

3. In your [VS Code](https://code.visualstudio.com/) terminal, navigate to the front end client folder (/matter/matter-client) and run `npm run dev` to view the website in your browser.

### Test out the site

To test the features - login as **Staff** or **Test** below to start creating and booking events!

**Staff email:** staff@matter.com
**Staff password:** staff

**Note that any accounts other than Staff will have the Manage My Events button disabled:(account/events).**

**Test email:** test@email.com
**Test password:** test

Alternatively, create a new user account to get started!

### Back-end

If you have been given access, log in to [MongoDB Atlas](https://account.mongodb.com/account/login) to view all bookings, users and events

#### How to install local MongoDB

For installing MongoDB on your computer, follow steps outined in [this](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) guide.

Once installed, you can start your local MongoDB instance by running:

```
sudo service mongod start
```

#### Connecting to local MongoDB instance

Install MongoDB shell:

```
sudo apt-get install -y mongodb-mongosh
```

Connect to local MongoDB instance:

```
mongosh
```

Once connected, you can view and inspect all existing databases and collections:

```
show dbs # list databases
use # use test db, this will let you browse collections inside test db
show collections # lists collections inside used db
db.book.find().pretty() # list items in books collections

```

This project was built using React.js (Vite) and MongoDB Atlas.
