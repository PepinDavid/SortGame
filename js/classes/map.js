function Map(nom) { // == class Map s'instancie avec mot clef "new"
    var xhr = new XMLHttpRequest(); //ajax
    xhr.open('GET', './maps/' + nom + '.json', false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
        throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP: " + xhr.status + ").");
    var mapJsonData = xhr.responseText; //endajax
    var mapData = JSON.parse(mapJsonData); // parse des données json en données 
    this.tileset = new Tileset(mapData.tileset);
    this.terrain = mapData.terrain; // terrain du dossier Json
    this.width = this.terrain[0].length;
    this.height = this.terrain.length;
    this.image = null;
    this.alltabs = {Items:[],Obs:[],PNG:[]};
}

//check de la taille des tiles de la carte
Map.prototype.getHauteur = function () {
    return this.terrain.length;
}
Map.prototype.getLargeur = function () {
    return this.terrain[0].length;
}

Map.prototype.generate = function () 
{ 
    var canvas = document.createElement('canvas');
    canvas.height = this.height*32;
    canvas.width = this.width*32;
    var context = canvas.getContext('2d');
    context.save();
    for (var i = 0, l = this.terrain.length; i < l; i++) {
        context.beginPath();
        var ligne = this.terrain[i];
        var y = i * 32;
        for (var j = 0, k = ligne.length; j < k; j++) {
            this.tileset.dessinerTile(ligne[j], context, j * 32, y);
        }
        context.closePath();
    }
    context.restore();
    this.image = new Image();
    this.image.src = canvas.toDataURL("image/png");
    context = null;
    this.generateAll();
}


Map.prototype.generateAll = function(){
    var canvas = document.createElement('canvas');
    canvas.height = this.height*32;
    canvas.width = this.width*32;
    var context = canvas.getContext('2d');
    context.save();
    this.dessinermap(context, 0, 0);
    for (i = 0; i < this.alltabs.Obs.length; i++) {
        context.beginPath();
        context.drawImage(this.alltabs.Obs[i].image, 0 , 0,this.alltabs.Obs[i].largeur, this.alltabs.Obs[i].hauteur, this.alltabs.Obs[i].x*32, this.alltabs.Obs[i].y*32, this.alltabs.Obs[i].largeur, this.alltabs.Obs[i].hauteur);
        context.closePath();
    }
    this.image2 = new Image();
    this.image2.src = canvas.toDataURL("image/png");
    context = null;
}

Map.prototype.drawMiniMap = function(context, obj){
    canHeight = context.canvas.height;
    canWidth = context.canvas.width;
    sizeX = Math.abs(canWidth/this.width)
    sizeY = Math.abs(canHeight/this.height)
    var centerX = obj.x*sizeX;
    var centerY = obj.y*sizeY;
    var radius = 5;
    
    context.clearRect(0,0,context.canvas.width,context.canvas.width)
    context.beginPath();
    context.drawImage(this.image2,0,0,this.image2.width, this.image2.height, 0, 0, canWidth, canHeight)
    context.arc(centerX, centerY, radius, 0, 2*Math.PI, false)
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'green';
    context.stroke();    
}

Map.prototype.imageObs = function(){
    var canvas = document.createElement('canvas');
    canvas.height = this.height*32;
    canvas.width = this.width*32;
    var context = canvas.getContext('2d');
    var coords = this.alltabs.Obs.coords;
    context.save();
    for (i = 0; i < this.alltabs.Obs.length; i++) {
        context.beginPath();
        this.alltabs.Obs[i].dessinerObstacle(context, coords[i].x, coords[i].y, 0, 0);
        context.closePath();
    }
    this.image3 = new Image();
    this.image3.src = canvas.toDataURL("image/png");
    context = null;
    
}

Map.prototype.dessinerMapObs = function(context, xView, yView){
    var sx,sy,dx,dy;
    var sWidth, sHeight, dWidth, dHeight;
    
    //les points a rognés sur l'image/qui est la map
    sx = xView;
    sy = yView;
    
    //dimention de l'image rognée/qui prendra la taille du point de vue de  la camera
    sWidth = context.canvas.width;
    sHeight = context.canvas.height;
    
    //si l'image rognée est plus petites que le canvas on a besoin de changer les dimensions de l'image sources
    if(this.image3.width - sx < sWidth){
        sWidth = this.image3.width - sx;
    }
    if(this.image3.height - sy < sHeight){
        sHeight = this.image3.height - sy;
    }
    
    
    //a partir de quel case on commence a dessiner
    dx = 0;
    dy = 0;
    //la taille de la source est la meme que la taille de destination pour gardé la meme echelle
    dWidth = sWidth;
    dHeight = sHeight;
    
    context.drawImage(this.image3, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    
}

//desinne map complete dans canvas
Map.prototype.dessinermap = function(context, xView, yView){
    var sx,sy,dx,dy;
    var sWidth, sHeight, dWidth, dHeight;
    
    //les points a rognés sur l'image/qui est la map
    sx = xView;
    sy = yView;
    
    //dimention de l'image rognée/qui prendra la taille du point de vue de  la camera
    sWidth = context.canvas.width;
    sHeight = context.canvas.height;
    
    //si l'image rognée est plus petites que le canvas on a besoin de changer les dimensions de l'image sources
    if(this.image.width - sx < sWidth){
        sWidth = this.image.width - sx;
    }
    if(this.image.height - sy < sHeight){
        sHeight = this.image.height - sy;
    }
    
    
    //a partir de quel case on commence a dessiner
    dx = 0;
    dy = 0;
    //la taille de la source est la meme que la taille de destination pour gardé la meme echelle
    dWidth = sWidth;
    dHeight = sHeight;
    
    context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    
}

// ajout des items sur la map
Map.prototype.pushItems = function (arrObj){
    for(i=0; i<arrObj.length; i++){
        if(!arrObj[i].decor){
            this.alltabs.Items.push(new Item(arrObj[i].url,arrObj[i].x,arrObj[i].y,arrObj[i].nom,arrObj[i].type,arrObj[i].drop))
        }else{
            this.alltabs.Items.push(new Item(arrObj[i].url,arrObj[i].x,arrObj[i].y,arrObj[i].nom,arrObj[i].type,arrObj[i].drop,arrObj[i].decor))
        }
    }
}

Map.prototype.pushObs = function (arrObj){
    for(i=0; i<arrObj.length;i++){
        this.alltabs.Obs.push(new Obstacle(arrObj[i].url,arrObj[i].x,arrObj[i].y))
    }
}

Map.prototype.pushPNG = function (arrObj){
    for(i=0; i<arrObj.length; i++){
        this.alltabs.PNG.push(new PNG(arrObj[i].url,arrObj[i].x,arrObj[i].y,arrObj[i].direction,arrObj[i].tirade));
    }
}

Map.prototype.retirerObjMap = function (inventaire) {
    if(inventaire){
        for (i = 0; i < inventaire.length; i++) { // 
            for (j = 0; j < this.alltabs.Items.length; j++) {
                if (inventaire[i].nom == this.alltabs.Items[j].nom) {
                    pos = j;
    //                this.alltabs.Items[j].enable = false; // mettre Obstacle.enable a false;
                    this.alltabs.Items.splice(pos, 1); // en enleve du tableau l'Obstacle a la position 'pos' du tableau sur '1' seul clef du tableau

                }
            }
        }
    }
}

Map.prototype.retirerItemMap = function (item) {
    if(item){
        for (i = 0; i < this.alltabs.Items.length; i++) { // 
            if (item.nom == this.alltabs.Items[i].nom) {
                pos = i;
    //                this.alltabs.Items[j].enable = false; // mettre Obstacle.enable a false;
                this.alltabs.Items.splice(pos, 1); // en enleve du tableau l'Obstacle a la position 'pos' du tableau sur '1' seul clef du tableau

            }
        }
    }
}

