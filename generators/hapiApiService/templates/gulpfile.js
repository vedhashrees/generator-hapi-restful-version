const gulp = require("gulp");
const { spawn } = require('child_process');
const gutil = require('gulp-util');

gulp.task("default", () => {
      var child = spawn('retire', [], {
        shell: true,
        cwd: process.cwd()
      });

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', function (data) {
        gutil.log(data);
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', function (data) {
        gutil.log(gutil.colors.red(data));
        gutil.beep();
      });
});

gulp.task('retireWatch', ['default'], function (done) {
  // Watch all javascript files and package.json
  gulp.watch(['app/**/*.js', 'server.js', 'package.json'], ['default']);
});
