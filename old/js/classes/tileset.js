//constructeur

import { SIZE_CASE } from "../tools/constantes";

//chargement de l'image
export class Tileset{
    constructor(url){ // = class Tileset
        this.image = new Image(); 
        this.image.referenceDuTileset = this; //reference de l'instance image = celle de notre class
        this.image.onload = () => {
            //nombre de tiles du tileset, image d'origine doit pouvoir se faire diviser par 32
            this.referenceDuTileset.largeur = this.width / SIZE_CASE; 
    
            if(!this.complete)
                throw new Error("Erreur de chargement du tileset nommé \""+url+"\".");
        }

        this.image.src= `tilesets/${url}`
    }

    //Methode appartenant a la class grace a l'objet prototype
    //methode de dessin du tile numero "numero" dans le context 2d aux coords x et y
    //les tilesets sont affichage gauche a droite
    dessinerTile(numero, context, xDest, yDest) {
        let xSourceEnTiles = numero % this.largeur; // on stock si le reste de la division pour savoir sur quel ligne on va copie
        let ySourceEnTiles = Math.ceil(numero / this.largeur); //meme principe pour la colonne

        if (xSourceEnTiles == 0)
            xSourceEnTiles = this.largeur; //si xSourceEnTiles == 0 1ere ligne de l'image

        let xSource = (xSourceEnTiles -1) * SIZE_CASE;
        let ySource = (ySourceEnTiles -1) * SIZE_CASE;

        context.drawImage(this.image, xSource, ySource, 32, 32, xDest, yDest, 32, 32);
    }
}
