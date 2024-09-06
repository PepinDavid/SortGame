class Box {
    #fill = '#44444';

    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.w = w - 20;
        this.h = h +10;
        this.type = false || type;
    }

    drawBox (context) {
        if(!type){
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.strokeStyle = this.#fill;
        }else{
            context.fillRect(this.x, this.y, this.w, this.h)
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.fillStyle = 'white';
        }
        
    }
}