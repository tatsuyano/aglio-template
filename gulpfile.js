var gulp        = require('gulp'),
    aglio       = require('gulp-aglio'),
    browserSync = require('browser-sync'),
    rename      = require('gulp-rename'),
    rimraf      = require('rimraf'),
    ejs         = require('gulp-ejs'),
    ApiMock     = require('api-mock');

var TEMPLATE_FILES = ['apidocs/*.md'],
    LAYOUT_FILE    = 'apidocs/layout.md',
    PUBLISHED_DIR  = 'published';

gulp.task('combine', function(){
  return gulp.src(LAYOUT_FILE)
    .pipe(ejs({},{ ext: '.md' }))
    .pipe(rename('index.md'))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('generate-api-docs', ['combine'], function() {
  return gulp.src(PUBLISHED_DIR + '/index.md')
    .pipe(aglio({template: 'default'}))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('watch', function () {
  gulp.watch(TEMPLATE_FILES,['generate-api-docs', browserSync.reload]);
});

gulp.task('browserSync', function() {
  browserSync({
    logConnections: true,
    logFileChanges: true,
    notify: true,
    port: 8088,
    open: false,
    server: {
      baseDir: PUBLISHED_DIR
    }
  });
});

gulp.task('api-mock', function () {
  var mockServer = new ApiMock({
    blueprintPath: PUBLISHED_DIR + '/index.md',
    options: {
      port: 3000
    }
  });
  mockServer.run();
});

gulp.task('default', ['generate-api-docs', 'watch', 'browserSync']);
gulp.task('mock', ['api-mock']);
