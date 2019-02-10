var express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express();
var path = require("path");
var server = require("http").createServer(app);
var index = require('./routes/index');


app.set('port', process.env.PORT || 3000);

app.engine('html', es6Renderer);
app.use(express.static(path.join(__dirname + './views')));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);

// ham nay de handle nhung thuoc tinh bat buoc co trong trong request, vi du nhu token trong header, cookie,.v.v.v.
 app.use(function(req, res, next) {
   next();
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