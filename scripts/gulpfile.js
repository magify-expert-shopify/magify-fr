const path = require('path');
const { src, dest } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const ASSETS_PATH = path.resolve(__dirname, '../assets');

function css() {
  return src([`${ASSETS_PATH}/**/theme.css`, `!${ASSETS_PATH}/**/*.min.css`])
    .pipe(
      cleanCSS({
        level: {
          1: { specialComments: 0 },
          2: false,
        },
        format: { semicolonAfterLastProperty: true },
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(ASSETS_PATH));
}

exports.default = css;
