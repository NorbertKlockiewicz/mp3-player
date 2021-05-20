var coll1;
var docs1;
var duplicates = []
var obj = {

    createdb: function () {
        var Datastore = require('nedb')
        coll1 = new Datastore({
            filename: 'kolekcja.db',
            autoload: true
        });
    },
    adddoc: function (trackname, dir, size) {

        if (!duplicates.includes(trackname)) {
            duplicates.push(trackname)
            var doc = {
                files: trackname,
                dirname: dir,
                size: size,
            };
            coll1.insert(doc, function (err, newDoc) {

            });
        }
    },
    getdata: function () {
        coll1.find({}, function (err, docs) {
            docs1 = docs

        });

        return docs1;
    }

}

module.exports = obj