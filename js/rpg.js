/*Game created by PEPIN David*/
(function () { //option du jeu

    var FPS = 30;
    var INTERVAL = 1000 / FPS;
    var STEP = INTERVAL / 1000 // seconds

    var isRunning = -1;
    var gameOver = false;

    var Game = {};
    Game.controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    };

    //get element canvas
    var canvas = document.getElementById('canvas'); // catch canvas
    var ctx = canvas.getContext('2d'); // context en 2d
    var canvasMiniMap = document.getElementById('map');
    var ctxMiniMap = canvasMiniMap.getContext('2d');

    var tabItem = [
        {
            url: "aerosol.png",
            x: 0,
            y: 3,
            nom: "Aérosol",
            type: "bleu",
            drop: true
        }, {
            url: "ballon.png",
            x: 15,
            y: 2,
            nom: "Ballon d'eau chaude",
            type: "dechetterie",
            drop: true
        }, {
            url: "barquette.png",
            x: 15,
            y: 13,
            nom: "Barquette en aluminium",
            type: "bleu",
            drop: true
        }, {
            url: "barquetteViande.png",
            x: 18,
            y: 10,
            nom: "Barquette sale",
            type: "ordure",
            drop: true
        }, {
            url: "bierre.png",
            x: 22,
            y: 3,
            nom: "Bouteille de bierre",
            type: "vert",
            drop: true
        }, {
            url: "branche.png",
            x: 30,
            y: 1,
            nom: "Branche",
            type: "compost",
            drop: true
        }, {
            url: "canette.png",
            x: 43,
            y: 3,
            nom: "Canette",
            type: "bleu",
            drop: true
        }, {
            url: "champ.png",
            x: 38,
            y: 12,
            nom: "Bouteille de Champagne",
            type: "vert",
            drop: true
        }, {
            url: "confiture.png",
            x: 51,
            y: 5,
            nom: "Pot de confiture",
            type: "vert",
            drop: true
        }, {
            url: "conserve1.png",
            x: 60,
            y: 13,
            nom: "Boite de maïs",
            type: "bleu",
            drop: true
        }, {
            url: "conserve2.png",
            x: 60,
            y: 22,
            nom: "Boite de haricots",
            type: "bleu",
            drop: true
        }, {
            url: "cremeFraiche.png",
            x: 54,
            y: 32,
            nom: "Pot de crème fraiche",
            type: "ordure",
            drop: true
        }, {
            url: "emballageYaourt.png",
            x: 48,
            y: 19,
            nom: "Emballage de yaourts",
            type: "bleu",
            drop: true
        }, {
            url: "four.png",
            x: 45,
            y: 32,
            nom: "Four électrique",
            type: "dechetterie",
            drop: true
        }, {
            url: "fromageBlanc.png",
            x: 35,
            y: 23,
            nom: "Pot de fromage blanc",
            type: "ordure",
            drop: true
        }, {
            url: "fuel.png",
            x: 24,
            y: 30,
            nom: "Bidon de combustible orange",
            type: "dechetterie",
            drop: true
        }, {
            url: "fuel2.png",
            x: 24,
            y: 37,
            nom: "Bidon de combustible vert",
            type: "dechetterie",
            drop: true
        }, {
            url: "gravat.png",
            x: 1,
            y: 25,
            nom: "Gravats",
            type: "dechetterie",
            drop: true
        }, {
            url: "herbe.png",
            x: 9,
            y: 32,
            nom: "Tas d'herbes",
            type: "compost",
            drop: true
        }, {
            url: "journaux.png",
            x: 0,
            y: 40,
            nom: "Des journaux",
            type: "bleu",
            drop: true
        }, {
            url: "lait.png",
            x: 6,
            y: 47,
            nom: "Brique de lait",
            type: "bleu",
            drop: true
        }, {
            url: "lessive.png",
            x: 16,
            y: 48,
            nom: "Bidon de lessive",
            type: "bleu",
            drop: true
        }, {
            url: "lessivePoudre.png",
            x: 0,
            y: 53,
            nom: "Carton de lessive",
            type: "bleu",
            drop: true
        }, {
            url: "metaux.png",
            x: 10,
            y: 62,
            nom: "Bouts de métaux",
            type: "dechetterie",
            drop: true
        }, {
            url: "miroir.png",
            x: 15,
            y: 61,
            nom: "Mirroir",
            type: "dechetterie",
            drop: true
        }, {
            url: "nettoyantSol.png",
            x: 23,
            y: 62,
            nom: "Bidon de nettoyant",
            type: "bleu",
            drop: true
        }, {
            url: "nourriture.png",
            x: 21,
            y: 52,
            nom: "De la nourriture",
            type: "compost",
            drop: true
        }, {
            url: "pizza.png",
            x: 32,
            y: 58,
            nom: "Emballage de pizza",
            type: "ordure",
            drop: true
        }, {
            url: "plastiqueAlimentaire.png",
            x: 35,
            y: 62,
            nom: "Emballage d'aliments",
            type: "ordure",
            drop: true
        }, {
            url: "pneu.png",
            x: 42,
            y: 58,
            nom: "Un pneu",
            type: "dechetterie",
            drop: true
        }, {
            url: "poele.png",
            x: 45,
            y: 60,
            nom: "Une poele",
            type: "ordure",
            drop: true
        }, {
            url: "sacBouteilleEau1.png",
            x: 35,
            y: 47,
            nom: "Emballage bouteille d'eau",
            type: "ordure",
            drop: true
        }, {
            url: "sacBouteilleEau2.png",
            x: 44,
            y: 35,
            nom: "Emballage bouteille d'eau",
            type: "ordure",
            drop: true
        }, {
            url: "shampoing.png",
            x: 49,
            y: 42,
            nom: "Shampoing",
            type: "bleu",
            drop: true
        }, {
            url: "sirop.png",
            x: 54,
            y: 48,
            nom: "Bouteille de sirop",
            type: "bleu",
            drop: true
        }, {
            url: "soda.png",
            x: 58,
            y: 37,
            nom: "Bouteille de soda",
            type: "bleu",
            drop: true
        }, {
            url: "vegetal.png",
            x: 59,
            y: 48,
            nom: "herbes et branches coupées",
            type: "compost",
            drop: true
        }, {
            url: "verreOrange.png",
            x: 62,
            y: 43,
            nom: "Bouteille de jus d'orange",
            type: "vert",
            drop: true
        }, {
            url: "verreYaourt.png",
            x: 19,
            y: 25,
            nom: "Pot de yaourt en verre",
            type: "vert",
            drop: true
        }, {
            url: "vinBlanc.png",
            x: 62,
            y: 61,
            nom: "Bouteille de vin",
            type: "vert",
            drop: true
        }, {
            url: "vinRouge.png",
            x: 58,
            y: 58,
            nom: "Bouteille de vin",
            type: "vert",
            drop: true
        }, {
            url: "water.png",
            x: 57,
            y: 60,
            nom: "Bouteille deau",
            type: "bleu",
            drop: true
        }, {
            url: "yaourt.png",
            x: 28,
            y: 29,
            nom: "Pot de yaourt en plastique",
            type: "ordure",
            drop: true
        }, {
            url: "bacbleu.png",
            x: 18,
            y: 21,
            nom: "bleu",
            type: "bleu",
            drop: false
        }, {
            url: "bacvert.png",
            x: 21,
            y: 21,
            nom: "vert",
            type: "vert",
            drop: false
        }, {
            url: "compost.png",
            x: 24,
            y: 21,
            nom: "compost",
            type: "compost",
            drop: false
        }, {
            url: "poub.png",
            x: 27,
            y: 21,
            nom: "ordure",
            type: "ordure",
            drop: false
        }, {
            url: "dechetterie.png",
            x: 21,
            y: 42,
            nom: "dechetterie",
            type: "dechetterie",
            drop: false
        }
            ];
    var tabPNG = [{
        url: "femme2.png",
        x: 19,
        y: 20,
        direction: DIRECTION.BAS,
        tirade: "Vous voulez jeter un objet, selectionnez le dans votre inventaire avant et appuyer sur 'Entrée'"
    }, {
        url: "homme1.png",
        x: 10,
        y: 20,
        direction: DIRECTION.BAS,
        tirade: "Faîtes attention, certains objets peuvent aller dans plusieurs poubelles"
    }, {
        url: "femme1.png",
        x: 60,
        y: 60,
        direction: DIRECTION.BAS,
        tirade: "Que c'est sale par ici, les gens ne sont vraiment pas respectueux"
    }, {
        url: "femme3.png",
        x: 21,
        y: 49,
        direction: DIRECTION.BAS,
        tirade: "Bienvenue a la déchetterie"
    }];

    var grandsArbre = new Obstacle('grandArbre');
    var maison = new Obstacle('maison');

    // instantiation d'une Map
    var map = new Map("world"); //chargement du terrain
    //mise en memoire de la taille total de la carte pour la camera
    var worldWidth = map.width * 32;
    var worldHeight = map.height * 32;
    map.pushItems(tabItem);
    map.pushPNG(tabPNG);

    //instantiate Player
    var joueur = new Player("hero.png", 11, 11, DIRECTION.BAS);
    joueur.DialogBox(ctx);

    //instantiate camera
    var cam = new Camera(0, 0, canvas.width, canvas.height, worldWidth, worldHeight);
    cam.follow(joueur, canvas.width / 2, canvas.height / 2);

    Game.play = function () {
        if (isRunning == -1) {
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
        //    setTimeout(function(){
        //        Game.end()
        //        gameOver = true;
        //        console.log('gameover')
        //    },10000);
        //300000 = 5min
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
        for (i = 0; i < map.alltabs.Items.length; i++) {
            if (map.alltabs.Items[i].drop) {
                cpte++
            }
        }
        return cpte
    };

    //dessine les elements dans le canvas jeu
    function LoopDraw(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        map.dessinermap(context, cam.xView, cam.yView);
        for (i = 0; i < map.alltabs.Items.length; i++) {
            map.alltabs.Items[i].dessinerItem(context, cam.xView, cam.yView);
        }
        for (i = 0; i < map.alltabs.PNG.length; i++) {
            map.alltabs.PNG[i].dessinerPerso(context, cam.xView, cam.yView);
        }
        joueur.dessinerPerso(context, cam.xView, cam.yView);
        for (i = 0; i < grandsArbre.coords.length; i++) {
            grandsArbre.dessinerObstacle(context, grandsArbre.coords[i].x, grandsArbre.coords[i].y, cam.xView, cam.yView);
        }
        for (i = 0; i < maison.coords.length; i++) {
            maison.dessinerObstacle(context, maison.coords[i].x, maison.coords[i].y, cam.xView, cam.yView);
        }
        //    map.dessinerMapObs(context, cam.xView, cam.yView);
        map.drawMiniMap(ctxMiniMap, joueur)
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
                }
                $('div.click').removeAttr('style');
                $('div.click').removeClass('selected');
                joueur.item = null;
            }
            if (joueur.VerifDialogPNG(map.alltabs.PNG) >= 0) {
                joueur.getAction(ACTION.PNGDIALOG, map.alltabs)
            }
            break;
        case 69: //E key
            if (!joueur.item) { //en HTML
                joueur.getAction(ACTION.ATTRAPER, map.alltabs);
                joueur.inventaire.addObj(joueur.item);
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
                joueur.inventaire.addObj(joueur.item);
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
            $("#imgItem").attr('src','wastes/'+$(this).attr('data-url'));
            $("#nameItem").html($(this).attr('data-nom'));
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
    $('body').on('mousedown', 'div#divItem', function(){
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
//    function BoxDial(obj) {
//        AffichBoxDial(obj)
//        div = $('#dialog');
//        div.html(obj.tirade);
//        div.attr('style', 'bottom : ' + (-canvas.height) + 'px')
//    };
//    function AffichBoxDial(obj) {
//        div = $('#dialog');
//        if (obj.isDial) {
//            div.removeClass('invisible')
//        } else {
//            div.addClass('invisible')
//        }
//    };
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
})();