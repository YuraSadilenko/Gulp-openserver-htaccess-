var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename");
	autoprefixer = require("gulp-autoprefixer");
	imagemin = require('gulp-imagemin');
	uglify = require('gulp-uglify');
	pipeline = require('readable-stream').pipeline;
	cleanCSS = require('gulp-clean-css');
 
	gulp.task('uglify', function () {
  return pipeline(
    gulp.src('fold/script/*.js'),
    uglify(),
    gulp.dest('dist/fold/script')
  	);
	});

	gulp.task('minify-css', () => {
		return gulp.src('fold/css/*.css')
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('dist/fold/css'));
	});

gulp.task("sass", function() {
  gulp
    .src("fold/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename("style.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 20 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("fold/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["sass", "browser"], function() {
	gulp.watch("fold/sass/**/*.scss", ["sass"]);
	gulp.watch("index.html", browserSync.reload);
	gulp.watch("*.php", browserSync.reload);

});

gulp.task("browser", function() {
	// browserSync({
	// 	server: { baseDir: "src" },
	//notify: false
	// });
	browserSync.init(null, {
		proxy: "wedrumschool",
		// proxy: "duncany/about.php",
		host: 'localhost',
		port: 3000,
		browser: "chrome"
		// browser: "firefox"
		// browser: ["chrome", "firefox"]
	});
});

gulp.task("build", function() {
	gulp.src(["fold/css/*.css"]).pipe(gulp.dest("dist/fold/css"));
	gulp.src(["fold/bootstrap/css/*.css"]).pipe(gulp.dest("dist/fold/bootstrap/css"));
	gulp.src(["fold/bootstrap/jquery/*.js"]).pipe(gulp.dest("dist/fold/bootstrap/jquery"));
	gulp.src(["fold/bootstrap/js/*.js"]).pipe(gulp.dest("dist/fold/bootstrap/js"));
	gulp.src(["fold/script/*.js"]).pipe(gulp.dest("dist/fold/script"));
	gulp.src(["fold/img/*.*"]).pipe(gulp.dest("dist/fold/img"));
	gulp.src(["fold/img/svg/*.*"]).pipe(gulp.dest("dist/fold/img/svg"));
	gulp.src("*.html").pipe(gulp.dest("dist"));
});

gulp.task('compress', function() {
  gulp.src('fold/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/fold/img'))
});