// Requires
const   gulp         = require('gulp'),
        less         = require('gulp-less'),
        sass         = require('gulp-sass'),
        globSass     = require('gulp-sass-glob'),
        autoprefixer = require('gulp-autoprefixer'),
        cleanCSS     = require('gulp-clean-css'),
        rename       = require('gulp-rename'),
        rigger       = require('gulp-rigger'),
        sourcemap    = require('gulp-sourcemaps'),
        wait         = require('gulp-wait'),
        uglify       = require('gulp-uglify')
        del          = require('del'),
        browserSync  = require('browser-sync').create();

// Paths
let path = {
    src: {
        'css': 'src/css/main.css',
        'less': 'src/less/main.less',
        'sass': 'src/scss/main.scss',
        'html': 'src/*.html',
        'img': 'src/img/*.*',
        'fonts': 'src/fonts/**/*.*',
        'scripts': 'src/js/main.js'
    },
    build: {
        'css': 'build/css/',
        'html': 'build/',
        'img': 'build/img/',
        'fonts': 'build/fonts/',
        'scripts': 'build/js/'
    },
    watch: {
        'styleLess': 'src/less/**/*.less',
        'styleSass': 'src/scss/**/*.scss',
        'html': 'src/**/*.html',
        'img': 'src/img/*.*',
        'fonts': 'src/fonts/**/*.*',
        'scripts': 'src/js/**/*.js'
    }
}

// Configs
const isLess = false; // If true thi is less project, else sass

let taskName = 'style:sass'; // Default project is sass
let stylesWatchPath = path.watch.styleSass; // Default Watch Styles Path

if(isLess) {
    taskName = 'style:less';
    stylesWatchPath = path.watch.styleLess;
}

var serverConfig = {
    server: {
        baseDir: 'build/',
        index: 'index.html'
    },
    notify: false
};

// Tasks

// Clear Build Dest
gulp.task('clear', function() {
    return del(['build/']);
});

// LESS
gulp.task('style:less', function() {
    return gulp.src(path.src.less)
        .pipe(sourcemap.init())
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(cleanCSS())
            .pipe(rename({
                basename: 'style',
                suffix: '.min'
            }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.css));
});

// SASS
gulp.task('style:sass', function() {
    return gulp.src(path.src.sass)
        .pipe(wait(500))
        .pipe(globSass())
        .pipe(sourcemap.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(cleanCSS())
            .pipe(rename({
                basename: 'style',
                suffix: '.min'
            }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.css));
});

// HTML
gulp.task('html:build', function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

// Images
gulp.task('img:build', function() {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

// Scripts
gulp.task('scripts:build', function() {
    return gulp.src(path.src.scripts)
        .pipe(rigger())
        .pipe(sourcemap.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.build.scripts));
})

// Fonts
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// Build Styles
gulp.task('style:build', gulp.series(taskName));

// Watch Task
gulp.task('watch', function() {
    // Styles
    gulp.watch(stylesWatchPath, gulp.series('style:build'));    
    // HTML
    gulp.watch(path.watch.html, gulp.series('html:build'));
    // Scripts
    gulp.watch(path.watch.scripts, gulp.series('scripts:build'));
    // Images
    gulp.watch(path.watch.img, gulp.series('img:build'));
    // Fonts
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

// Server
gulp.task('server', function() {
    browserSync.init(serverConfig);

    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

// Build Task
gulp.task('build', gulp.series(
    'clear',
    gulp.parallel('fonts:build', 'img:build', 'style:build', 'scripts:build', 'html:build')
));

// Dev Task
gulp.task('dev', gulp.series(
    'scripts:build', 
    'fonts:build', 
    'img:build', 
    'style:build', 
    'html:build', 
    gulp.parallel('watch', 'server')
));

