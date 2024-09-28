// const fs = require('fs');

// fs.appendFile("hey.txt", ", it's me sushant", function(err){
//     if(err) console.error(err);
//     else console.log("donee");
// })


// const http = require('node:http');

// const server = http.createServer(function(req, res){
//     res.end("hello worldd");
// })
// server.listen(3000);

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



// app.use(function(req, res, next){
//     console.log("this is middleware");
//     next();
// })

app.get('/', function (req, res) {
  fs.readdir(`./files`, function(err, files){
    res.render('script',{files: files});
  })
})

app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
      res.redirect("/");
    });
})

app.get('/file/:filename', function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err, filedata){
    res.render('show', {filename : req.params.filename, filedata : filedata})
  });
})

app.listen(3000);