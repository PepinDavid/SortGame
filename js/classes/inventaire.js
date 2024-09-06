const MAX_SIZE_HEIGHT_IMAGE = 32

class Inventaire {
    constructor(canvas) {
        this.canvas = null || canvas;
        this.wastes = new Array();

        if (this.canvas) {
            this.context = this.canvas.getContext('2d');
        }
    }

    init() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawText();
    }

    addItems(arrayObjects) {
        this.wastes = arrayObjects;
        this.boxes = [];
        let height, width;
        
        this.init();

        this.wastes.forEach((waste, i) => {
            if (waste.hauteur <= MAX_SIZE_HEIGHT_IMAGE) {
                height = waste.hauteur;
                width = waste.largeur;
            }else{
                height = waste.h;
                width = waste.l;
            }

            if (i == 0)
                this.boxes.push(new Box(40, 40, this.canvas.width-30, height));
            else if (i > 0)
                this.boxes.push(new Box(40, this.boxes[i - 1].h + this.boxes[i - 1].y + 10, this.canvas.width - 30, height));

            this.boxes[i].drawBox(this.context);
            this.context.drawImage(waste.image, 0, 0, waste.largeur, waste.hauteur, this.boxes[i].x, this.boxes[i].y + 5, width, height);
            this.context.font = "18px Helvetica";
            this.context.fillText(waste.nom, this.boxes[i].x + width + 10, this.boxes[i].y + 30);
        });
    }

    drawText() {
        var titre = "Inventory : ";
        this.context.font = "24px Helvetica";
        this.context.fillText(titre, this.canvas.width / 3, 30);
        this.up = this.context.strokeRect(5,5,30,30);
        this.down = this.context.strokeRect(5,this.canvas.height-35,30,30)
    }

    addObjectInDOM(obj) {
        if (obj) {
            this.wastes.push(obj);
            
            let div = $('<div>');
            let img = $('<img>')
            let p = $("<span>");

            div.addClass('click');
            div.attr('data-nom', obj.nom);
            div.attr('data-url', obj.url);
            div.attr('data-drop', obj.drop);
            div.attr('data-type', obj.type);

            img.attr('src', obj.image.src);
            img.attr('height', obj.h);
            img.attr('width', obj.l);
            
            p.html(obj.nom);
            
            div.append(img);
            div.append(p);
            
            $('#container').append(div);
        }
    }

    dropObjectFromDOM(object) {
        let index;

        this.wastes.forEach((waste, i) => {
            if (waste.nom = object.nom)
                index = i;
        });

        this.wastes.splice(index, 1);
        $('div.selected').remove()
    }   
}
