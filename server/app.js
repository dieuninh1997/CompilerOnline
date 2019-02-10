var express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
var path = require("path");
var server = require("http").createServer(app);
var index = require('./routes/index');


app.set('port', process.env.PORT || 3000);
// server.listen(3000);
app.engine('html', es6Renderer);
app.use(express.static(path.join(__dirname + './views')));
// app.set('views', './views'); // general config
app.set('view engine', 'html');



app.use(express.static(path.join(__dirname, 'public')));

// app.get("/", function(req, res){
//     // res.send("<font color=red>Hello world</font>");
//     res.sendFile(__dirname + "/views/demo.html");
 
// })

app.use('/',index);

// catch err 404 and forward to error handler
app.use(function(req, res, next) {
    var error = new Error('Eror 404: Not found '+req.originalUrl);
    error.status = 404;
    next(error);
});

//error handler
app.use(function(error, req, res, next){
    console.log(error);
    //set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    //render the error page
    res.status(error.status || 500);
    res.render('error');
});

app.listen(app.get('port'));
module.exports = app;