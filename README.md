# Matter

Welcome to MATTER - an events platform.

This platform allows community members to view, sign up for, and add events to their own personal calendars. Staff members also hav additional functionality to create and manage events.

To test the features out - login as Staff or Test below:

Staff email: staff@matter.com
Staff password: staff

Test email: test@email.com
Test password: test

## Instructions

Minimum version of Node.js, needed to run the project:

-   `"node": "v22.2.0"`

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
use # use shelfshare db, this will let you browse collections inside shelfshare db
show collections # lists collections inside used db
db.book.find().pretty() # list items in books collections

```

This project was built using React,js (Vite) and MongoDB Atlas
