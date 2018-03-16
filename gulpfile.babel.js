import WebpackDevServer from 'webpack-dev-server';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackStream from 'webpack-stream';

const dirs = {
  src: 'src',
  dest: 'dist',
};
const jsDirs = {
    jquery: `${dirs.src}/scripts/vendor/jquery.js`,
    bootstrap: `${dirs.src}/scripts/vendor/bootstrap.min.js`
}
const sassPaths = {
  src: `${dirs.src}/styles/main.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('clean', () => {
    return del.sync([sassPaths.dest, dirs.dest]);
})

gulp.task('copyJs', () => {
  return gulp.src([jsDirs.jquery, jsDirs.bootstrap])
    .pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('copyImg', () => {
  return gulp.src([`${dirs.src}/img/*.png`, `${dirs.src}/img/*.jpg`])
    .pipe(gulp.dest(`${dirs.dest}/img`));
});

gulp.task('copyFonts', () => {
    return gulp.src([`${dirs.src}/font/*`])
      .pipe(gulp.dest(`${dirs.dest}/font`));
  });

gulp.task('watch', () => {
    gulp.watch('src/**/*.{html,scss,js}', ['clean', 'styles', 'webpack', 'copyJs','copyImg', 'copyFonts']);
});

gulp.task('styles', (errorHandler) => {
  return gulp.src(sassPaths.src)
    .pipe(sass({
        sourceComments: 'normal'
    }).on('error', errorHandler))
    .pipe(autoprefixer())
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

gulp.task('webpack', (callback) => {
    webpack(webpackConfig, (error, stats) => {
        if (error) {
            //throw new gutil.PluginError('webpack', error);
        }

        callback();
    })
});

gulp.task('build', ['clean', 'styles', 'webpack', 'copyJs', 'copyImg', 'copyFonts']);
gulp.task('default', ['build', 'watch', 'webpack-dev-server']);
