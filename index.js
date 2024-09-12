/*Game created by PEPIN David*/
import { DIRECTION, FIVE_MINUTES, INTERVAL, STEP, ACTION } from "./js/tools/constantes";

import tabItem from "./map_elements/items/items.json";
import tabNPC from "./map_elements/NPCS/npcs.json";

import { Obstacle } from "./js/classes/obstacle";
import { Player } from "./js/classes/player";
import { Camera } from "./js/classes/camera";
import { Item } from "./js/classes/item";

window.onload = () => {
    let isRunning = -1;
    let isStart = -1;
    let time;

    const Game = {};
    Game.controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    };

    //get element canvas
    const canvas = document.getElementById('canvas'); // catch canvas
    const canvasMiniMap = document.getElementById('map');
    let ctx = canvas.getContext('2d'); // context en 2d
    let ctxMiniMap = canvasMiniMap.getContext('2d');

    var grandsArbre = new Obstacle('grandArbre');
    var maison = new Obstacle('maison');

    // instantiation d'une Map
    var map = new Map("world"); //chargement du terrain
    //mise en memoire de la taille total de la carte pour la camera
    var worldWidth = map.width * 32;
    var worldHeight = map.height * 32;
    map.pushItems(JSON.parse(tabItem).wastes);
    map.pushPNG(JSON.parse(tabNPC).npcs);

    //instantiate Player
    var joueur = new Player("hero.png", 11, 11, DIRECTION.BAS);
    joueur.DialogBox(ctx);

    //instantiate camera
    var cam = new Camera(0, 0, canvas.width, canvas.height, worldWidth, worldHeight);
    cam.follow(joueur, canvas.width / 2, canvas.height / 2);

    Game.play = function () {
        if (isRunning == -1) {
            startTimer(FIVE_MINUTES);
            isRunning = setInterval(function () {
                LoopDraw(ctx);
                cam.update(); //mise a jour de la camera
                if (joueur.isDial) {
                    joueur.Parler();
                }
                Game.GameOver();
            }, INTERVAL);
        }
    };
    Game.clickPause = function () {
        if (isRunning == -1) {
            Game.play();
            joueur.isDial = false;
        } else {
            clearInterval(isRunning);
            clearInterval(isStart);
            isRunning = -1;
            joueur.isDial = true;
            joueur.tirade = "JEU EN PAUSE"
            joueur.Parler();
        }
    };
    Game.load = function () {
        grandsArbre.generate();
        maison.generate();
        map.generate();
        var tabObs = $.merge(grandsArbre.tabObs, maison.tabObs);
        map.alltabs.Obs = tabObs;
        map.generateAll();
        cam.update();
        LoopDraw(ctx);
    };
    Game.end = function () {
        joueur.isDial = true
        joueur.tirade = 'Game Over'
        setTimeout(function () {
            clearInterval(isRunning);
        }, 2000);
    };
    Game.GameOver = function () {
        setTimeout(function () {
            Game.end()
            gameOver = true;
            console.log('gameover')
        }, FIVE_MINUTES);
        if (map.alltabs.Items.length <= 5 && joueur.inventaire.wastes.length == 0) {
            gameOver = true;
            if (joueur.isDial) {
                joueur.tirade = 'GAGNE';
            } else {
                joueur.isDial = true;
                joueur.tirade = 'GAGNE'
            }
        }
    };

    function nbreDechet() {
        var cpte = 0;
        for (let i = 0; i < map.alltabs.Items.length; i++) {
            if (map.alltabs.Items[i].drop) {
                cpte++
            }
        }
        return cpte
    };

    function startTimer(duration) {
        if (isStart < 0) {
            var timer = duration /= 1000;
        } else {
            timer = time;
        }
        var minutes;
        var seconds;
        isStart = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            document.getElementById("timer").css('left', canvas.width / 2)
            document.getElementById("timer").html(minutes + " : " + seconds);
            time = timer -= 1;
            if (timer <= 0) {
                document.getElementById("timer").html("time's up");
                return;
            }
        }, 1000)
    };

    //dessine les elements dans le canvas jeu
    function LoopDraw(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        map.dessinermap(context, cam.xView, cam.yView);

        for (let i = 0; i < map.alltabs.Items.length; i++) {
            map.alltabs.Items[i].dessinerItem(context, cam.xView, cam.yView);
        }

        for (let i = 0; i < map.alltabs.PNG.length; i++) {
            map.alltabs.PNG[i].dessinerPerso(context, cam.xView, cam.yView);
        }

        joueur.dessinerPerso(context, cam.xView, cam.yView);

        for (let i = 0; i < grandsArbre.coords.length; i++) {
            grandsArbre.dessinerObstacle(context, grandsArbre.coords[i].x, grandsArbre.coords[i].y, cam.xView, cam.yView);
        }

        for (let i = 0; i < maison.coords.length; i++) {
            maison.dessinerObstacle(context, maison.coords[i].x, maison.coords[i].y, cam.xView, cam.yView);
        }

        map.drawMiniMap(ctxMiniMap, joueur);

        context.font = "14px Helvetica";
        context.fillStyle = 'white';
        context.fillText('Score = ' + joueur.score, context.canvas.width - 80, 30);
        context.fillText("Nombre d'objet à ramasser = " + nbreDechet(), 30, 30);
        //    context.fillText("Temps restant = " , context.canvas.width/2, 30);
    }

    window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 37:
            case 113:
            case 97:
            case 81:
            case 65: // Flèche gauche, q, a, Q, A
                Game.controls.left = true;
                joueur.deplacer(Game, map, STEP);
                break;
            case 38:
            case 122:
            case 119:
            case 90:
            case 87: // Flèche haut, z, w, Z, W
                Game.controls.up = true;
                joueur.deplacer(Game, map, STEP);
                break;
            case 39:
            case 100:
            case 68: // Flèche droite, d, D
                Game.controls.right = true;
                joueur.deplacer(Game, map, STEP);
                break;
            case 40:
            case 115:
            case 83: // Flèche bas, s, S
                Game.controls.down = true;
                joueur.deplacer(Game, map, STEP);
                break;
            case 13: //Enter key
                if (!joueur.item) { //en HTML
                    joueur.getAction(ACTION.ATTRAPER, map.alltabs);
                    map.retirerItemMap(joueur.item);
                    joueur.item = null;
                } else {
                    var reponse = joueur.getAction(ACTION.JETER, map.alltabs);
                    if (reponse.rep) {
                        joueur.inventaire.dropObj(joueur.item);
                    } else if (!reponse.rep && reponse.x) {
                        map.alltabs.Items.push(new Item(joueur.item.url, reponse.x, reponse.y, joueur.item.nom, joueur.item.type, joueur.item.drop))
                        joueur.inventaire.dropObj(joueur.item);
                    } else if (!reponse.rep) {
                        joueur.inventaire.dropObj(joueur.item);
                    }
                    $('div.click').removeAttr('style');
                    $('div.click').removeClass('selected');
                    $("#div-item").addClass('invisible');
                    joueur.item = null;
                }
                if (joueur.VerifDialogPNG(map.alltabs.PNG) >= 0) {
                    joueur.getAction(ACTION.PNGDIALOG, map.alltabs)
                }
                break;
            case 69: //E key
                if (!joueur.item) { //en HTML
                    joueur.getAction(ACTION.ATTRAPER, map.alltabs);
                    joueur.inventaire.addObjectInDOM(joueur.item);
                    map.retirerItemMap(joueur.item);
                    joueur.item = null;
                } else {
                    var reponse = joueur.getAction(ACTION.JETER, map.alltabs);
                    if (reponse.rep) {
                        joueur.inventaire.dropObj();
                    } else if (!reponse.rep && reponse.x) {
                        map.alltabs.Items.push(new Item(joueur.item.url, reponse.x, reponse.y, joueur.item.nom, joueur.item.type, joueur.item.drop))
                        joueur.inventaire.dropObj();
                    }
                    $('div.click').removeAttr('style');
                    $('div.click').removeClass('selected');
                    joueur.item = null;
                }
                if (joueur.VerifDialogPNG(map.alltabs.PNG) >= 0) {
                    joueur.getAction(ACTION.PNGDIALOG, map.alltabs)
                }
                break;
            case 80: //P
            case 112: //p
                Game.clickPause();
                break;
            case 16: //maj
                joueur.speed = 64;
                break;
            default:
                //        alert(key);
                // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                return true;
        }
    }, false);
    window.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 37: // left arrow
                Game.controls.left = false;
                break;
            case 38: // up arrow
                Game.controls.up = false;
                break;
            case 39: // right arrow
                Game.controls.right = false;
                break;
            case 40: // down arrow
                Game.controls.down = false;
                break;
            case 16: //maj
                joueur.speed = 32;
                break;
        }
    }, false);

    $(canvas).bind('touchstart', function (e) {
        e.preventDefault();
        var touches = event.touches && event.touches.length ? event.touches : [event]
        var e = (event.changedTouches && event.changedTouches[0]) || (event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];

        Coords = {
            ClientX: e.clientX,
            ClientY: e.clientY
        }
        MoveMobile(Coords)
    });

    function MoveMobile(c) {
        if (c.ClientX >= canvas.offsetLeft && c.ClientX <= canvas.width && c.ClientY >= canvas.offsetTop && c.ClientY <= (canvas.offsetTop + 200)) {
            joueur.deplacer(DIRECTION.HAUT, map.alltabs)
        }
        if (c.ClientX >= canvas.offsetLeft && c.ClientX <= canvas.width && c.ClientY <= canvas.height && c.ClientY >= (canvas.height - 200)) {
            joueur.deplacer(DIRECTION.BAS, map.alltabs)
        }
        if (c.ClientY >= canvas.offsetTop && c.ClientY <= canvas.height && c.ClientX >= canvas.offsetLeft && c.ClientX <= (canvas.offsetLeft + 200)) {
            joueur.deplacer(DIRECTION.GAUCHE, map.alltabs);
        }
        if (c.ClientY >= canvas.offsetTop && c.ClientY <= canvas.height && c.ClientX <= canvas.width && c.ClientX >= (canvas.width - 200)) {
            joueur.deplacer(DIRECTION.DROITE, map.alltabs);
        }
        if (c.ClientX > (canvas.offsetLeft + 200) && c.ClientX < (canvas.width - 200) && c.ClientY > (canvas.offsetTop + 200) && c.ClientY < (canvas.height - 200)) {
            if (!joueur.item) { //en HTML
                joueur.getAction(ACTION.ATTRAPER, map.alltabs);
                joueur.inventaire.addObjectInDOM(joueur.item);
                map.retirerItemMap(joueur.item);
                joueur.item = null;
            } else {
                var reponse = joueur.getAction(ACTION.JETER, map.alltabs);
                if (reponse.rep) {
                    joueur.inventaire.dropObj();
                } else if (!reponse.rep && reponse.x) {
                    map.alltabs.Items.push(new Item(joueur.item.url, reponse.x, reponse.y, joueur.item.nom, joueur.item.type, joueur.item.drop))
                    joueur.inventaire.dropObj();
                }
                $('div.click').removeAttr('style');
                $('div.click').removeClass('selected');
                joueur.item = null;
            }
            if (joueur.VerifDialogPNG(map.alltabs.PNG) >= 0) {
                joueur.getAction(ACTION.PNGDIALOG, map.alltabs)
            }
        }
    };


    $('body').on('click', 'div.click', function () {
        if (!$(this).hasClass('selected')) {
            $('div.click').removeAttr('style');
            $('div.click').removeClass('selected');
            $(this).attr('style', 'border: 4px solid black');
            $(this).addClass('selected');
            $("#divItem").removeClass('invisible');
            $("#imgItem").attr('src', 'wastes/' + $(this).attr('data-url'));
            $("#nameItem").html($(this).attr('data-nom') + ' : ');
            joueur.item = {
                nom: $(this).attr('data-nom'),
                type: $(this).attr('data-type'),
                url: $(this).attr('data-url'),
                drop: $(this).attr('data-drop')
            };
            return
        } else {
            $(this).removeAttr('style');
            $(this).removeClass('selected');
            $("#divItem").addClass('invisible');
            joueur.item = null;
            return
        }
    });
    $('body').on('mousedown', 'div#divItem', function () {
        $(this).draggable();
    })
    $('#btnInventaire').click(function (e) {
        if ($('#inventaire').hasClass('invisible')) {
            $('#inventaire').removeClass('invisible')
        } else {
            $('#inventaire').addClass('invisible')
        }
        $('#notice').addClass('invisible')
        $('#divMap').addClass('invisible')
    });
    $('#btnNotice').click(function (e) {
        if ($('#notice').hasClass('invisible')) {
            $('#notice').removeClass('invisible')
        } else {
            $('#notice').addClass('invisible')
        }
        $('#inventaire').addClass('invisible')
        $('#divMap').addClass('invisible')
    });
    $('#btnMap').click(function (e) {
        if ($('#divMap').hasClass('invisible')) {
            $('#divMap').removeClass('invisible')
        } else {
            $('#divMap').addClass('invisible')
        }
        $('#inventaire').addClass('invisible')
        $('#notice').addClass('invisible')
    });

    (window.onresize = function () {
        canvas.height = window.innerHeight - 50;
        canvas.width = window.innerWidth - 30;
        canvasMiniMap.height = canvas.height / 2;
        canvasMiniMap.width = canvas.width / 2;
        cam.xDeadZone = canvas.width / 2;
        cam.yDeadZone = canvas.height / 2;
        cam.wView = canvas.width;
        cam.hView = canvas.height;
        cam.update();
    })();

    window.onload = function () {
        Game.load();
        Game.play();
    };
};

