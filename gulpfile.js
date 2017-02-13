var gulp=require("gulp"),
    browserSync=require("browser-sync").create(),
    plugins=require("gulp-load-plugins")();

// ****** 开发环境****//

// 编译sass
gulp.task("sass",function(){
    gulp.src(["bulid/sass/*.scss","!bulid/sass/**/_*.scss"])
    .pipe(plugins.sass({
        includePaths:"./public/bower_components/bootstrap-sass/assets/stylesheets"
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers:['last 2 versions', 'ie 8-11', 'Firefox ESR'],
        cascade:true,
        remove:true
    }))
    .pipe(gulp.dest("bulid/css"))
    .pipe(browserSync.reload({ stream: true }));
});

//编译js
 gulp.task("js",function(){
    gulp.src("bulid/js/*.js")
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter())
    .pipe(gulp.dest("bulid/js"))
    .pipe(browserSync.reload({ stream: true }));
 });

//启动开发环境服务
gulp.task("serve",["sass",'js'],function(){
    browserSync.init({
        server:{
            baseDir:['bulid/views','./']
        }
    });
    gulp.watch(["bulid/sass/*.scss","bulid/sass/**/_*.scss"],['sass']);
    gulp.watch("bulic/js/*.js",["js"])
    gulp.watch(["bulid/views/*.html"]).on("change",browserSync.reload);

});

// ******************** 生产环境 根据md5 获取版本号****//
//清空原数据

gulp.task("clean",function(){
    gulp.src(["public/css/*.css",'public/js/*.js','public/imgs/*.*','src/*.html'])
    .pipe(plugins.clean());
});

//编js利用gulp-rev加版本号
 gulp.task("bulid:imgs",function(){
    gulp.src("bulid/imgs/*.*")
    .pipe(plugins.rev())
    .pipe(gulp.dest("public/imgs"))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest("rev/imgs"))
 });

// 编css利用gulp-rev加版本号
gulp.task("bulid:css",['bulid:imgs'],function(){
    gulp.src(['rev/imgs/*.json','bulid/css/*.css'])
    .pipe( plugins.revCollector({
            replaceReved: true,
        }) )
    .pipe(plugins.cleanCss())
    .pipe(plugins.rev())
    .pipe(gulp.dest("public/css"))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest("rev/css"))
    // .pipe(gulp.dest('public/css/'));
});

//编js利用gulp-rev加版本号
 gulp.task("bulid:js",function(){
    gulp.src("bulid/js/*.js")
    .pipe(plugins.uglify())
    .pipe(plugins.rev())
    .pipe(gulp.dest("public/js"))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest("rev/js"))
 });

// html
gulp.task("bulid:html",['bulid:css','bulid:js'],function(){
    gulp.src(['rev/**/*.json','bulid/views/*.html'])
    .pipe( plugins.revCollector({
            replaceReved: true,
            dirReplacements: {
                'bulid/css': 'public/css',
                "bulid/js":"public/js",
                "bulid/imgs":"public/imgs"
            }
        }) )
    .pipe(gulp.dest('src/'));
});

//启动服务
gulp.task("bulid:serve",['clean'],function(){
    gulp.start(['bulid:html']);
    browserSync.init({
        server:{
            baseDir:["./",'src']
        }
    });

});
