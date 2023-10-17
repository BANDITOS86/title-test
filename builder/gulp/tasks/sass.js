"use strict";

module.exports = function () {
  const sass = require("gulp-sass")(require("sass"));
  
  $.gulp.task("sass", function () {
    return $.gulp.src($.config.root + "/dev/scss/*/*/*.scss")
      .pipe($.gp.sourcemaps.init())
      .pipe(sass()).on("error", $.gp.notify.onError({ title: "Style" }))
      .pipe($.gp.autoprefixer({ overrideBrowserslist: $.config.autoprefixerConfig }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + "/assets/css/"));
  });

  $.gulp.task("sass-global", function () {
    return $.gulp.src($.config.root + "/dev/scss/main.scss")
      .pipe($.gp.sourcemaps.init())
      .pipe(sass()).on("error", $.gp.notify.onError({ title: "Style" }))
      .pipe($.gp.autoprefixer({ overrideBrowserslist: $.config.autoprefixerConfig }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + "/assets/css/"));
  });
};
