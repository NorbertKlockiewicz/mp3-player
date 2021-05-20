console.log("WCZYTANIE PLIKU MUSIC")

class Music {

    constructor() {
        console.log("Konstruktor klasy music")
        console.log(clickedtrack)

    }

    PlayMusic(clicked, obj1) {

        $("#timefooter").html("")
        $("#timefooter").html(obj1)
        $("#temp").html("")
        $("#temp").append('<audio id="audio"><source src="' + clicked + '/' + obj1 + '" id = "audio_src" type = "audio/mp3"/><audio>')
        $("#control_center").attr("src", "/buttonpause.png")
        $("#audio").trigger("load");
        var currenttime = document.getElementById("currenttime")
        var duration = document.getElementById("duration")
        $("#audio").on("loadeddata", function () {
            console.log($("#audio").prop("duration"))
            $("#progress").attr("max", $("#audio").prop("duration"))
            console.log($("#progress"))
            var date = new Date(0);
            date.setSeconds($("#audio").prop("duration"));
            var timeString = date.toISOString().substr(14, 5);
            console.log(timeString)
            $("#audio").trigger("play");
            duration.innerHTML = timeString;
            $("#audio").on("timeupdate", function () {
                var date = new Date(0);
                date.setSeconds($("#audio").prop("currentTime"));
                $("#progress").val($("#audio").prop("currentTime"))
                var timeString = date.toISOString().substr(14, 5);

                currenttime.innerHTML = timeString
                console.log(timeString)
            });

            $("#audio").on("ended", function () {
                console.log("koniecutworu")
                clickedtrack++;
                console.log(clickedtrack)
                console.log(obj)
                music.NextSong(obj);
            })
        })

        paused = false;
    }
    StopMusic() {
        console.log("TEST")
        $("#control_center").attr("src", "/buttonplay.png")
        $("#audio").trigger('pause');
        paused = true;

    }
    ResumeMusic() {
        $("#control_center").attr("src", "/buttonpause.png")
        $("#audio").trigger("play");
        paused = false;

    }
    NextSong(obj) {
        if (obj.files[clickedtrack].file == undefined) {
            var filename = obj.files[clickedtrack].files;
            var albumname = obj.files[clickedtrack].dirname;
        }
        else {
            filename = obj.files[clickedtrack].file
            albumname = obj.dirname;

        }
        $("#timefooter").html("")
        $("#timefooter").html(filename)
        $("#temp").html("")
        $("#control_center").attr("src", "/buttonpause.png")
        $("#temp").append('<audio id="audio"><source src="' + albumname + '/' + filename + '" id = "audio_src" type = "audio/mp3"/><audio>')
        console.log("TEST")
        $("#audio").trigger("load");
        var currenttime = document.getElementById("currenttime")
        var duration = document.getElementById("duration")
        $("#audio").on("loadeddata", function () {
            console.log($("#audio").prop("duration"))
            $("#progress").attr("max", $("#audio").prop("duration"))
            console.log($("#progress"))
            var date = new Date(0);
            date.setSeconds($("#audio").prop("duration"));
            var timeString = date.toISOString().substr(14, 5);
            console.log(timeString)
            $("#audio").trigger("play");
            duration.innerHTML = timeString;
            $("#audio").on("timeupdate", function () {
                var date = new Date(0);
                date.setSeconds($("#audio").prop("currentTime"));
                $("#progress").val($("#audio").prop("currentTime"))
                var timeString = date.toISOString().substr(14, 5);

                currenttime.innerHTML = timeString
                console.log(timeString)
            });

            $("#audio").on("ended", function () {
                console.log("koniecutworu")
                clickedtrack++;
                console.log(clickedtrack)
                console.log(obj)
                music.NextSong(obj);
            })


        })

    }
    BackSong(obj) {
        if (obj.files[parseInt(clickedtrack)].file == undefined) {
            var filename = obj.files[parseInt(clickedtrack)].files;
            var albumname = obj.files[clickedtrack].dirname;
        }
        else {
            filename = obj.files[parseInt(clickedtrack)].file
            albumname = obj.dirname;
        }
        $("#timefooter").html("")
        $("#timefooter").html(filename)
        $("#temp").html("")
        $("#control_center").attr("src", "/buttonpause.png")
        $("#temp").append('<audio id="audio"><source src="' + albumname + '/' + filename + '" id = "audio_src" type = "audio/mp3"/><audio>')
        console.log("TEST")
        $("#audio").trigger("load");
        var currenttime = document.getElementById("currenttime")
        var duration = document.getElementById("duration")
        $("#audio").on("loadeddata", function () {
            console.log($("#audio").prop("duration"))
            $("#progress").attr("max", $("#audio").prop("duration"))
            console.log($("#progress"))
            var date = new Date(0);
            date.setSeconds($("#audio").prop("duration"));
            var timeString = date.toISOString().substr(14, 5);
            console.log(timeString)
            $("#audio").trigger("play");
            duration.innerHTML = timeString;
            $("#audio").on("timeupdate", function () {
                var date = new Date(0);
                date.setSeconds($("#audio").prop("currentTime"));
                $("#progress").val($("#audio").prop("currentTime"))
                var timeString = date.toISOString().substr(14, 5);

                currenttime.innerHTML = timeString
                console.log(timeString)
            });
            $("#audio").on("ended", function () {
                console.log("koniecutworu")
                clickedtrack++;
                console.log(clickedtrack)
                console.log(obj)
                music.NextSong(obj);
            })

        })





    }

}
