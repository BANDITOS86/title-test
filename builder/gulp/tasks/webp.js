"use strict";

module.exports = function () {
  $.gulp.task("gulp-webp", function () {
    return $.gulp.src($.config.root + "/dev/img/**/*.{jpg,jpeg,png}")
      .pipe($.gp.webp())
			.pipe($.gulp.dest($.config.root + "/assets/img"))
  });
}
