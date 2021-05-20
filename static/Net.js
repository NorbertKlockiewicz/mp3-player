console.log("wczytano plik Net.js")

class Net {

    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
        this.doSth() // wywołanie funkcji z tej samej klasy
        //this.sendData("album1", "FIRST")
    }

    doSth() {
        console.log("funcja doSth " + this.a + " - " + this.b)
    }

    sendData(clicked, time, dir, filesize) {



        $.ajax({
            url: "",
            data: { action: time, album: clicked, dir: dir, size: filesize },
            type: "POST",
            success: function (data) {

                obj = JSON.parse(data)
                console.log(obj)
                ui.createView(obj, time, clicked)




            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })

    }
}
