# gulp-contribs [![Build Status](https://travis-ci.org/shakyShane/gulp-contribs.png?branch=master)](https://travis-ci.org/shakyShane/gulp-contribs)

Give your open-source contributors some credit - automatically list them in your readme.md, or any where else

## Usage
Install it locally to your project.

`npm install gulp-contribs`

## Example
This example, with the defaults
```js
gulp.task('contribs', function () {
    gulp.src('README.md')
        .pipe(contribs())
        .pipe(gulp.dest("./"))
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Shane Osbourne
Licensed under the MIT license.

## Contributors

```
     1	Shane Osbourne

```

## License

