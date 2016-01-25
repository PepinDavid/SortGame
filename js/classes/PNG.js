function PNG(url, x, y, direction, tirade) {
    Perso.call(this, url, x, y, direction)
    if (tirade) {
        this.tirade = tirade;
    }
}

PNG.prototype.Turn = function (obj) {

    if (obj.direction == DIRECTION.HAUT) {
        this.direction = DIRECTION.BAS
    }
    if (obj.direction == DIRECTION.BAS) {
        this.direction = DIRECTION.HAUT
    }
    if (obj.direction == DIRECTION.GAUCHE) {
        this.direction = DIRECTION.DROITE
    }
    if (obj.direction == DIRECTION.DROITE) {
        this.direction = DIRECTION.GAUCHE
    }
}

PNG.prototype.VerifDeplacement = function (prochaineCase, map) {
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