"use strict";
var cp = require("child_process");
var contribs = require("../index");
var assert = require("chai").assert;
var sinon = require("sinon");
var gutil = require("gulp-util");

describe("Writing contributors to a file", function () {
    var execStub;
    before(function () {
        execStub = sinon.stub(cp, "exec").yields(null, "Shane Osbourne");
    });
    after(function () {
        execStub.restore();
    });
    it("should write contribs to file using default start & end", function (done) {

        var stream = contribs();

        stream.on("data", function (file) {
            var actual = file.contents.toString();
            var exepected = "## Contributors\n\n```\nShane Osbourne```\n\n## License";
            assert.equal(actual, exepected);
            done();
        });

        stream.write(new gutil.File({
            contents: new Buffer("## Contributors\n\n## License")
        }));
    });
    it("should write contribs to file using custom start & end", function (done) {

        var stream = contribs("START", "END");

        stream.on("data", function (file) {
            var actual = file.contents.toString();
            var exepected = "START\n\n```\nShane Osbourne```\n\nEND";
            assert.equal(actual, exepected);
            done();
        });

        stream.write(new gutil.File({
            contents: new Buffer("START\n\nEND")
        }));
    });
});


