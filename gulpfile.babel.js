import WebpackDevServer from 'webpack-dev-server';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const dirs = {
  src: 'src',
  dest: 'dist',
  bootstrap: './node_modules/bootstrap/dist',
};
const jsDirs = {
  jquery: `${dirs.src}/scripts/vendor/jquery.js`,
  bootstrap: `${dirs.bootstrap}/js/bootstrap.js`,
};
const styleDirs = {
  src: `${dirs.src}/styles/main.scss`,
  dest: `${dirs.dest}/styles/`,
  bootstrap: `${dirs.bootstrap}/css/bootstrap.css`,
};

gulp.task('clean', () => del.sync([styleDirs.dest, dirs.dest]));

gulp.task('copy:HTML', () => gulp.src([`${dirs.src}/index.html`])
  .pipe(gulp.dest(`${dirs.dest}`)));

gulp.task('copy:Favicon', () => gulp.src(`${dirs.src}/favicon.ico`)
  .pipe(gulp.dest(`${dirs.dest}`)));

gulp.task('copy:Js', () => gulp.src([jsDirs.jquery, jsDirs.bootstrap])
  .pipe(gulp.dest(`${dirs.dest}`)));

gulp.task('copy:Img', () => gulp.src([`${dirs.src}/img/*.png`, `${dirs.src}/img/*.jpg`])
  .pipe(gulp.dest(`${dirs.dest}/img`)));

gulp.task('copy:Fonts', () => gulp.src([`${dirs.src}/font/*`])
  .pipe(gulp.dest(`${dirs.dest}/font`)));

gulp.task('copy:CSS', () => gulp.src([styleDirs.bootstrap])
  .pipe(gulp.dest(`${styleDirs.dest}`)));

gulp.task('styles', ['copy:CSS'], errorHandler => gulp.src(styleDirs.src)
  .pipe(sass({
    sourceComments: 'normal',
  }).on('error', errorHandler))
  .pipe(autoprefixer())
  .pipe(gulp.dest(styleDirs.dest)));

gulp.task('webpack-dev-server', () => {
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    // server and middleware options
  }).listen(3000, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
  });
});

gulp.task('webpack', (callback) => {
  webpack(webpackConfig, (error) => {
    if (error) {
      // throw new gutil.PluginError('webpack', error);
    }

    callback();
  });
});

// Netlify

gulp.task('watch', () => {
  gulp.watch('src/**/*.{html,scss,js}', ['clean', 'styles', 'webpack', 'copy:All']);
});
gulp.task('copy:All', ['copy:Js', 'copy:Img', 'copy:Favicon', 'copy:Fonts', 'copy:HTML', 'copy:CSS']);
gulp.task('build', ['clean', 'styles', 'copy:All', 'webpack']);
gulp.task('default', ['build', 'watch', 'webpack-dev-server']);
