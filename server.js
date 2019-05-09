const express = require('express');
var app = express();
const hbs = require('hbs');
const firebase = require('firebase');
//const admin = require("firebase-admin");
const bodyParser = require('body-parser');
//const url = require('url');
//const fs = require('fs');
const expressValidator = require('express-validator');
var app = express();
/*
app.use(session({ secret: 'krunal', resave: false, saveUninitialized: true }));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
*/
var port = process.env.PORT || 8080;

//Needed to use partials folder
hbs.registerPartials(__dirname + '/views/partials');

//Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


//Helpers End


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

app.use(expressValidator()); //what does this do?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
const serviceAccount = require("./bhredz-firebase-adminsdk-7nele-5f8b818b8b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bhredz.firebaseio.com"
});
*/

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

//set site name
hbs.registerHelper('siteName', () => {
    return 'BREHDZlist';
});

//home page
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home'
    });
});
app.get('/products', (req, res) => {
    res.render('abc.hbs', {
        title: 'Products'
    });
});

//add products page
app.get('/add', (req, res) => {
    res.render('add.hbs', {
        title: 'Add a Product'
    });
});

//login page
app.get('/login', (req, res) => {
    res.render('login.hbs', {
        title: 'Login'
    });
});

//signup page
app.get('/signup', (req, res) => {
    res.render('signup.hbs', {
        title: 'Signup'
    });
});

app.get('/product/*', (req, res) => {
  res.render('productspageContinued.hbs');
});

//const firebase=require('firebase');
const a = require('firebase/storage');
var config = {
    apiKey: "AIzaSyD-JUCw1YT0kN7rFez1AZckOvLC3E5kcY0",
    authDomain: "bhredz.firebaseapp.com",
    databaseURL: "https://bhredz.firebaseio.com",
    projectId: "bhredz",
    storageBucket: "bhredz.appspot.com",
    messagingSenderId: "37106834429"
};
firebase.initializeApp(config);
var db = firebase.firestore();
//  console.log(db);


function addData(name, price, condition, location, image, phone)
{
  console.log(image);

    var thename = name;
    var theprice = price;
    var thecondition = condition;
    var thelocation = location;
    var theImg = image;
    var theNumber = phone;

    function getImageForPath(p){
//      console.log(p);
        global.XMLHttpRequest = require('xhr2');


        var storageRef = firebase.storage().ref();
        var spaceRef = storageRef.child(p);

        storageRef.child(p).getDownloadURL().then(function(url) {
            //console.log(db.collection("Products"));
            //var fullurl = url;
            console.log('hello');
            db.collection("Products").add({
                    Price: price,
                    Name: name,
                    Location: location,
                    Condition: condition,
                    Phone: phone,
                    Img: url
                  }).then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
//update the products view
                    //getProducts();
                }).catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        }).catch(function(error) {
            //catch error here
            console.log(error);
        });
    }
    getImageForPath('images/'+image);
}

app.post('/firebase', function(request, response)
{
    var name=request.body.name;
    var price=request.body.price;
    var condition=request.body.condition;
    var location=request.body.location;
    var img = request.body.something;
    var phone = request.body.phone_number;
    console.log(img);

    //console.log('Image is: ', request.body);


    addData(name, price, condition, location, img, phone);
    response.redirect('/');
});

// POST for user signup
app.post('/newUser', (request, response) => {
    var email = request.body.email;
    var pwd1 = request.body.password1;
    var pwd2 = request.body.password2;

    if (pwd1 === pwd2) {
        firebase.auth().createUserWithEmailAndPassword(email, pwd1).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        response.render('signup.hbs', {
            message: `Created account for ${email}`
        })
    }
});

//post for login and helper for username
app.post('/actionlogin', (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(function() {
    console.log("logged in with", email);
    app.locals.user = true;
    hbs.registerHelper('username', () => {
      return email;
    });
    res.redirect('/');
  })
  .catch(function(error){
    console.log("Error with code:", error.code, "\nWith message:", error.message);
  });
});

//logout function
app.get('/logout', (req, res) => {
  firebase.auth().signOut()
  .then(function() {
    console.log("Signed out.");
    app.locals.user = false;
    res.redirect('/');
  })
  .catch(function(error) {
    console.log("Error with code:", error.code, "\nWith message:", error.message);
  });
});



/////////////////////////////
//Place all code above here//
/////////////////////////////

//404 page
app.get('*', (req, res) => {
    res.status(404);
    res.render('404.hbs', {
        title: '404',
        error: 'Page does not exist.'
    });
});

//start server
app.use(express.static(__dirname));
var server = app.listen(process.env.PORT || 8080, () => {
    console.log('server is listening on port', server.address().port);
});

/////////////////////////////////////////
//Don't place code down here, scroll up//
/////////////////////////////////////////
