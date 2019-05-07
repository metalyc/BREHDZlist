/*
const firebase = require('firebase/app');
require('firebase/firestore');
//require('firebase/storage');
require('firebase/auth');

var config = {
    apiKey: "AIzaSyD-JUCw1YT0kN7rFez1AZckOvLC3E5kcY0",
    authDomain: "bhredz.firebaseapp.com",
    databaseURL: "https://bhredz.firebaseio.com",
    projectId: "bhredz",
    storageBucket: "bhredz.appspot.com",
    messagingSenderId: "37106834429"
};


firebase.initializeApp(config);

*/
/*
function addData(name, price, condition, location)
{



    var db = firebase.firestore();


            db.collection("Products").add({
                    Price: price,
                    Name: name,
                    Location: location,
                    Condition: condition,

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




}
*/

/////////////
//const image = require('./image.js');


function imageUpload()
{
    fileButton.addEventListener('change', function (e) {
        //get the file
        alert("uploading file...");
        var file = e.target.files[0];
        //create the storage ref
        let storageRef = firebase.storage().ref('images/' + file.name);
        //uplaod the file
        var task = storageRef.put(file);
        //update the progress bar
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                //filename = file.name;
                alert("upload complete");
                //console.log(file.name);
                window.path=file.name;

            }
        );
        console.log(window.path);

    });
}




