function Obstacle (nom){
    var xhr = new XMLHttpRequest(); //ajax
    xhr.open('GET', './obstacle/' + nom + '.json', false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
        throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP: " + xhr.status + ").");
    var obsJsonData = xhr.responseText; //endajax
    var obsData = JSON.parse(obsJsonData); // parse des données json en données
    this.tileset = new Tileset(obsData.tileset);
    this.case = obsData.case; // case du dossier Json
    this.coords = obsData.coords;
    this.width = this.case[0].length;
    this.height = this.case.length;
    this.largeur = this.width*32;
    this.hauteur = this.height*32;
    this.image = null;
}

Obstacle.prototype.generate = function () 
{ 
    var canvas = document.createElement('canvas');
    canvas.height = this.height*32;
    canvas.width = this.width*32;
    var context = canvas.getContext('2d');
    context.save();
    for (var i = 0, l = this.case.length; i < l; i++) {
        context.beginPath();
        var ligne = this.case[i];
        var y = i * 32;
        for (var j = 0, k = ligne.length; j < k; j++) {
            this.tileset.dessinerTile(ligne[j], context, j * 32, y);
        }
        context.closePath();
    }
    context.restore();
    this.image = new Image();
    this.image.src = canvas.toDataURL("image/png");
    context = null
    this.ArrayObs();
}

Obstacle.prototype.ArrayObs = function(){
    this.tabObs = [];
    for(i=0; i<this.coords.length;i++){
        this.tabObs.push({ image: this.image, hauteur:this.hauteur, largeur: this.largeur, width: this.width, height: this.height, x: this.coords[i].x, y: this.coords[i].y });
    }
}

Obstacle.prototype.dessinerObstacle = function(context, coordX, coordY, xView, yView){
    context.drawImage(this.image, 0, 0, this.largeur,this.hauteur, (coordX*32)-xView, (coordY*32)-yView,this.largeur,this.hauteur)
     
}