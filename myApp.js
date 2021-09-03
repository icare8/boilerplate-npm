var express = require('express');
var app = express();

console.log("Hello World");

/*Parsing POST requests with body-parser */
const bParser = require('body-parser');
app.use(bParser.urlencoded({ extended: false }));
// app.use(bParser.json());

/*Get data from POST request */
app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

/*Get query parameters */
app.get("/name", function(req, res) {
  // var firstName = req.query.first;
  // var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

/*Serve static assets */
app.use("/public", express.static(__dirname + "/public"));

/*Root-Level Logger*/
app.use(
  function (req,res,next) {
  console.log(
    req.method + " " + req.path + " - " + req.ip
  )
  next()
}
)

function logReqInfo(req,res,next) {
  console.log(
    req.method + ' ' +
    req.path + ' ' +
    req.ip
  )
  next()
}

/*Environment variable */
const mySecret = process.env['MESSAGE_STYLE ']
app.use("/json", function(req, res) {
  if (mySecret == "uppercase") {
    res.json(
      {"message": "HELLO JSON"}
        )
  }
  else {
    res.json(
      {"message": "Hello json"}
        )
  }
});

/*Middleware chaining*/
app.get("/now", (req,res,next) => {
  req.time = new Date().toString();
  next();
}, (req,res) => {
  res.send(
    {time: req.time}
  );
});

/*Route Parameter Input */
app.get("/:word/echo",
(req,res) => {
  res.send(
    {echo:req.params.word}
    )
})


/*Serve HTML file */
function helloExpress(req, res) {
  // res.send('Hello Express');
  res.sendFile( __dirname + "/views/index.html")
}
app.get("/", helloExpress)



































 module.exports = app;
