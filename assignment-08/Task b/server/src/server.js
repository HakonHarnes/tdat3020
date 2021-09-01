//@flow
import express from 'express';

import path from 'path';
import reload from 'reload';
import fs from 'fs';

const public_path = path.join(__dirname, '/../../client/public');
const crypto = require('crypto');
const Token = require('./token.js');
const app = express();

app.use(express.static(public_path));
app.use(express.json());

// List of registered users
let users = {};

// Registers a user
let registerUser = (username, serverHash, salt, token) => {
   // Checks if user is already registerd
   if (users[username] != null) return null;

   // Initializes new user 
   let user = {
      [username]: {
         salt: salt,
         hash: serverHash,
         token: '',
      },
   };

   // Adds new user to list
   users = { ...users, ...user };

   return user;
};

// End-point for registering a user
app.post('/register', (req, res) => {
   const username = req.body.username;
   const clientHash = req.body.clientHash;

   // Encrypts client hash (to create server hash) and stores this along with the username and salt
   let salt = crypto.randomBytes(512).toString('base64');
   crypto.pbkdf2(clientHash, salt, 4096, 512 / 32, 'SHA512', (error, serverHash) => {
      if (error) res.status(500).send();

      // Checks if registration is OK
      if (registerUser(username, serverHash.toString('hex'), salt) == null) res.status(409).send();

      res.status(201).send();
   });
});

// End-point for logging in a user
app.post('/login', (req, res) => {
   const username = req.body.username;
   const clientHash = req.body.clientHash;

   // Checks if user is registered
   let user = users[username];
   if (user == null) return res.status(401).send();

   // Encrypts the client hash and checks if it equals the server hash
   crypto.pbkdf2(clientHash, user.salt, 4096, 512 / 32, 'SHA512', (error, serverHash) => {
      if (error) res.status(500).send();

      // Checks if user hash and server hash is equal
      if (user.hash != serverHash.toString('hex')) return res.status(401).send();

      // Generates new token 
      let token = new Token(Object.keys(users).length, 0);
      users[username].token = token;

      // Sends token to client 
      res.setHeader('Authorization', token.toString());
      return res.status(200).send();
   });
});

// End-point for validating token
app.post('/token', (req, res) => {
   const username = req.body.username;

   // Checks if user is registered
   let user = users[username];
   if (user == null) return res.status(401).send();

   // Checks if client token and server token equals
   let token = req.headers.authorization;
   if (user.token.toString() != token) return res.status(401).send();

   // Checks that the token is still valid (time based)
   if (!user.token.validate()) return res.status(401).send();

   // Token is valid
   return res.status(200).send();
});

// Hot reloading
reload(app).then((reloader) => {
   app.listen(4000, (error: ?Error) => {
      if (error) console.error(error);
      console.log('Express server started');
      reloader.reload();
   });
});
