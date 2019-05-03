const express = require('express');
var app = express();
const hbs = require('hbs');
const firebase = require('firebase');
const admin = require("firebase-admin");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//start server
app.use(express.static(__dirname));
var server = app.listen(process.env.PORT || 8080, () => {
  console.log('server is listening on prot',server.address().port);
});

//hbs
hbs.registerPartials(__dirname + '/views/partials');

//firebase-admin
const serviceAccount = require("./bhredz-firebase-adminsdk-7nele-5f8b818b8b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bhredz.firebaseio.com"
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-JUCw1YT0kN7rFez1AZckOvLC3E5kcY0",
  authDomain: "bhredz.firebaseapp.com",
  databaseURL: "https://bhredz.firebaseio.com",
  projectId: "bhredz",
  storageBucket: "bhredz.appspot.com",
  messagingSenderId: "37106834429"
};
firebase.initializeApp(config);

//get year, for copyright
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
})

// home page
app.get('/', (req, res) => {
  res.render('home.hbs', {
      title: 'Home'
  });
});

// Products page
app.get('/products', (req, res) => {
  res.render('abc.hbs', {
    title: 'Products'
  });
});

// Add products page
app.get('/add', (req, res) => {
  res.render('add.hbs', {
    title: 'Add a Product'
  });
});
