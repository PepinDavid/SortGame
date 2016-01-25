var ACTION = {
    "ATTRAPER": 0,
    "JETER": 1,
    "DIALOGUE": 2,
    "PNGDIALOG": 3

}

function Player(url, x, y, direction) {
    this.inventaire = new Inventaire(); //utiliser pour canvasInventaire 
    this.score = 0;
    this.tabError = new Array();
    Perso.call(this, url, x, y, direction)
};
Player.prototype.deplacer = function (direction, map, step) {
    this.isDial = false;
    this.Move(direction, map, step); //function heritage Perso
    for (i = 0; i < map.alltabs.Items.length; i++) {
        if (map.alltabs.Items[i].drop && this.VerifDrop(map.alltabs.Items[i])) {
            this.CheckDrop(map.alltabs.Items[i]);
            this.inventaire.addObj(map.alltabs.Items[i])
            map.retirerItemMap(map.alltabs.Items[i])
        }
    }
};
Player.prototype.getAction = function (action, arrObj) {
    var o = arrObj.Items;
    var png = arrObj.PNG;

    switch (action) {
    case ACTION.ATTRAPER:
        for (i = 0; i < o.length; i++) {
            if (o[i].drop && this.VerifDrop(o[i])) {
                this.item = o[i];
                this.inventaire.addObj(o[i]);
            } else if (!o[i].drop && this.VerifDrop(o[i])) {
                this.isDial = true;
                this.tirade = 'Vous ne pouvez pas prendre cette objet'
            }
        }
        break;
    case ACTION.JETER:
        if (this.item) { // pour html
            var posInv;
            var obs = false;
            if ((this.x - 1) < 0 || (this.y - 1) < 0 || (this.x + 1) >= map.width || (this.y + 1) >= map.height) {
                return false;
                this.isDial = true;
                this.tirade = 'Vous êtes au bord de la carte, vous ne pouvez rien jeter'
            }
            for (i = 0; i < o.length; i++) {
                if (this.VerifDrop(o[i])) {
                    posO = i;
                    obs = true;
                }
            }
            if (obs) {
                if (this.item.type == o[posO].type && !o[posO].drop) {
                    this.isDial = true;
                    this.tirade = "Bravo, c'est la bonne poubelle pour jeter : " + this.item.nom
                    this.score += 10
                    this.inventaire.dropObj(this.item);
                    return {
                        rep: true
                    }
                } else if (this.item.type != o[posO].type && !o[posO].drop) {
                    this.isDial = true;
                    this.tirade = "Dommage, ce n'est pas la bonne poubelle"
                    if (this.score > 0) {
                        this.score -= 5;
                    } else {
                        this.score = 0;
                    }
                    return {
                        rep: false
                    }
                } else {
                    this.isDial = true;
                    this.tirade = "Vous êtes trop proche d'un dêchet pour jeter celui que vous avez selectionner"
                    return {
                        rep: false
                    }
                }
            } else {
                if (this.direction == DIRECTION.BAS) {
                    this.inventaire.dropObj(this.item);
                    return {
                        x: this.x,
                        y: this.y + 1,
                        rep: false
                    }
                } else if (this.direction == DIRECTION.HAUT) {
                    this.inventaire.dropObj(this.item);
                    return {
                        x: this.x,
                        y: this.y - 1,
                        rep: false
                    }
                } else if (this.direction == DIRECTION.DROITE) {
                    this.inventaire.dropObj(this.item);
                    return {
                        x: this.x + 1,
                        y: this.y,
                        rep: false
                    }
                } else if (this.direction == DIRECTION.GAUCHE) {
                    this.inventaire.dropObj(this.item);
                    return {
                        x: this.x - 1,
                        y: this.y,
                        rep: false
                    }
                }
            }
        } else {
            this.isDial = true;
            this.tirade = 'selectionner un déchet dans votre inventaire';
        }
        break;
    case ACTION.DIALOGUE:
        this.Parler(); // function heritage Perso
        break;
    case ACTION.PNGDIALOG:
        var pos = this.VerifDialogPNG(png)
        png[pos].Turn(this)
        this.isDial = true;
        this.tirade = png[pos].tirade;
        break;
    }
};
Player.prototype.VerifDrop = function (o) {
    //verif pour objet d'une case
    if (this.x == o.x - 1 && this.y == o.y || this.x == o.x + 1 && this.y == o.y || this.y == o.y + 1 && this.x == o.x || this.y == o.y - 1 && this.x == o.x) {
        return true;
    }
    //verif pour objet plus grand qu'une case
    else if (this.x >= o.x && this.x <= Math.round(((o.x * 32) + o.l) / 32) && this.y == o.y - 1 || this.x >= o.x && this.x <= Math.round(((o.x * 32) + o.l) / 32) && this.y == Math.round(((o.y * 32) + o.h) / 32) || this.y >= o.y && this.y <= Math.round(((o.y * 32) + o.h) / 32) && this.x == o.x - 1 || this.y >= o.y && this.y <= Math.round(((o.y * 32) + o.h) / 32) && this.x == Math.round(((o.x * 32) + o.l) / 32)) {
        return true;
    } else { // si on est pas a coté d'un objet
        return false;
    }
};
Player.prototype.CheckDrop = function (o) {
    if (this.totalX == o.x && this.totalY == o.y) {
        this.item = o[i];
    }
    else if (this.totalX == o.x && this.totalX == Math.round(((o.x * 32) + o.l) / 32) && this.totalY == o.y && this.totalY == Math.round(((o.y * 32) + o.h) / 32)) {
        this.item = o[i];
    }
};
Player.prototype.VerifDialogPNG = function (arrObj) {
    var png = null || arrObj;
    if (png != null) {
        for (i = 0; i < png.length; i++) {
            if (this.x == png[i].x - 1 && this.y == png[i].y || this.x == png[i].x + 1 && this.y == png[i].y || this.y == png[i].y + 1 && this.x == png[i].x || this.y == png[i].y - 1 && this.x == png[i].x)
                return i;
        }
    }
};
Player.prototype.VerifDeplacement = function (prochaineCase, map) {
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
            if (o[i].decor) {
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
}; //endVerifDeplacement