function addData(name, price, condition, location, image)
{
    const firebase = require('firebase/app');
    require('firebase/firestore');
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

    var db = firebase.firestore();


    //alert(name);
    var thename = name;
    var theprice = price;
    var thecondition = condition;
    var thelocation = location;
    var theImg = image;




    db.collection("Products").add({
            Price: theprice,
            Name: thename,
            Location: thelocation,
            Condition: thecondition,
            Img: theImg

            }
        )
            .then(function (docRef) {
                alert("Document written with ID: ", docRef.id);

            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

}

function imageUpload()
{
    fileButton.addEventListener('change', function (e) {
        let path;
        //get the file
        alert("uploading file...");
        var file = e.target.files[0];
        //create the storage ref
        let storageRef = firebase.storage().ref('images/' + file.name);
        //upload the file
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
                addData(file.name, 99, "good", "Burnaby");

                //console.log(file.name);

            }

        );

    });

}


module.exports = {
    addData
};

