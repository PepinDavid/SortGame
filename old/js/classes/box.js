export class Box {
    #fill = '#44444';

    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.w = width - 20;
        this.h = height + 10;
        this.type = type;
    }

    drawBox(context) {
        if (!this.type) {
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.strokeStyle = this.#fill;
        } else {
            context.fillRect(this.x, this.y, this.w, this.h)
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.fillStyle = 'white';
        }

    }
}