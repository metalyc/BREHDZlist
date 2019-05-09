var holder = document.getElementById("holder");
//get a ref to Firebase Storage
var storage = firebase.storage();
////////////// Will
function getImageForPath(p){
  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child(p);
  storageRef.child(p).getDownloadURL().then(function(url) {
    window.fullurl = url;
    console.log(fullurl);
    holder.src = fullurl;
  }).catch(function(error) {
    //catch error here
  });
};

window.addEventListener("load", function() {
  var uploader = document.getElementById("uploader");
  document.getElementById("fileButton").addEventListener('change', function(e){
    //get the file
    console.log("uploading file...");
    window.file = e.target.files[0];
    //create the storage ref
    var storageRef = firebase.storage().ref('images/'+file.name);
    //uplaod the file
    var task = storageRef.put(file);
    //update the progress bar
    task.on('state_changed',
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      uploader.value = percentage;
    },
    function error(err){
      cosole.log(err);
    },
    function complete(){
      console.log("upload complete");
      getImageForPath('images/' + file.name);
    });
  });
});

function addData(){
  console.log('adding')
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var location = document.getElementById("location").value;
  var condition = document.getElementById("condition").value;
  var phone = document.getElementById("phone_number").value;
//  var fullurl = getImageForPath('images/' + file.name);
  console.log(file.name, fullurl);
  firebase.firestore().collection("Products").add({
    Price: price,
    Name: name,
    Location: location,
    Condition: condition,
    Phone: phone,
    Img: fullurl
  })
  .then(function(docRef) {
    console.log("data successfully added!")
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  })
};
