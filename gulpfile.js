/* --------------------------------------------------------------------------
 * >>> GULP Build :
 *  author: Yaroslav Mitiuk
 *  version: 1.1.0
 *  url: '#',
 *  linkedInUrl: 'https://www.linkedin.com/in/yaroslav-mitiuk/'
 * -------------------------------------------------------------------------- */

/* Source
 * ========================================================================= */

'use strict';

let project_folder = require("path").basename('dist'),
    source_folder = "#src",
    fs = require('fs');

let { src, dest }   = require('gulp'),
    gulp            = require('gulp'),                            // Сам сборщик Gulp
    plumber         = require('gulp-plumber'),                    // Настройка обработки ошибок в Gulp
    browserSync     = require("browser-sync").create(),           // Виртуальный сервер
    del             = require("del"),                             // очистка старой сборки
    rename          = require('gulp-rename'),                     // Переименование файлов в Gulp
    pug             = require('gulp-pug'),                        // Pug
    concat          = require('gulp-concat'),               	  // конкатенация (соединение нескольких файлов в один файл JS)
    scss            = require("gulp-sass"),                       // SCSS для проекта
    clean_css       = require('gulp-clean-css'),                  // Чистый CSS
    autoprefixer    = require("gulp-autoprefixer"),               // Пакет расстановки вендорных перфиксов
    uglify          = require('gulp-uglify-es').default,          // Минификация JS-файлов
    sourcemaps      = require('gulp-sourcemaps'),                 // Sourcemaps
    babel           = require('gulp-babel'),                      // Конвертируем JS
    imagemin        = require('gulp-imagemin');                   // Сжатие картинок

/* Define paths & directories
 * ========================================================================= */

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/scripts/",
        img: project_folder + "/images/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: source_folder + "/html/*.pug",
        css: source_folder + "/styles/style.s+(a|c)ss",
        js: source_folder + "/scripts/*.js",
        img: source_folder + "/images/**/*.*",
        fonts: source_folder + "/fonts/**/*.{eot,ttf,woff,woff2}"
    },
    watch: {
        html: source_folder + "/html/**/*.pug",
        css: source_folder + "/styles/**/*.s+(a|c)ss",
        js: source_folder + "/scripts/**/*.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    info: {
        name: 'Project-Name',
        description: 'Project-description',
        author:{
            name: 'Yaroslav Mitiuk',
            url: '#',
            linkedInUrl: 'https://www.linkedin.com/in/yaroslav-mitiuk/'
        }
    },
    clean: "./dist",
}

/* Pug (HTML) Task
 * ========================================================================= */

function html() {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream:true}))
}

/* Styles Task
 * ========================================================================= */

function css() {
    return gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(
            scss({
                outputStyle: "expanded"
            }).on('error', scss.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(plumber.stop())
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream:true}))
}

/* JavaScript Task
 * ========================================================================= */

function js() {
    return src([ // Добавление самописных файлов скриптов
        '#src/scripts/scripts.js',
        // '#src/scripts/home.js'
        ])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(plumber.stop())
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream:true}))
}

/* Libraries Task
 * ========================================================================= */

function scripts_libraries() {
    return gulp.src([       // Добавление новых библиотек и файлов
            '#src/libraries/jquery-3.6.0/jquery.min.js',
            '#src/libraries/swiper-6.7.0/swiper.min.js',
            '#src/libraries/wow/wow.min.js',
            // '#src/libraries/jquery-validation-1.19.1/jquery.validate.js',
            // '#src/libraries/fullPage-3.0.8/fullpage.min.js'
            // '#src/libraries/fullPage-3.0.8/scrolloverflow.min.js',
            // '#src/libraries/fullPage-3.0.8/fullpage.extensions.min.js',
            // '#src/libraries/fancybox/jquery.fancybox.min.js',
            // '#src/libraries/blazy-1.8.2/blazy.min.js',
            // '#src/libraries/smoothscroll/smoothscroll.min.js'
        ])
        // .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(rename('libraries.min.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({stream:true}))
}

/* Images Task
 * ========================================================================= */

function images() {
    return src(path.src.img)
        // .pipe(imagemin({
        //     progressive: true
        // }))
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream:true}))
}

/* Fonts Task
 * ========================================================================= */

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream:true}))
}

/* Services Tasks
 * ========================================================================= */

function livereload(params) {
     browserSync.init({
        server: {
            baseDir: "./dist/",
        },
        startPath: "/index.html",
        port: 8080,
        notify: false
    })
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html).on('change', html)
    gulp.watch([path.watch.css], css).on('change', css)
    gulp.watch([path.watch.js], js).on('change', js)
    gulp.watch([path.watch.img], images).on('change', images)
    // gulp.watch([path.watch.fonts], fonts).on('change', fonts)
}

function clean(params) {
    return del(path.clean)
}

/* GULP RUN
 * ========================================================================= */

// Register tasks to expose to the CLI
// ------------------------------------------------------------------------- */

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, scripts_libraries))
let watch = gulp.parallel(build, watchFiles, livereload);

/* -------------------------------------------------------------------------
 * Define default task that can be called by just running `gulp` from cli
 * -------------------------------------------------------------------------
 */ 

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.livereload = livereload;
exports.build = build;
exports.watch = watch;
exports.default = watch;