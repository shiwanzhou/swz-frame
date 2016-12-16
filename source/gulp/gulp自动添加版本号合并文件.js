

var gulp   = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var replace = require('gulp-replace');
var runSequence = require('gulp-run-sequence');
var uglify = require('gulp-uglify');
var  minifycss = require('gulp-minify-css');
var assetRev = require('gulp-asset-rev');
/*清空文件夹*/
gulp.task('clean:min', function (cb) {
    return  del([
        'static/module/inventory/js/*',
        'static/module/inventory/css/*'
    ], cb)
});


/*压缩css 生成md5文件*/
gulp.task('cssMinInventory', function () {
    runSequence("clean:min");
    return    gulp.src('www/module/inventory/css/*.css')
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('static/module/inventory/css'))
        .pipe( rev.manifest() ) //MD5  生成manifest文件
        .pipe( gulp.dest( 'rev/css' ) );
});


/*压缩js 生成md5文件*/
gulp.task('scriptsMinInventory', function () {
    return   gulp.src('www/module/inventory/js/*.js')
        .pipe(uglify())    //压缩
        .pipe(rev())  //MD5
        .pipe(gulp.dest('static/module/inventory/js'))
        .pipe( rev.manifest() )  //生成manifest文件
        .pipe( gulp.dest( 'rev/js' ) );
});




gulp.task('copy1',  function() {
    return gulp.src('www/**/**/**/*',{base: './www'})
        .pipe(gulp.dest('static'))
});

gulp.task('copy2',  function() {
    return gulp.src('www/**/*.js',{base: './www'})
        .pipe(gulp.dest('static'))
});



gulp.task('copy',["copy1","copy2"], function () {
});



gulp.task('rev',['revJs'],function() {
    gulp.src("www/module/lobby/index.html")
        .pipe(assetRev())
        .pipe(gulp.dest('www/module/lobby/'));
});

gulp.task('revJs',function () {
    return gulp.src('js/lobby.js')
        .pipe(assetRev())
        .pipe(gulp.dest('js/'))
});


gulp.task('min',["cssMinInventory","scriptsMinInventory"], function () {
        gulp.src(['rev/**/*.json',
            'www/module/lobby/js/*.js'
        ])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                '../../../static/module/inventory/js/':'../../module/inventory/js/',
                '../../module/inventory/js/': '../../../static/module/inventory/js/',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( gulp.dest('www/module/lobby/js/') );

    gulp.src("www/module/lobby/index.html")
        .pipe(assetRev())
        .pipe(gulp.dest('www/module/lobby/'));
});


/*合并文件*/
gulp.task('concat', function() {
    gulp.src(['www/common/js/Barrett.js', 'www/common/js/BigInt.js', 'www/common/js/RSA.js',"www/common/js/CodeManage.js"])
        .pipe(concat('account-common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/common/js/'))
});

