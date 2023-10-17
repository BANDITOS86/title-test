"use strict";

global.$ = {
  package: require("./package.json"),
  config: require("./gulp/config"),
  path: {
    task: require("./gulp/paths/tasks.js"),
    app: require("./gulp/paths/app.js")
  },
  gulp: require("gulp"),
  rename: require("gulp-rename"),
  del: require("del"),
  gp: require("gulp-load-plugins")(),
  sourcemaps: require("gulp-sourcemaps"),
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});
$.gulp.task("default", $.gulp.series(
  "clean",
  "sprite",
  $.gulp.parallel(
    "sass",
    "sass-global",
    "js:process",
    "sprite:svg",
    "gulp-webp",
    "copy",
  ),
  $.gulp.parallel(
    "watch",
  )
));
