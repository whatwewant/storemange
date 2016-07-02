/****************************************************
  > File Name    : gulpfile.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年06月14日 星期四 15时19分35秒
 ****************************************************/

var path = require('path');
// get browser path

var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'), // check js syntax
    babel       = require('gulp-babel'), // es6 -> es5
    livereload  = require('gulp-livereload');
    nodemon     = require('gulp-nodemon');

var MODE = process.env.npm_lifecycle_event;
var SOURCE_DIR = './src',
    BUILD_DIR = './build';


gulp.task('jshint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint());
});

gulp.task('nodemon', function () {
    return nodemon({
        script: 'app.js',
        ext: 'js html',
        env: {'NODE_ENV': 'development'},
    })
});

gulp.task('server', function () {
    livereload.listen();
    var reloaded;

    nodemon({
        script: './app.js',
        ext: 'js',
        ignore: ['views', 'build', 'client'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'true',
        },
        task: ['jshint'],
        stdout: false,
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/^Express\ server \ listening/.test(chunk)) {
                livereload.reload();
            }
            process.stdout.write(chunk);
        });
    }).on('restart', function () {
        console.log('restarted!');
    });

    gulp.watch(['view/**', 'public/**'])
        .on('change', function (event) {
            livereload.changed(event);
        });
});

gulp.task('default', ['server'])
