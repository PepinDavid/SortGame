//constructeur
//chargement de l'image
function Tileset(url){ // = class Tileset
    this.image = new Image(); 
    this.image.referenceDuTileset = this; //reference de l'instance image = celle de notre class
    this.image.onload = function(){
        //nombre de tiles du tileset, image d'origine doit pouvoir se faire diviser par 32
        this.referenceDuTileset.largeur = this.width /32; 
//        console.log(this.referenceDuTileset.largeur)
        if(!this.complete)
            throw new Error("Erreur de chargement du tileset nommé \""+url+"\".");
    }
    this.image.src="tilesets/"+url
};

//Methode appartenant a la class grace a l'objet prototype
//methode de dessin du tile numero "numero" dans le context 2d aux coords x et y
//les tilesets sont affichage gauche a droite
Tileset.prototype.dessinerTile = function(numero, context, xDest, yDest){
    var xSourceEnTiles = numero % this.largeur; // on stock si le reste de la division pour savoir sur quel ligne on va copie
//    console.log('avant if : '+xSourceEnTiles )
    if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur; //si xSourceEnTiles == 0 1ere ligne de l'image
//    console.log('après if : '+xSourceEnTiles )
    var ySourceEnTiles = Math.ceil(numero / this.largeur); //meme principe pour la colonne
//    console.log('apres calcule : '+xSourceEnTiles )
    var xSource = (xSourceEnTiles -1)*32;
//    console.log('xsource : '+xSource);
    var ySource = (ySourceEnTiles -1)*32;
    context.drawImage(this.image, xSource, ySource, 32, 32, xDest, yDest, 32, 32);
}