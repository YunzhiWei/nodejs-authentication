# nodejs-authentication

This is a nodejs project to test many different kinds of authentication methods.

This project will include Express framework as well.

# Initial npm environment config

```
npm init
```

# Install Express

```
npm install -S express
```

# 1st version of `server.js`

# Install Morgan

```
npm install -S morgan
```

# Using `pulic` folder for static files

* add `public` folder
* create `index.html`
* save a copy for the current `server.js` (save as `server-1.js`)

# 2nd version of `server.js`

* update `server.js` to use 'morgan', to use `public` folder and listen to the port

# Install body-parser

```
npm install -S body-parser
```

# Save a copy for the current `server.js`

* save current `server.js` as `server-2.js`

# 3rd version of 'server.js'

* RESTful API: dishes

# Save a copy for the current `server.js`

* save current `server.js` as `server-3.js`

# 4th version of 'server.js'

* Express Router: dishes
* save current `server.js` as `server-4.js`

# more routers in dedicate foder `routes`

* move router source code from `server.js` into `dishes.js`
* add dedicate folder `routes`
* add two more routers
* save current `server.js` as `server-5.js`

# Basic Authentication

* authentication check & error handler
> if you put any routers or static pulic folder before authentication check, that will work properly without authentication check
> user name and password will be recorded and be binded in all subsequent http request
* save current `server.js` as `server-basic-auth.js`
