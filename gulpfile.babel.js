import WebpackDevServer from 'webpack-dev-server';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackStream from 'webpack-stream';

const dirs = {
  src: 'src',
  dest: 'dist',
};

const sassPaths = {
  src: `${dirs.src}/styles/*.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('clean', () => {
    return del([sassPaths.dest, dirs.dest]);
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.{html,scss,js}', ['clean', 'styles', 'webpack']);
});

gulp.task('styles', () => {
  return gulp.src(sassPaths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', (error) => {console.log(error)}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest));
});

gulp.task('webpack-dev-server', () => {
    const compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(3000, 'localhost', (err) => {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");
    });
})

gulp.task('webpack', ['webpack-dev-server'], (callback) => {
    webpack(webpackConfig, (error, stats) => {
        if (error) {
            //throw new gutil.PluginError('webpack', error);
        }

        callback();
    })
});

gulp.task('default', ['clean', 'styles', 'watch','webpack']);
