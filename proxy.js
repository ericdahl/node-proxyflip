var http = require('http'),
    im = require('imagemagick'),
    fs = require('fs'),
    md5 = require('MD5');

var tmpDir = '/tmp/proxyflip/';

if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

http.createServer(function (request, response) {
    var id = md5(request.url),
        input = tmpDir + id,
        output = tmpDir + id + '.out';

    http.get(request.url,function (res) {
        var chunks = [];

        res.on('data', function (chunk) {
            if ("image/png" === res.headers['content-type'] || "image/jpeg" === res.headers['content-type']) {
                chunks.push(chunk);
            } else {
                response.write(chunk);
            }
        });

        res.on('end', function () {
            if ("image/png" === res.headers['content-type'] || "image/jpeg" === res.headers['content-type']) {
                fs.writeFileSync(input, Buffer.concat(chunks));

                im.convert([input, '-rotate', '180', output], function(err) {
                    if (err) throw err;
                    response.end(fs.readFileSync(output));
                    fs.unlink(output);
                    fs.unlink(input);
                });
            } else {
                response.end();
            }

            console.log(request.connection.remoteAddress + " " + request.url);
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
}).listen(8080);