"use strict";

module.exports = function() {
  $.gulp.task("js:process", function() {
    return $.gulp.src($.path.app)
      .pipe($.gulp.dest($.config.root + "/assets/js"))

      .pipe($.sourcemaps.init())
      .pipe($.gp.jsmin())
      .pipe($.gp.rename({suffix: ".min"}))
      .pipe($.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + "/assets/js"))
  })
};
