import { Tileset } from "./tileset";

export class Obstacle {
    constructor(nom) {
        let xhr = new XMLHttpRequest(); //ajax
        xhr.open('GET', './obstacle/' + nom + '.json', false);
        xhr.send(null);

        if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
            throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP: " + xhr.status + ").");

        let obsJsonData = xhr.responseText; //endajax
        let obsData = JSON.parse(obsJsonData); // parse des données json en données

        this.tileset = new Tileset(obsData.tileset);
        this.case = obsData.case; // case du dossier Json
        this.coords = obsData.coords;
        this.width = this.case[0].length;
        this.height = this.case.length;
        this.largeur = this.width * 32;
        this.hauteur = this.height * 32;
        this.image = null;
    }

    generate() {
        const canvas = document.createElement('canvas');
        canvas.height = this.height * 32;
        canvas.width = this.width * 32;

        let context = canvas.getContext('2d');
        context.save();

        this.case.forEach((lines, i) => {
            let y = i * 32;

            context.beginPath();

            lines.forEach((line, j) => {
                let x = j * 32;

                this.tileset.dessinerTile(line, context, x, y);
            });

            context.closePath();
        });

        this.image = new Image();
        this.image.src = canvas.toDataURL("image/png");

        context = null

        this.ArrayObs();
    }

    ArrayObs() {
        this.tabObs = [];

        for (let coord of this.coords) {
            this.tabObs.push({
                image: this.image,
                hauteur: this.hauteur,
                largeur: this.largeur,
                width: this.width,
                height: this.height,
                x: coord.x,
                y: coord.y,
            });
        }
    }

    drawObstacle(context, coordinateX, coordinateY, xView, yView) {
        context.drawImage(
            this.image,
            0,
            0,
            this.largeur,
            this.hauteur,
            coordinateX * 32 - xView,
            coordinateY * 32 - yView,
            this.largeur,
            this.hauteur,
        );
    }
}
