var through2 = require("through2");
var gutil = require("gulp-util");
var childProcess = require("child_process");

var defaults = {
    start: "## Contributors",
    end: "## License"
};

var PLUGIN_NAME = "gulp-contribs";

var cmd = "git --no-pager shortlog -n -s < /dev/tty";

/**
 * @param {{start: String, end: String}} matches
 * @returns {RegExp}
 */
function getRegex(matches) {
    var regexTemplate = "(%1s)([\\s\\S]+?)(%2s)".replace("%1s", matches.start).replace("%2s", matches.end);
    return new RegExp(regexTemplate, "gm");
}

/**
 * String replacement
 * @param {String} data
 * @param {String} result
 * @param {{regex: RegExp, start: String, end: String}} matches
 * @returns {String|Boolean}
 */
function write(data, result, matches) {
    if (data.match(matches.regex)) {
        return data.replace(matches.regex, function () {
            return matches.start + "\n\n```\n" + result + "```\n\n" + matches.end;
        });
    }
    return false;
}

/**
 * Helper for correct plugin errors
 * @param context
 * @param msg
 */
function error(context, msg) {
    context.emit("error", new gutil.PluginError(PLUGIN_NAME, msg));
}

/**
 * @param {String} [start]
 * @param {String} [end]
 * @returns {{start: (*|string), end: (*|string)}}
 */
function getMatches(start, end) {
    var matches = {
        start: start || defaults.start,
        end: end || defaults.end
    };
    matches.regex = getRegex(matches);
    return matches;
}

/**
 * @param {String} start
 * @param {String} end
 * @returns Stream
 */
module.exports = function (start, end) {

    return through2.obj(function (file, enc, cb) {

        var stream = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            error(stream, "Streaming not supported.");
            return cb();
        }

        var addContribs = function (err, stdout) {

            if (err) {
                error(stream, "There was an error fetching the Git Short Log.");
                cb();
            }

            var newContents = write(file.contents.toString(), stdout, getMatches(start, end));

            if (!newContents) {
                error(stream, "There was an error writing to the file.");
                cb();
            }

            file.contents = new Buffer(newContents);
            stream.push(file);
            cb();
        };

        // check it's a Git Repo
        childProcess.exec("git log", function (err) {
            if (err) {
                error(stream, "A Git repository was not found here.");
                return cb();
            }
            return childProcess.exec(cmd, {cwd : __dirname}, addContribs);
        });
    });
};