var gulp=require('gulp');
var concat=require('gulp-concat');
var livereload=require('gulp-livereload');
var uglify=require('gulp-uglify');
var cssmin=require('gulp-cssmin');
var plumber=require('gulp-plumber');
var open=require('gulp-open');
var less=require('gulp-less');
var path=require('path');
var exec = require('child_process').exec;
var colors = require('colors');

//color def 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

//tasks

//open
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:3000',
    app: 'google-chrome-stable'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

//task to run a comand
gulp.task('ping', function(cb){
  exec('ping localhost', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

//compress js
gulp.task('compress',function(){

	gulp.src('./js/*.js')
	.pipe(plumber())
	.pipe(concat('plug.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'))
	.pipe(livereload());
});

//less and minify
gulp.task('cssLessMinify',  function(){

	gulp.src('./less/*.less')
  .pipe(plumber())
  .pipe(concat('style.min.less'))
  .pipe(less())
  .pipe(concat('style.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('./public/css'))
  .pipe(livereload());


});


//minify css
gulp.task('cssminify',  function(){

	gulp.src('./public/css/style.css')
	.pipe(plumber())
	.pipe(concat('style.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('./public/css'))
	.pipe(livereload());

});

//less and css minification
gulp.task('less', function(){

	gulp.src('./less/*.less')
	.pipe(plumber())
	.pipe(less({paths:[path.join(__dirname,'less', 'includes')]}))
	.pipe(gulp.dest('./public/css'));

});

//html
gulp.task('html', function(){

	gulp.src(['./public/*.html']).pipe(livereload());

});

//watch
gulp.task('watch', function(){
	livereload.listen();
	require('./js/srv.js');
	gulp.watch('./js/*.js', ['compress']);
	gulp.watch('./less/*.less', ['cssLessMinify']);
	gulp.watch('./public/*.html', ['html']);

});

//default task
gulp.task('default', ['open','watch']);
