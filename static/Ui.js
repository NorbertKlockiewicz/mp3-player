console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        net.doSth() // wywołanie funkcji z innej klasy
        this.clicks()
        this.nextorprev = "";

    }

    //obsługa kliknięć w Ui

    clicks() {

        var clicked;
        $(window).on("load", function () {
            console.log("TEST")
            net.sendData("album1", "FIRST")

        })

        $("#menu").on("click", ".album", function () {
            clicked = this.id
            if (clicked != "undefined") {
                net.sendData(clicked, "NEXT")
            }
            else {
                net.sendData(clicked, "PLAYLIST")
            }

        })

        $("#control_center").on("click", function () {
            console.log(paused)

            if (paused == false) {
                music.StopMusic()
            }
            else {
                music.ResumeMusic()
            }
        })
        $("#control_next").on("click", function () {
            if (clickedtrack < obj.files.length - 2) {
                clickedtrack++;
            }
            else if (clickedtrack < obj.files.length - 2 && this.nextorprev == "prev") {
                clickedtrack++;
            }
            else {
                clickedtrack = 0;
            }
            this.nextorpriv = "next"
            music.NextSong(obj)

        })
        $("#control_back").on("click", function () {
            if (clickedtrack > 0) {
                clickedtrack--;
            }
            else if (clickedtrack > 0 && this.nextorprev == "next") {
                clickedtrack--;
            }
            else {
                clickedtrack = 0;
            }
            this.nextorprev = "prev"
            music.BackSong(obj)
        })
        $("#center").on("click", ".playlist", function () {
            console.log("TEST")
            this.track = (this.id).split(":")
            console.log(obj.files[this.track[1]].file)
            net.sendData(obj.files[this.track[1]].file, "DATABASE", obj.dirname, obj.files[this.track[1]].size)
        })
        $("#progress").on("input", function () {
            $("#audio").prop("currentTime", $(this).val());


        })
        //CZĘŚĆ Z DROPEM PLIKÓW

        $("html").on("dragover", function (e) {
            console.log("dragover nad dokumentem html")
            $("#drop").html("Tutaj wrzuć pliki!")
            e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia
            e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia
        });

        $("html").on("drop", function (e) {
            console.log("drop na dokumencie html")
            e.preventDefault();
            e.stopPropagation();
        });

        $('#drop').on('dragenter', function (e) {
            console.log("drag enter na divie")
            $("#drop").html("DROP")
            e.stopPropagation();
            e.preventDefault();
        });

        $('#drop').on('dragover', function (e) {
            console.log("drag over na divie")
            e.stopPropagation();
            e.preventDefault();
        });


        $('#drop').on('dragleave', function (e) {
            $("#drop").html("Tutaj wrzuć pliki!")
            console.log("dragleave na divie")
            e.stopPropagation();
            e.preventDefault();

        });

        $('#drop').on('drop', function (e) {
            $("#uploaded_list").html("")
            $("#body").css("opacity", "20%")
            $("#upload_progress").css("display", "block")
            var fd = new FormData();
            console.log("drop na divie");
            $("#drop").html("Tutaj odstaw swoje pliki");
            e.stopPropagation();
            e.preventDefault();

            var files = e.originalEvent.dataTransfer.files;

            console.log(files)
            for (let i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            $.ajax({
                url: '/upload',
                type: 'POST',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {

                    var newdata = JSON.parse(response)
                    console.log(newdata)
                    $("#body").css("opacity", "100%")
                    $("#upload_progress").css("display", "none")
                    for (let i = 0; i < newdata.length; i++) {
                        console.log(i)
                        var li = document.createElement("li")
                        li.innerHTML = newdata[i]
                        $("#uploaded_list").append(li)
                    }
                },

            })



        });


    }

    createView(obj, time, clicked) {

        if (time == "FIRST") {
            for (let i = 0; i < obj.dirs.length + 1; i++) {
                var album = $('<div class="album" id="' + obj.dirs[i] + '"><img src="/' + obj.dirs[i] + '.jpg" alt="album" height="188" width="188"></div>')
                $("#menu").append(album)
            }
        }

        $("#list").html("")

        if (clicked == "undefined") {

            for (let i = 0; i < obj.files.length; i++) {

                var tr = $("<tr id=tracknumber" + i + " class='row'>")

                $("#list").append(tr)
                var td1 = $("<td>" + obj.files[i].dirname + "</td>")
                var td2 = $("<td class='title'><p>" + obj.files[i].files + "</p></td>")
                var td3 = $("<td>" + obj.files[i].size + " MB</td>")
                tr.append(td1)
                tr.append(td2)
                tr.append(td3)

                tr.on("click", function () {
                    clickedtrack = this.id
                    clickedtrack = clickedtrack.split("r")
                    clickedtrack = parseInt(clickedtrack[2])
                    music.PlayMusic(obj.files[i].dirname, obj.files[i].files)


                })
            }
        }
        else {
            for (let i = 0; i < obj.files.length; i++) {
                var filetype = (obj.files[i].file).split(".");
                if (filetype[1] == "mp3") {

                    var tr = $("<tr id=tracknumber" + i + " class='row'>")

                    $("#list").append(tr)
                    if ((i + 1) < 10) {
                        var tracknumber = "0" + (i + 1)
                    }
                    else if ((i + 1) >= 10) {
                        tracknumber = (i + 1)
                    }
                    var td1 = $("<td>" + obj.album + "</td>")
                    var td2 = $("<td class='title'><p>" + tracknumber + "   " + obj.files[i].file + "</p></td>")
                    var td3 = $("<td>" + obj.files[i].size + " MB</td>")
                    var td4 = $("<td id='add_to_playlist:" + i + "' class='playlist'>&hearts;</td>")

                    tr.append(td1)
                    tr.append(td2)
                    tr.append(td3)
                    tr.append(td4)


                    tr.on("click", function () {
                        clickedtrack = this.id
                        clickedtrack = clickedtrack.split("r")
                        clickedtrack = parseInt(clickedtrack[2])
                        console.log(clickedtrack)
                        music.PlayMusic(clicked, obj.files[i].file)


                    })
                }
            }


        }


        //koniec fora



    }


}