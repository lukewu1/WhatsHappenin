// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require("express"); // To build an application server or API
const app = express();
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");
const pgp = require("pg-promise")(); // To connect to the Postgres DB from the node server
const bodyParser = require("body-parser");
const session = require("express-session"); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require("bcryptjs"); //  To hash passwords
const axios = require("axios"); // To make HTTP requests from our server. We'll learn more about it in Part C.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: "hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});

// database configuration
const dbConfig = {
  host: "db", // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then((obj) => {
    console.log("Database connection successful"); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post('/login', async (req, res) => {
  //hash the password using bcrypt library
  const query = 'SELECT * FROM users WHERE username = $1';
  const user = await db.oneOrNone(query, [req.body.username]);

  if(user){
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match)
      {
        //save user details in session like in lab 7
        req.session.user = user;
        req.session.save();
        res.redirect('/discover');
      }
      else
      {
        res.render('pages/login', {message: "Incorrect username or password."});
      }
  }
  else{
    res.redirect('/register');
  }
});

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post('/register', async (req, res) => {
  if(req.body.password != req.body.confirmpassword){
    res.render('pages/register', {message: "Passwords didn't match."});
  }
  else
  {
    const hash = await bcrypt.hash(req.body.password, 10);
    const check_query = 'SELECT * FROM users WHERE username = $1 LIMIT 1';
    const insert_query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';

    user_exists = await db.oneOrNone(check_query, [req.body.username]);

    if(user_exists)
    {
      res.render('pages/login');
    }
    else{
      db.one(insert_query, [req.body.username, hash])
      .then(function (data){
        res.redirect('/discover');
      })
      .catch(function(err)
      {
        res.redirect('/register');
      })
    }
  }
});

// Authentication Middleware.
const auth = (req, res, next) => {
  console.log(req.session);
  if (!req.session.user) {
    // Default to login page.
    return res.redirect("/login");
  }
  next();
};

// Authentication Required
app.use(auth);

app.get("/newsSearch", auth, async (req, res) => {
    const axios = require("axios");

async function getLiveNews() {
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
        params: {
        q: "Live news",
        location: "Austin, Texas, United States",
        hl: "en",
        gl: "us",
        api_key: "2639dc1ea4d0ea48dbc78d2741a887f653723d0e8bb286c2380c2861503e721e"
      }
    });

    // Log the local news section from the response
    console.log(response.data.local_news);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Call the function
getLiveNews();
});

app.get("/newsMap", (req, res) => {
  
  const mapAPI = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API_KEY}&callback=console.debug&libraries=maps,marker&v=beta`

  res.render("pages/newsMap", { mapAPI });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

app.get("/savedArticles", (req, res) => {
  res.render("pages/savedArticles");
});
// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log("Server is listening on port 3000");
