import { Tileset } from "./tileset";
import { Item } from "./item";
import { Obstacle } from "./obstacle";
import { NPC } from "./NPC";

export class Map {
    constructor(name) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `./maps/${name}.json`, false);
        xhr.send(null);

        if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
            throw new Error(`Impossible de charger la carte nommée ${name} (code HTTP: ${xhr.status}).`);

        const mapJsonData = xhr.responseText;
        const mapData = JSON.parse(mapJsonData); // parse des données json en données 

        this.tileset = new Tileset(mapData.tileset);
        this.land = mapData.land;
        this.width = this.land[0].length;
        this.height = this.land.length;
        this.image = null;
        this.allEntity = {
            Items: [],
            Obs: [],
            PNG: [],
        };
    }

    get height() {
        return this.land.height;
    }

    get width() {
        return this.land[0].length;
    }



    generate() {
        const canvas = document.createElement('canvas');
        canvas.height = this.height * 32;
        canvas.width = this.width * 32;

        let context = canvas.getContext('2d');
        context.save();

        this.land.forEach((lines, i) => {
            context.beginPath();
            let y = i * 32;

            lines.forEach((line) => {
                this.tileset.drawTile(line, context, j * 32);
            });

            context.closePath();
        });

        context.restore();

        this.image = new Image();
        this.image.src = canvas.toDataURL("image/png");

        context = null;

        this.generateAll();
    }

    generateAllEntities() {
        const canvas = document.createElement('canvas');
        canvas.height = this.height * 32;
        canvas.width = this.width * 32;

        let context = canvas.getContext('2d');
        context.save();

        this.drawMap(context, 0, 0);

        this.allEntity.Obs.forEach((obstacle) => {
            context.beginPath();

            context.drawImage(
                obstacle.image,
                0,
                0,
                obstacle.width,
                obstacle.height,
                obstacle.x * 32,
                obstacle.y * 32,
                obstacle.width,
                obstacle.height,
            );

            context.closePath();
        });

        // old this.image2
        this.imageItems = new Image();
        this.imageItems.src = canvas.toDataURL("image/png");

        context = null;
    }

    drawMiniMap(ctx, obj) {
        let canHeight = ctx.canvas.height;
        let canWidth = ctx.canvas.width;
        let sizeX = Math.abs(canWidth / this.width)
        let sizeY = Math.abs(canHeight / this.height)
        let centerX = obj.x * sizeX;
        let centerY = obj.y * sizeY;
        let radius = 5;

        ctx.clearRect(
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.width,
        );

        ctx.beginPath();
        ctx.drawImage(
            this.imageItems,
            0,
            0,
            this.imageItems.width,
            this.imageItems.height,
            0,
            0,
            canWidth,
            canHeight,
        );

        ctx.arc(
            centerX,
            centerY,
            radius,
            0,
            2 * Math.PI,
            false,
        );

        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    drawObstacles() {
        const canvas = document.createElement('canvas');
        canvas.height = this.height * 32;
        canvas.width = this.width * 32;

        let context = canvas.getContext('2d');
        const coordinatesObstacles = this.allEntity.Obs.coords;

        context.save();

        this.allEntity.Obs.forEach((coordinates) => {

        })

        for (i = 0; i < this.allEntity.Obs.length; i++) {
            context.beginPath();
            this.allEntity.Obs[i].dessinerObstacle(context, coords[i].x, coords[i].y, 0, 0);
            context.closePath();
        }
        // old this.image3
        this.imageObstacles = new Image();
        this.imageObstacles.src = canvas.toDataURL("image/png");
        context = null;
    }

    drawMapObstacles(context, xView, yView) {
        let sx = xView;
        let sy = yView;
        let sWidth = context.canvas.width;
        let sHeight = context.canvas.height
        let dWidth, dHeight;

        //si l'image rognée est plus petites que le canvas on a besoin de changer les dimensions de l'image sources
        if (this.imageObstacles.width - sx < sWidth) {
            sWidth = this.imageObstacles.width - sx;
        }
        if (this.imageObstacles.height - sy < sHeight) {
            sHeight = this.imageObstacles.height - sy;
        }

        //la taille de la source est la meme que la taille de destination pour gardé la meme echelle
        dWidth = sWidth;
        dHeight = sHeight;

        context.drawImage(this.imageObstacles, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    }

    drawMap(context, xView, yView) {
        let sx = xView;
        let sy = yView;
        let sWidth = context.canvas.width;
        let sHeight = context.canvas.height
        let dWidth, dHeight;

        //si l'image rognée est plus petites que le canvas on a besoin de changer les dimensions de l'image sources
        if (this.image.width - sx < sWidth) {
            sWidth = this.image.width - sx;
        }
        if (this.image.height - sy < sHeight) {
            sHeight = this.image.height - sy;
        }

        //la taille de la source est la meme que la taille de destination pour gardé la meme echelle
        dWidth = sWidth;
        dHeight = sHeight;

        context.drawImage(this.image, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    }

    pushItemsOnMap(arrItems) {
        for (let item of arrItems) {
            this.allEntity.Items.push(
                new Item(
                    item.url,
                    item.x,
                    item.y,
                    item.nom,
                    item.type,
                    item.drop,
                    item.decor ? item.decor : false,
                ),
            );
        }
    }

    pushObstaclesOnMap(arrayObstacles) {
        for (let obstacle of arrayObstacles) {
            this.allEntity.Obstacles.push(
                new Obstacle(
                    obstacle.url,
                    obstacle.x,
                    obstacle.y,
                ),
            );
        }
    }

    pushNPCOnMap(arrayNPCS) {
        for (let npc of arrayNPCS) {
            this.allEntity.npc.push(
                new NPC(
                    npc.url,
                    npc.x,
                    npc.y,
                    npc.direction,
                    npc.dialog,
                ),
            );
        }
    }

    removeItemOnMapFromInventories(inventories) {
        let position = -1;

        for (let inventory of inventories) {
            this.allEntity.Items.forEach((item, index) => {
                if (inventory.name === item.name) {
                    position = index;
                }
            });

            if (position >= 0) {
                this.allEntity.Items.splice(position, 1);
                position = -1;
            }
        }
    }

    removeItemOnMap(item) {
        if (item) {
            let position = -1;

            this.allEntity.Items.forEach((itemEntity, index) => {
                if (item.name === itemEntity.name) {
                    position = index;
                }
            });

            if (position >= 0) {
                this.allEntity.Items.splice(position, 1);
                position = -1;
            }
        }
    }
}
