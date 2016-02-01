function Inventaire(canvas){
    this.canvas = null || canvas;
    this.wastes = new Array();
    if(this.canvas){
        this.context = this.canvas.getContext('2d');
        this.init = function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawText();
        };

        this.drawText = function(){
            var titre = "Inventaire : ";
            this.context.font = "24px Helvetica";
            this.context.fillText(titre, this.canvas.width / 3, 30);
            this.up = this.context.strokeRect(5,5,30,30);
            this.down = this.context.strokeRect(5,this.canvas.height-35,30,30)
        };

        //dessiner rectangle dans canvasInventaire avec les dechets
        this.addItems = function(arrObj) {
            this.wastes = arrObj;
            this.boxes = []
            var haut, larg;
            this.init()
            if (this.wastes.length) {
                for (i = 0; i < this.wastes.length; i++) {
                    if(this.wastes[i].hauteur <= 32){
                        haut = this.wastes[i].hauteur;
                        larg = this.wastes[i].largeur;
                    }else{
                        haut = this.wastes[i].h;
                        larg = this.wastes[i].l;
                    }
                    if (i == 0) {
                        this.boxes.push(new Box(40, 40, this.canvas.width-30, haut))
                    } else if (i > 0) {
                        this.boxes.push(new Box(40, this.boxes[i - 1].h + this.boxes[i - 1].y + 10, this.canvas.width-30, haut))
                    }
                    this.boxes[i].dessinerBox(this.context)
                    this.context.drawImage(this.wastes[i].image, 0, 0, this.wastes[i].largeur, this.wastes[i].hauteur, this.boxes[i].x, this.boxes[i].y + 5, larg, haut);
                    this.context.font = "18px Helvetica";
                    this.context.fillText(this.wastes[i].nom, this.boxes[i].x + larg + 10, this.boxes[i].y + 30)
                }
            }
        };
    }
    this.addObj = function (obj){
        if(obj){
            this.wastes.push(obj);
            div = $('<div>');
            div.addClass('click');
            div.attr('data-nom', obj.nom);
            div.attr('data-url', obj.url);
            div.attr('data-drop', obj.drop);
            div.attr('data-type', obj.type);
            img = $('<img>')
            img.attr('src', obj.image.src);
            img.attr('height', obj.h);
            img.attr('width', obj.l);
            p = $("<span>");
            p.html(obj.nom);
            div.append(img);
            div.append(p);
            $('#container').append(div);
        }
    }
    this.dropObj = function(obj){
        var pos;
        for(var i=0; i<this.wastes.length; i++){
            if(this.wastes[i].nom = obj.nom){
                pos = i;
            }
        }
        this.wastes.splice(pos, 1);
        $('div.selected').remove()
    }
}
