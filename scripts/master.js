//check sign up pass match
function checkpass(){
  var email = document.getElementById('signupemail');
  var pass1 = document.getElementById('signuppass1').value;
  var pass2 = document.getElementById('signuppass2').value;
  var signupbtndiv = document.getElementById('signupbtn');
  if (pass1 == pass2 && pass1.length >= 6){
    signupbtndiv.innerHTML = '<button type="button" class="btn btn-primary" onclick="adduser()" data-dismiss="modal">Submit</button>';
  }else{
    signupbtndiv.innerHTML = '<button type="button" class="btn btn-primary disabled">Submit</button>';
  }
}

//sign up new user
function adduser(){
  console.log("adding user");
  var email = document.getElementById('signupemail').value;
  var pass1 = document.getElementById('signuppass1').value;
  var pass2 = document.getElementById('signuppass2').value;
  cleansignup();
  if (pass1 == pass2){
    firebase.auth().createUserWithEmailAndPassword(email,
    pass1).catch(function(error) {
      // Handle Errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error: "+ error.message);
      console.log("User added");
    });
    response.render('home.hbs');
  };
};

//clean signup
function cleansignup(){
  document.getElementById('signupemail').value = "";
  document.getElementById('signuppass1').value = "";
  document.getElementById('signuppass2').value = "";
};

//login User
function signIn(){
  console.log("Signing In");
  var email = document.getElementById('loginemail').value;
  var password = document.getElementById('loginpass').value;
  cleanlogin();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log("Error signing in");
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
};

//clean login
function cleanlogin(){
  document.getElementById('loginemail').value = "";
  document.getElementById('loginpass').value = "";
};

//logout user
function signOut(){
  firebase.auth().signOut().then(function() {
    console.log("Signed out!");
    }).catch(function(error) {
    // An error happened.
  });
};

//login check
window.addEventListener("load", function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.loginemail = user.email;
      document.getElementById('login-logout').innerHTML = '<a class="nav-item nav-link disabled">' + user.email + '</a><a class="nav-item nav-link btn btn-danger" onclick="signOut()">Logout</a>';
    } else {
      // No user is signed in.
      document.getElementById('login-logout').innerHTML = '<a class="nav-item nav-link" data-toggle="modal" data-target="#loginmodal">Login</a><a class="nav-item nav-link btn btn-primary" data-toggle="modal" data-target="#signupmodal">Signup</a>';
    };
  });
});
