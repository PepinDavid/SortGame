var DIRECTION = {
    "BAS": 0,
    "GAUCHE": 1,
    "DROITE": 2,
    "HAUT": 3
};


var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;

function Perso(url, x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.etatAnimation = -1;
    this.speed = 32;
    this.isDial = false;
    this.tirade = 'Bonjour, vous allez bien ?';

    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.image.onload = function () {
        if (!this.complete)
            throw "Erreur de chargement du sprite nommé\"" + url + "\".";

        this.referenceDuPerso.largeur = this.width / 4;
        this.referenceDuPerso.hauteur = this.height / 4;
    }

    this.image.src = "sprites/" + url;

    //function draw
    this.dessinerPerso = function (context, xView, yView) {
        this.context = context;
        context.save()
        var frame = 0; // Numéro de l'image à prendre pour l'animation
        var decalageX = 0,
            decalageY = 0; // Décalage à appliquer à la position du personnage
        if (this.etatAnimation >= DUREE_DEPLACEMENT) {
            // Si le déplacement a atteint ou dépassé le temps nécessaire pour etre effectuer, on le termine
            this.etatAnimation = -1;
        } else if (this.etatAnimation >= 0) {
            // On calcule l'image (frame) de l'animation à afficher
            frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
            if (frame > 3) {
                frame %= 4;
            }

            // Nombre de pixels restant à parcourir entre deux cases
            var pixelsAParcourir = this.speed - (this.speed * (this.etatAnimation / DUREE_DEPLACEMENT));

            // À partir de ce nombre, on définit le décalage en x et y.
            // NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
            if (this.direction == DIRECTION.HAUT) {
                decalageY = pixelsAParcourir;
            } else if (this.direction == DIRECTION.BAS) {
                decalageY = -pixelsAParcourir;
            } else if (this.direction == DIRECTION.GAUCHE) {
                decalageX = pixelsAParcourir;
            } else if (this.direction == DIRECTION.DROITE) {
                decalageX = -pixelsAParcourir;
            }

            this.etatAnimation++;
        }
        this.totalX = ((this.x * 32) - (this.largeur / 2) + 16 + decalageX);
        this.totalY = ((this.y * 32) - this.hauteur + 24 + decalageY);

        context.drawImage(this.image,
            this.largeur * frame, this.direction * this.hauteur,
            this.largeur, this.hauteur,
            this.totalX - xView, this.totalY - yView,
            this.largeur, this.hauteur
        );

        context.restore();
    }; //endDraw

    this.DialogBox = function (context) {
            return new Dialog(this, context.canvas);
        } //endDialogBox

    this.GetCoordsAdjacentes = function (game, step) {
            var coord = {
                "x": this.x,
                "y": this.y
            };
            if (game.controls.left) {
                this.direction = DIRECTION.GAUCHE;
                coord.x -= Math.round(this.speed * step);
            }
            if (game.controls.up) {
                this.direction = DIRECTION.HAUT;
                coord.y -= Math.round(this.speed * step);
            }
            if (game.controls.right) {
                this.direction = DIRECTION.DROITE;
                coord.x += Math.round(this.speed * step);
            }
            if (game.controls.down) {
                this.direction = DIRECTION.BAS;
                coord.y += Math.round(this.speed * step);
            }
            return coord;
        } //endGetCoordsAdjacentes

    this.Move = function (game, map, step) {
            if (this.etatAnimation > 0) {
                return false;
            }
            this.direction = direction;
            var prochaineCase = this.GetCoordsAdjacentes(game, step);
            if (this.VerifDeplacement(prochaineCase, map) == false) {
                return false
            } else {
                this.etatAnimation = 1;
                this.x = prochaineCase.x;
                this.y = prochaineCase.y;
                if (this.x < 0) {
                    this.x = map.width - 1;
                }
                if (this.y < 0) {
                    this.y = map.height - 1;
                }
                if (this.x >= map.width) {
                    this.x = 0;
                }
                if (this.y >= map.height) {
                    this.y = 0;
                }
                return true
            }
        } //endmove

    this.Parler = function () {
            this.dialBox = this.DialogBox(this.context)
            this.dialBox.dessinerDialog(this.tirade);
        } //endParler
    this.VerifDeplacement = function (prochaineCase, map) {
            // check du tableau de Map.allItemObs
            var o = null || map.alltabs.Items;
            var p = null || map.alltabs.Obs;
            var png = null || map.alltabs.PNG;

            if (prochaineCase.x < -1 || prochaineCase.y < -1 || prochaineCase.x > map.width || prochaineCase.y > map.height) {
                return false;
            }
            if (o != null) {
                //verification for objet
                for (i = 0; i < o.length; i++) {

                    if (!o[i].decor) {
                        if (Math.round(((o[i].x * 32) + o[i].l) / 32) > 2 || Math.round(((o[i].y * 32) + o[i].h) / 32) > 2) {
                            if (prochaineCase.x >= o[i].x && prochaineCase.y < Math.round(((o[i].y * 32) + o[i].h) / 32) && prochaineCase.x < Math.round(((o[i].x * 32) + o[i].l) / 32) && prochaineCase.y >= o[i].y) {
                                return false
                            }
                        } else if (prochaineCase.x >= o[i].x && prochaineCase.y <= o[i].y && prochaineCase.x <= o[i].x && prochaineCase.y >= o[i].y) {
                            return false
                        }
                    } else {
                        if (prochaineCase.x >= o[i].x && prochaineCase.x < Math.round(((o[i].x * 32) + o[i].l) / 32) - 1 && prochaineCase.y > Math.round(((o[i].y * 32) + (o[i].h / 2)) / 32) && prochaineCase.y <= Math.round(((o[i].y * 32) + o[i].h) / 32) - 1) {
                            return false
                        }
                    }
                }
            }
            if (p != null) {
                for (i = 0; i < p.length; i++) {
                    if (p[i].height >= 5 || p[i].width >= 5) {
                        if (prochaineCase.x >= p[i].x && prochaineCase.x < p[i].x + p[i].width && prochaineCase.y >= p[i].y + (p[i].height / 2) && prochaineCase.y <= p[i].y + p[i].height) {
                            return false
                        }
                    } else if (p[i].height > 2 || p[i].height > 2) {
                        if (prochaineCase.x >= p[i].x + 1 && prochaineCase.x < p[i].x + (p[i].width - 1) && prochaineCase.y > p[i].y + (p[i].height - 2) && prochaineCase.y <= (p[i].y + p[i].height)) {
                            return false
                        }
                    } else if (p[i].height <= 2 || p[i].width <= 2) {
                        if (prochaineCase.x >= p[i].x && prochaineCase.x < (p[i].x + p[i].width) && prochaineCase.y > p[i].y + (p[i].height - 1) && prochaineCase.y <= (p[i].y + p[i].height)) {
                            return false
                        }
                    }
                }
            }
            if (png != null) {
                for (i = 0; i < png.length; i++) {
                    if (prochaineCase.x >= png[i].x && prochaineCase.y <= png[i].y && prochaineCase.x <= png[i].x && prochaineCase.y >= png[i].y)
                        return false;
                }
            }
        } //endVerifDeplacement
}