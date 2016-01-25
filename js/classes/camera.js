//mouvements possible par la camera
var MVTAXES = {
    NONE: "none",
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    BOTH: "both" //les deux en memes temps
}

//constructeur de la camera
function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {

    //position haut/gauche(top/left) de la camera
    this.xView = xView || 0;
    this.yView = yView || 0;

    //distance entre l'objet suivi et les limites du point de vue que la canvas affichera
    //initialisation a zero
    this.xDeadZone = 0;
    this.yDeadZone = 0;

    //dimensions du point de vue que le canvas affichera
    this.wView = canvasWidth;
    this.hView = canvasHeight;

    //permettre les mouvements sur x et y en meme temps
    this.mvtaxes = MVTAXES.BOTH;

    //objet que l'on pourra suivre
    this.followed = null;

    //rectangle qui represente l'angle de vue qui entour le player
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    //rectangle qui represente les limites de la carte(du monde ou de la salle ou est le personnage)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight)

}

//function qui servira a dire quelle objet/personne la camera suivra avec les limites de l'angle de vue
Camera.prototype.follow = function (obj, xDeadZone, yDeadZone) {
    this.followed = obj;
    //la DeadZone est une taille max avant quand la camera bouge
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;

}

Camera.prototype.update = function () {
    // si on suit bien un objet
    if (this.followed != null) {

        //si la camera bouge sur l'axe x(droite/gauche) ou les deux
        if (this.mvtaxes == MVTAXES.HORIZONTAL || this.mvtaxes == MVTAXES.BOTH) {
            //si la coords.x de l'objet - la position en gauche/left de la camera + le max que la camera a le droit de montrer est superieur a la largeur de l'angle de vue
            if (this.followed.totalX - this.xView + this.xDeadZone > this.wView)
                this.xView = this.followed.totalX - (this.wView - this.xDeadZone);
            else if (this.followed.totalX - this.xDeadZone < this.xView)
                this.xView = this.followed.totalX - this.xDeadZone;
        }
        //si la camera bouge sur l'axe y(haut/bas) ou les deux
        if (this.mvtaxes == MVTAXES.VERTICAL || this.mvtaxes == MVTAXES.BOTH) {
            //si la coords.y de l'objet - la position en haut/top de la camera + le max que la camera a le droit de montrer est superieur a la hauteur de l'angle de vue
            if (this.followed.totalY - this.yView + this.yDeadZone > this.hView)
                this.yView = this.followed.totalY - (this.hView - this.yDeadZone);
            else if (this.followed.totalY - this.yDeadZone < this.yView)
                this.yView = this.followed.totalY - this.yDeadZone;
        }
    }
    //maj de l'angle de vue
    this.viewportRect.set(this.xView, this.yView);

    //ne pas laisser la camera partir au dela des limites du monde/map
    if (this.viewportRect.dehors(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left)
            this.xView = this.worldRect.left;
        if (this.viewportRect.top < this.worldRect.top)
            this.yView = this.worldRect.top;
        if (this.viewportRect.right > this.worldRect.right)
            this.xView = this.worldRect.right - this.wView;
        if (this.viewportRect.bottom > this.worldRect.bottom)
            this.yView = this.worldRect.bottom - this.hView;
    }
}