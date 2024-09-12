import { SIZE_CASE, MIDDLE_SIZE_CASE } from "../tools/constantes";

export class Item {
    constructor(url, x, y, name, type, drop, decor) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.url = url;
        this.type = type;
        this.drop = drop;
        this.decor = false || decor;
        this.enable = true;
    
        this.image = new Image();
        this.image.refObs = this;
        this.image.onload = function () {
            if (!this.complete)
                throw "Erreur de chargement du sprite namemé\"" + url + "\".";
    
            this.refObs.width = this.width;
            this.refObs.height = this.height;
        }
    
        this.image.src = `wastes/${url}`;
    }

    dessinerItem(context, xView, yView) {
        if (this.width > SIZE_CASE || this.height > SIZE_CASE) {
            var divX = Math.floor(this.width / SIZE_CASE)
            var divY = Math.floor(this.height / SIZE_CASE)
            this.l = this.width;
            this.h = this.height;
            
            if (divX >= 2 && divY >= 2 && divX < 10 && divY < 10) {
                this.l /= divX
                this.h /= divY
            } else if (divX < 2 || divY < 2){
                divX = 1.5;
                divY = 2;
            } else {
                this.l /= 1.5
                this.h /= 2
            }
    
            context.drawImage(
                this.image,
                0,
                0,
                this.width,
                this.height,
                (this.x * SIZE_CASE - this.width / divX + SIZE_CASE) - xView,
                (this.y * SIZE_CASE - this.height / divY + MIDDLE_SIZE_CASE) - yView,
                this.l ,
                this.h,
            );
        } else {
            // context.dawImage(image source, x source, y source, width source, height source, x destination, y destination, width destination, heigth destination)
            context.drawImage(
                this.image,
                0,
                0,
                this.width,
                this.height,
                (this.x * SIZE_CASE) - (this.width / 2) + MIDDLE_SIZE_CASE - xView,
                (this.y * SIZE_CASE) - (this.height) + MIDDLE_SIZE_CASE - yView,
                this.width,
                this.height,
            );
        }
    }

}