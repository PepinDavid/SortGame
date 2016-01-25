function Poubelle (url, x, y, nom){
    this.nom = nom;
    this.x = x;
    this.y = y;
    this.enable = true;
    this.image = new Image();
    this.image.refObs = this;
    this.image.onload = function () {
        if (!this.complete)
            throw "Erreur de chargement du sprite nommé\"" + url + "\".";
        this.refObs.largeur = this.width; //this.largeur
        this.refObs.hauteur = this.height; //this.hauteur
    }

    this.image.src = "wastes/" + url;
}

Poubelle.prototype.dessinerPoubelle = function(context, xView, yView){
    context.drawImage(this.image,// source de l'image
                      0, 0,// a partir de quelles coords (x,y) dans l'image source on duplique
                      this.largeur,this.hauteur// jusqu'a quelles coords (x,y) dans l'image source on duplique
                      , ((this.x*32)-(this.largeur/2)+16)-xView,//point de destination ou il faut soustraire la moitié de l'image pour la centré et on ajoute 16 car c'est la moitié de la largeur d'une case
                      ((this.y*32)- (this.hauteur) + 16)-yView,//meme principe que pour la largeur mais pour la hauteur
                      this.largeur/2,this.hauteur/3//dimension dans une case si on divise par deux l'image sera deux fois plus petit dans la case de destination
                     )
    //context.dawImage(source de l'image, xSource, ySource, widthSource, heightSource, xDestination, yDestination, widthDestination, heigthDestination)
}