var net;
var ui;
var music;
var paused;
var clickedtrack = 0;
var obj;
var clicked;
var obj;
$(document).ready(function () {
    net = new Net() // utworzenie obiektu klasy Net
    ui = new Ui() // utworzenie obiektu klasy Ui
    music = new Music()
    paused = false;
    clickedtrack = 0;
    obj = ""
    clicked = ""
})