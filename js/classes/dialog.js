function Dialog(perso, canvas){
    var canvas = canvas;
    var context = canvas.getContext('2d');
    this.box = new Box( 5, (3/4)*canvas.height, canvas.width, (1/5)*canvas.height, true);
    this.dessinerDialog = function(message){
        this.box.dessinerBox(context);
//        this.generateRectangle(this.box);
        context.font = "18px Helvetica";
        context.strokeStyle = 'black'
        context.strokeText(message, this.box.x+20, this.box.y+20, this.box.w-10);
    }
}

Dialog.prototype.generateRectangle = function (box){
     var canvas = document.createElement('canvas');
    canvas.height = box.h-4;
    canvas.width = box.w-4;
    var context = canvas.getContext('2d');
    context.fillRect(box.x+2, box.y+2, box.w-4, box.h-4);
    context.fillStyle = 'grey';
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
}