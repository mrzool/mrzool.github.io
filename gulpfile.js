var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_site"
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch("./_site/*.html", ['bs-reload']);
  gulp.watch("./_site/css/*.css", ['bs-reload']);
});
