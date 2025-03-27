const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();

const port = process.env.port || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    //session initialzation
    .use(passport.initialize())
    //init passport on every route call
    .use(passport.session())
    // allow passport to use express-session
    .use((req, res, next) => {
        res.setHeader("Access-Controll-Allow-Origin", "*");
        res.setHeader(
            "Access-Controll-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Access-Controll-Allow-Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: "*" }))
    .use("/", require("./routes"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    }, 
    function(acccessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/", (req, res)=> { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: `Logged Out`)});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}), 
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `cuaght exception: ${err}\n` + `Exception Origin: ${origin}\n`);
});

mongodb.initDb((err)=> {
    if(err) {
        console.error(err);
    } else {   
        app.listen(port, () => console.log(`Database listening and node running on port: ${port}`));
    }
});