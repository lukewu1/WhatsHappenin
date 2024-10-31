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
// app.use(auth);

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

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `SELECT * FROM users WHERE username = $1 LIMIT 1;`;

  db.any(query, [username])
    .then(async (data) => {
      const match = await bcrypt.compare(password, data[0].password);
      if (match) {
        req.session.user = username;
        req.session.save();
        res.redirect("/discover");
      } else {
        res.redirect("/register");
      }
    })
    .catch(function (err) {
      console.log("Error registering user: ", err);
      res.redirect("/register");
    });
});

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post("/register", async (req, res) => {
  //hash the password using bcrypt library
  const username = req.body.username;
  const hash = await bcrypt.hash(req.body.password, 10);

  // To-DO: Insert username and hashed password into the 'users' table
  const select = `SELECT * FROM users WHERE username = $1 LIMIT 1;`;
  db.any(select, [username])
    .then((data) => {
      if (data[0]) {
        res.redirect("/login");
      } else {
        const insert = `INSERT INTO users (username, password) VALUES ($1, $2);`;
        db.none(insert, [username, hash])
          .then((data) => {
            req.session.user = username;
            req.session.save();
            res.redirect("/discover");
          })
          .catch(function (err) {
            console.log("Error registering user: ", err);
            res.redirect("/register");
          });
      }
    })
    .catch(function (err) {
      console.log("Error registering user: ", err);
      res.redirect("/register");
    });
});

app.get("/discover", auth, async (req, res) => {
  try {
    const response = await axios({
      url: `https://app.ticketmaster.com/discovery/v2/events.json`,
      method: "GET",
      dataType: "json",
      headers: {
        "Accept-Encoding": "application/json",
      },
      params: {
        apikey: process.env.API_KEY,
        keyword: "Don Toliver", //you can choose any artist/event here
        size: 10, // you can choose the number of events you would like to return
      },
    })
      .then((results) => {
        if(!results.data || !results.data._embedded ) {
          res.render("pages/discover", {
            results: [],
            message: "",
          });
        } else {
          console.log("==============");
          console.log(results.data._embedded.events); // the results will be displayed on the terminal if the docker containers are running // Send some parameters
          console.log("==============");
          res.render("pages/discover", {
            results: results.data._embedded.events,
            message: "",
          });
        }
       

        
      })
      .catch((error) => {
        console.error(error);
        res.render("pages/discover", {
          results: [],
          message: "Failed to fetch events. Please try again later.",
        });
      });

    // Render discover.hbs with results
  } catch (error) {
    console.error(error);
    res.render("pages/discover", {
      results: [],
      message: "Failed to fetch events. Please try again later.",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});
// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log("Server is listening on port 3000");
