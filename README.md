# gulp-contribs [![Build Status](https://travis-ci.org/shakyShane/gulp-contribs.png?branch=master)](https://travis-ci.org/shakyShane/gulp-contribs)

Give your open-source contributors some credit - automatically list them in your readme.md, or any where else.

## Usage
Install it locally to your project.

`npm install gulp-contribs`

## Example
With no parameters, the default start and end points (`## Contributors` & `## License`) will be used.
Check [this example](https://github.com/shakyShane/browser-sync#contributors)

```js
var gulp = require('gulp');
var contribs = require('gulp-contribs');

gulp.task('contribs', function () {
    gulp.src('README.md')
        .pipe(contribs())
        .pipe(gulp.dest("./"))
});
```

## Configure
To configure where abouts in your file you want to 'wedge' the contributors list, just pass start and end strings like this.

Example: If you want the list to be wedged in between `## Contributors List` and `## License` in your files, you'd do it like this.

```js
var gulp = require('gulp');
var contribs = require('gulp-contribs');

gulp.task('contribs', function () {
    gulp.src('README.md')
        .pipe(contribs("## Contributors List", "## License"))
        .pipe(gulp.dest("./"))
});
```

## License
Copyright (c) 2013 Shane Osbourne
Licensed under the MIT license.
