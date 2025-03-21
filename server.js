const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");

const app = express();

const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use("/", require("./routes"));

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