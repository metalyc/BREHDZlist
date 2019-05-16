const express = require('express');
var app = express();
const hbs = require('hbs');
const firebase = require('firebase');
//const admin = require("firebase-admin");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var app = express();

//Encryption Stuff
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "dc40d732e3e90dc6387dc107a26b6311";
const iv = crypto.randomBytes(16);
var flag = 0;

//Needed to use partials folder
hbs.registerPartials(__dirname + '/views/partials');
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

///////////
//helpers//
///////////

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

//set site name
hbs.registerHelper('siteName', () => {
    return 'BREHDZlist';
});

//comment required
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

////////////////
//Page routing//
////////////////

//home page
app.get('/', (req, res) => {
  flag = 0;
    res.render('home.hbs', {
        title: 'Home'
    });
});

//product listing page
app.get('/products', (req, res) => {
  flag = 0;
    res.render('abc.hbs', {
        title: 'Products'
    });
});

//add products page
app.get('/add', (req, res) => {
  flag = 0;
    res.render('add.hbs', {
        title: 'Add a Product'
    });
});

//login page
app.get('/login', (req, res) => {
  flag = 0;
    res.render('login.hbs', {
        title: 'Login'
    });
});

//signup page
app.get('/signup', (req, res) => {
  flag = 0;
    res.render('signup.hbs', {
        title: 'Signup'
    });
});

//search page
app.get('/search', (req, res) => {
  flag = 0;
  res.render('search.hbs', {
    title: 'Search'
  });
});

//product detail pages
app.get('/products/:page', (req, res) => {
  var curUrl = req.params.page;
  var docRef = firebase.firestore().collection("Products").doc(curUrl);
  docRef.get().then(function(doc) {
    let phone = JSON.stringify(decrypt(doc.data().Phone)).split("\\u")[0].substr(1);
    if(flag === 0) {
      res.render('baseProduct.hbs', {
        name: doc.data().Name,
        price: doc.data().Price,
        img: doc.data().Img,
        location: doc.data().Location,
        condition: doc.data().Condition,
        phone: phone,
        human: 'No'
      });
    } else {
      res.render('baseProduct.hbs', {
        name: doc.data().Name,
        price: doc.data().Price,
        img: doc.data().Img,
        location: doc.data().Location,
        condition: doc.data().Condition,
        phone: phone,
        human: 'Yes'
      });
    }
  });
});

/////////////
//functions//
/////////////

//for encrypting phone numbers before posting to firebase
function encrypt(phone) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(phone);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

//for decrypting encrypted phone numbers from firebase
function decrypt(phone) {
  let iv = Buffer.from(phone.iv, 'hex');
  let encryptedText = Buffer.from(phone.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  decipher.setAutoPadding(false);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

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

const request = require('request');
function addData(name, price, condition, location, image, phone, category, email) {
  console.log(image);
  var thename = name;
  var theprice = price;
  var thecondition = condition;
  var thelocation = location;
  var theImg = image;
  var theNumber = phone;
  var theCategory = category
  var encryptedphone = encrypt(phone);
  var decryptedphone = decrypt(encryptedphone);

  function getImageForPath(p){
    //console.log(p);
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
        Phone: encryptedphone,
        Img: url,
        Category: category,
        Email: email
      }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        console.log(encryptedphone);
        console.log(decryptedphone);
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

//post for adding content to firebase
app.post('/firebase', function(req, res) {
  var name=req.body.name;
  var price=req.body.price;
  var condition=req.body.condition;
  var location=req.body.location;
  var img = req.body.something;
  var phone = req.body.phone_number;
  var email = req.body.email;
  var category=req.body.category;
  console.log(email);
  console.log(img);

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
  //return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = "6Lcdi6IUAAAAAL-HspS-Y9UmWuoE0ToxT8BSXjnc";
  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);
    if(body.success !== undefined && !body.success) {
      res.render('add.hbs', {
        error:"Please complete the reCAPTCHA"
      }); //return res.json({"responseError" : "Failed captcha verification"});
    }
    //res.json({"responseSuccess" : "Sucess"});
    else {
      addData(name, price, condition, location, img, phone, category, email);
      res.redirect('/');
    }
  });
});

  //captcha lock for contact info in product details
  app.post('/getcontact', (req, res) => {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = "6Lcdi6IUAAAAAL-HspS-Y9UmWuoE0ToxT8BSXjnc";
  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);
    if(body.success !== undefined && !body.success) {
      console.log('Failed');    //return res.json({"responseError" : "Failed captcha verification"});
    }
    //res.json({"responseSuccess" : "Sucess"});
    else {
     flag = 1;
     res.redirect('back');
    }
  });
});

//post for search
app.post('/search', function(req, res) {
  var proname = req.body.productname;
  var category=req.body.category;
  var arr = [];
  var curUrl = req.params.page;
  var docRef = firebase.firestore().collection("Products").doc()
  firebase.firestore().collection("Products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if((proname === doc.data().Name && category === doc.data().Category) || (proname === doc.data().Name && category === 'choose') || proname === '' && category === doc. data(). Category) {
        //var tablename=Math.random();
        var tablename='hello';
        console.log('hello');
        var name=doc.data().Name;
        //var price=req.body.price;
        var condition=doc.data().Condition;
        var location= doc.data().Location;
        var img =  doc.data().Img;
        var price = doc.data().Price;
        var id = doc._key.path.segments[6];
        arr.push({Price: price, Name: name, Condition: condition, Location: location, Img: img, id: id});
      }
    });
    console.log(arr);
    res.render('results.hbs', {
      arr: arr
    });
  });
});

//////////////////
//Authentication//
//////////////////

//post for user signup
app.post('/newUser', (request, response) => {
    var email = request.body.email;
    var password1 = request.body.password1;
    var password2 = request.body.password2;

    if (password1 === password2) {
        firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then(function() {
          response.render('signup.hbs', {
              message: `Created account for ${email}`
          })
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
});

//post for login and helper for username
app.post('/actionlogin', (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(function() {
    //console.log("logged in with", email);
    app.locals.user = true;
    hbs.registerHelper('username', () => {
      return email;
    });
    res.redirect('/');
  })
  .catch(function(error){
      res.render('login.hbs', {
          message: error.message
      });
    console.log("Error with code:", error.code, "\nWith message:", error.message);
  });
});

//logout function
app.get('/logout', (req, res) => {
  firebase.auth().signOut()
  .then(function() {
    //console.log("Signed out.");
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
var server = app.listen(process.env.PORT || 8000, () => {
    console.log('server is listening on port', server.address().port);
});

/////////////////////////////////////////
//Don't place code down here, scroll up//
/////////////////////////////////////////
