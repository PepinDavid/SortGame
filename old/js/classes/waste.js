import { PositionedEntity } from "./PositionedEntity";

export class Waste extends PositionedEntity {
    constructor(url, x, y, name) {
        super(url, x, y, name);

        this.enable = true;

        this.image = new Image();
        this.image.refObs = this;
        this.image.onload = function () {
            if (!this.complete)
                throw "Erreur de chargement du sprite nommé\"" + url + "\".";

            this.refObs.width = this.width;
            this.refObs.height = this.height;
        }

        this.image.src = "wastes/" + url;
    }

    draw(ctx, xView, yView) {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            this.x * 32 - this.width / 2 + 16 - xView,
            this.y * 32 - this.height / 2 + 16 - yView,
            this.width,
            this.height,
        );
    }
}
