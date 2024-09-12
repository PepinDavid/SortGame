import { Character } from "./character";
import { Inventaire } from "./inventaire";
import { ACTION, DIRECTION } from "../tools/constantes";

export class Player extends Character {
    constructor(url, x, y, direction) {
        super(url, x, y, direction)
        this.inventaire = new Inventaire(); //utiliser pour canvasInventaire 
        this.score = 0;
        this.tabError = new Array();
    }

    move(direction, map, step) {
        this.isDial = false;
        this.move(direction, map, step); //function heritage Perso

        for (i = 0; i < map.alltabs.Items.length; i++) {
            if (map.alltabs.Items[i].drop && this.VerifDrop(map.alltabs.Items[i])) {
                this.CheckDrop(map.alltabs.Items[i]);
                this.inventaire.addObjectInDOM(map.alltabs.Items[i])
                map.retirerItemMap(map.alltabs.Items[i])
            }
        }
    }

    getAction(action, arrObj) {
        var o = arrObj.Items;
        var png = arrObj.PNG;

        switch (action) {
            case ACTION.ATTRAPER:
                for (let i = 0; i < o.length; i++) {
                    if (o[i].drop && this.VerifDrop(o[i])) {
                        this.item = o[i];
                        this.inventaire.addObjectInDOM(o[i]);
                    } else if (!o[i].drop && this.VerifDrop(o[i])) {
                        this.isDial = true;
                        this.tirade = 'Vous ne pouvez pas prendre cette objet'
                    }
                }
                break;
            case ACTION.JETER:
                if (this.item) { // pour html
                    let obs = false;

                    if ((this.x - 1) < 0 || (this.y - 1) < 0 || (this.x + 1) >= map.width || (this.y + 1) >= map.height) {
                        this.isDial = true;
                        this.tirade = 'Vous êtes au bord de la carte, vous ne pouvez rien jeter';

                        return false;
                    }

                    let posO = -1;

                    for (let i = 0; i < o.length; i++) {
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
                            };

                        } else if (this.item.type != o[posO].type && !o[posO].drop) {
                            this.isDial = true;
                            this.tirade = "Dommage, ce n'est pas la bonne poubelle"

                            if (this.score > 0)
                                this.score -= 5;
                            else
                                this.score = 0;

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
                            };
                        } else if (this.direction == DIRECTION.HAUT) {
                            this.inventaire.dropObj(this.item);

                            return {
                                x: this.x,
                                y: this.y - 1,
                                rep: false
                            };

                        } else if (this.direction == DIRECTION.DROITE) {
                            this.inventaire.dropObj(this.item);

                            return {
                                x: this.x + 1,
                                y: this.y,
                                rep: false
                            };
                        } else if (this.direction == DIRECTION.GAUCHE) {
                            this.inventaire.dropObj(this.item);

                            return {
                                x: this.x - 1,
                                y: this.y,
                                rep: false
                            };
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
    }

    VerifDrop(o) {
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
    }

    CheckDrop(o, i) {
        if (this.totalX == o.x && this.totalY == o.y) {
            this.item = o[i];
        }
    }

    VerifDialogPNG(arrObj) {
        let index = -1;

        arrObj.forEach((obj, i) => {
            if (
                this.x == obj.x - 1 && this.y == obj.y ||
                this.x == obj.x + 1 && this.y == obj.y ||
                this.y == obj.y + 1 && this.x == obj.x ||
                this.y == obj.y - 1 && this.x == obj.x
            )
                index = i;
        });

        return index;
    }
}