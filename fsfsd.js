app.use(expressValidator()); //what does this do?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

//hbs
hbs.registerPartials(__dirname + '/views/partials');

//firebase-admin
const serviceAccount = require("./bhredz-firebase-adminsdk-7nele-5f8b818b8b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bhredz.firebaseio.com"
});

//firebase
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

//products page
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

//404 page
app.get('*', (req, res) => {
    res.status(404);
    res.render('404.hbs', {
        title: '404',
        error: 'Page does not exist.'
    });
});

//add product
app.post('/firebase', function(request, response)
{
    var name=request.body.name;
    var price=request.body.price;
    var condition=request.body.condition;
    var location=request.body.location;
    var img = request.body.something;

    console.log('Image is: ', request.body);


    add.addData(name, price, condition, location, img);
    response.redirect('/');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login.hbs', {
        title: 'Login',
        email: 'Email',
        pass: 'Password'
    });
});

// Signup page
app.get('/signup', (req, res) => {
    res.render('signup.hbs', {
        title: 'Signup'
    });

//start server
    app.use(express.static(__dirname));
    var server = app.listen(process.env.PORT || 8080, () => {
        console.log('server is listening on port', server.address().port);
    });
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
