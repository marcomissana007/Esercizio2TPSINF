const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const multer  = require('multer');
const fs  = require("fs");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage}).single('file');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {  
    res.json({url: "./files/" + req.file.filename});    
  })
});
app.get('/filelist', (req, res) => {
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        const modifiedArray = files.map((e) => {
            return "./files/" + e;
        });
        res.json({urlfiles: modifiedArray});
    });
});

const server = http.createServer(app);
server.listen(5600, () => {
  console.log("- server running");
});