"use strict";

module.exports = function () {
	$.gulp.task("copy", function () {
		$.gulp.src($.config.root + "/dev/fonts/*/*/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/fonts"));
		$.gulp.src($.config.root + "/dev/js-custom/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/js"));
		$.gulp.src($.config.root + "/dev/img/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/img"));
		$.gulp.src($.config.root + "/dev/favicon/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/img/favicon"));
		$.gulp.src($.config.root + "/dev/libs/*/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/libs"));
		$.gulp.src($.config.root + "/dev/css/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/css/static"));
		return $.gulp.src($.config.root + "/dev/img/*/*.*")
			.pipe($.gulp.dest($.config.root + "/assets/img"));
	});
};
