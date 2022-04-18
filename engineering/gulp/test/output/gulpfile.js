const shell = require('gulp-shell');
const gulp = require('gulp');

const { src, dest } = gulp;
const helper = {
  shell,
  gulp,
}

function defaultTask(cb) {
  // const { task, shell, gulp, c } = helper;

  

  cb()

  // 使用 --ignore-scripts 防止触发postinstall，导致install--init死循环
  // const install = shell('yarn install --ignore-scripts', { cwd: WEB_DIR, env: { PATH: process.env.PATH } });
  // install.displayName = 'web-install';

  // const initModules = shell('yarn lerna run init --parallel', { cwd: WEB_DIR });
  // initModules.displayName = 'web-initModules';

  // const init = gulp.series(install, initModules);
  // init.displayName = 'web-init';

  // const onPostinstall = gulp.series([initModules]);
  // onPostinstall.displayName = 'web-onPostinstall';

  // task('init:bootstrap:web', install, '初始化 bootstrap');
  // task('init:lerna:web', initModules, '初始化 lerna init 指令');
  // task('init:web', init, '初始化web目录的模块');
  // task('postinstall', onPostinstall, c.green('一键初始化：不含install'));

  // return {
  //   install,
  //   initModules,
  //   init,
  //   onPostinstall,
  // };
}

gulp.task('compile', () => {
  return src('*.js').pipe(dest('output/'));
})

exports.default = defaultTask;