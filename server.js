var http = require("http");
var tab1 = [];
var tab3 = []
var fs = require("fs");
var qs = require("querystring")
var finish;
var albums = ["ACDC - 1979 - Highway to Hell", "Queen - 1974 - Queen II", "ABBA - 1980 - Super Trouper"]
var albumnum
var albumname
var progress = 0
var uploadedfiles = [];

var dir = './static/tmp';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
var formidable = require("formidable");
var db = require(__dirname + "/static/database_manager.js")
db.createdb()
var database = db.getdata()

fs.readdir(__dirname + "/static/mp3", function (err, files) {
    tab1 = [];
    if (err) {
        return console.log(err);
    }
    //
    files.forEach(function (fileName) {

        tab1.push(fileName)

    });
});


var server = http.createServer(function (req, res) {


    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                // tu wykonaj załadowanie statycznej strony z formularzem
                fs.readFile("static/index.html", function (error, data) {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }

                    else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        res.end();
                    }
                });

            }
            else if (req.url == "/admin") {
                // tu wykonaj załadowanie statycznej strony z formularzem
                fs.readFile("static/admin.html", function (error, data) {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                        res.end();
                    }

                    else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        res.end();
                    }
                });

            }

            else if (req.url === "/jq.js") {
                fs.readFile("static/libs/jq.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Main.js") {
                fs.readFile("static/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/NET.js") {
                fs.readFile("static/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/UI.js") {
                fs.readFile("static/Ui.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Music.js") {
                fs.readFile("static/Music.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/buttonplay.png") {

                fs.readFile("static/image/Play_Button.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/buttonpause.png") {

                fs.readFile("static/image/Pause_Button.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/buttonnext.png") {

                fs.readFile("static/image/next_Track.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/buttonback.png") {

                fs.readFile("static/image/back_Track.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/undefined.jpg") {

                fs.readFile("static/image/playlist.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile(__dirname + "/static/mp3/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg" });
                    res.write(data);
                    res.end();
                })
            }
            for (let i = 0; i < tab1.length; i++) {
                if (req.url == "/" + tab1[i] + ".jpg") {
                    fs.readdir(__dirname + "/static/mp3/" + tab1[i], function (err, files) {

                        if (err) {
                            return console.log(err);
                        }
                        //
                        files.forEach(function (fileName) {
                            if (fileName.includes("jpg")) {
                                fs.readFile("static/mp3/" + tab1[i] + "/" + fileName, function (error, data) {
                                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                                    res.write(data);
                                    res.end();
                                })
                            }


                        });

                    });


                }
            }


            break;
        case "POST":

            if (req.url == "/upload") {
                uploadedfiles = [];
                var form = new formidable.IncomingForm();
                var d = new Date()
                var name = Date.parse(d)
                var dir = './static/tmp/' + name;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                form.uploadDir = "./static/tmp/" + name + "/"  // katalog na zuploadowane pliki

                form.parse(req, function (err, fields, files) {
                });
                form.on("fileBegin", function (name, value) {
                    value.path = dir + "/" + value.name
                    console.log(value)
                    uploadedfiles.push(value.name)
                })
                form.on("end", function () {
                    console.log(uploadedfiles)
                    res.end(JSON.stringify(uploadedfiles, null, 4))
                })

            }

            servResponse(req, res);
            break;
        default: break;
    }

})
server.listen(5000, function () {

});

function servResponse(req, res) {
    var allData = "";

    req.on("data", function (data) {

        allData += data;


    })

    req.on("end", function (data) {
        finish = qs.parse(allData)

        if (finish.action == "FIRST" || finish.action == "NEXT") {
            albumnum = finish.album.split("m")
            if (isNaN(albumnum[1])) {
                albumname = finish.album
            }
            else {
                albumname = albums[albumnum[1] - 1]
            }
            tab3;
            fs.readdir(__dirname + "/static/mp3/" + finish.album, function (err, files) {
                tab3 = [];
                if (err) {
                    return console.log(err);
                }

                files.forEach(function (musicfileName) {
                    var stats = fs.statSync(__dirname + "\\static\\mp3\\" + finish.album + "\\" + musicfileName);
                    var objfiles = { file: musicfileName, size: (stats.size / 1048576).toFixed(2) }
                    tab3.push(objfiles)
                });
                if (finish.action == "NEXT") {

                    res.end(JSON.stringify({ files: tab3, album: albumname, dirname: finish.album }, null, 4))

                }
                else if ("FIRST") {
                    res.end(JSON.stringify({ dirs: tab1, files: tab3, album: albumname, dirname: finish.album }, null, 4))
                }

            });
        }

        else if (finish.action == "DATABASE") {

            db.adddoc(finish.album, finish.dir, finish.size)
            database = db.getdata()
        }
        else if (finish.action == "PLAYLIST") {
            database = db.getdata()

            res.end(JSON.stringify({ files: database }, null, 4))
        }

    })
}
