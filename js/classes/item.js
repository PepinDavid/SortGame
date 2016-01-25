function Item (url, x, y, nom, type, drop, decor){
    this.nom = nom;
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
            throw "Erreur de chargement du sprite nommé\"" + url + "\".";
        this.refObs.largeur = this.width; //this.largeur
        this.refObs.hauteur = this.height; //this.hauteur
    }

    this.image.src = "wastes/" + url;
}

Item.prototype.dessinerItem = function(context, xView, yView){
    if(this.largeur > 32 || this.hauteur > 32){
        var divX = Math.floor(this.largeur/32)
        var divY = Math.floor(this.hauteur/32)
        this.l = this.largeur;
        this.h = this.hauteur;
        
        if(divX>=2 && divY>=2 && divX <10 && divY<10){
            this.l /=divX
            this.h /=divY
        }else if(divX<2 || divY<2){
            divX = 1.5;
            divY = 2;
        }else{
            this.l /=1.5
            this.h /=2
        }
        context.drawImage(this.image, 0, 0, this.largeur,this.hauteur, ((this.x*32)-(this.largeur/divX)+32)-xView,((this.y*32)- (this.hauteur/divY) + 16)-yView,this.l,this.h)
        
    }else{
        context.drawImage(this.image,// source de l'image
                      0, 0,// a partir de quelles coords (x,y) dans l'image source on duplique
                      this.largeur,this.hauteur// jusqu'a quelles coords (x,y) dans l'image source on duplique
                      , ((this.x*32)-(this.largeur/2)+16)-xView,//point de destination ou il faut soustraire la moitié de l'image pour la centré et on ajoute 16 car c'est la moitié de la largeur d'une case
                      ((this.y*32)- (this.hauteur) + 16)-yView,//meme principe que pour la largeur mais pour la hauteur
                      this.largeur,this.hauteur//dimension dans une case si on divise par deux l'image sera deux fois plus petit dans la case de destination
                     )
    //context.dawImage(source de l'image, xSource, ySource, widthSource, heightSource, xDestination, yDestination, widthDestination, heigthDestination)
    }
}