
var config = {
    apiKey: "AIzaSyD-JUCw1YT0kN7rFez1AZckOvLC3E5kcY0",
    authDomain: "bhredz.firebaseapp.com",
    databaseURL: "https://bhredz.firebaseio.com",
    projectId: "bhredz",
    storageBucket: "bhredz.appspot.com",
    messagingSenderId: "37106834429"
};

var firebase = require('firebase');
require('firebase/storage');
var app = firebase.initializeApp(config);

var db = firebase.firestore();

function addData(name, price, condition, location, image)
{
    console.log('In new function'+name, price, condition, location, image);
    //const firebase = require('firebase/app');
    //require('firebase/firestore');
    // require('firebase/auth');
    //
    // var config = {
    //     apiKey: "AIzaSyD-JUCw1YT0kN7rFez1AZckOvLC3E5kcY0",
    //     authDomain: "bhredz.firebaseapp.com",
    //     databaseURL: "https://bhredz.firebaseio.com",
    //     projectId: "bhredz",
    //     storageBucket: "bhredz.appspot.com",
    //     messagingSenderId: "37106834429"
    // };
    //
    // firebase.initializeApp(config);
    //
    // var db = firebase.firestore();


    //alert(name);
    var thename = name;
    var theprice = price;
    var thecondition = condition;
    var thelocation = location;
    var theImg = image;


    function getImageForPath(p){
        global.XMLHttpRequest = require('xhr2');
        

        var storageRef = firebase.storage().ref();
        var spaceRef = storageRef.child(p);

        storageRef.child(p).getDownloadURL().then(function(url) {
            var fullurl = url;
            db.collection("Products").add({
                    Price: price,
                    Name: name,
                    Location: location,
                    Condition: condition,
                    Img: fullurl
                }
            )
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
//update the products view
                    //getProducts();
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        }).catch(function(error) {
            //catch error here
        });
    }
    getImageForPath('images/'+image);



    // db.collection("Products").add({
    //         Price: price,
    //         Name: thename,
    //         Location: thelocation,
    //         Condition: thecondition,
    //         Img: theImg
    //
    //         }
    //     )
    //         .then(function (docRef) {
    //             console.log("Document written with ID: ", docRef.id);
    //
    //         })
    //         .catch(function (error) {
    //             console.error("Error adding document: ", error);
    //         });

}




module.exports = {
    addData
};

