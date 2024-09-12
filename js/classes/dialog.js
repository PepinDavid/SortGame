import { Box } from './box';

export class Dialog {
    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.box = new Box(5, (3 / 4) * canvas.height, canvas.width, (1 / 5) * canvas.height, true);
    }

    dessinerDialog(message) {
        this.box.dessinerBox(this.context);

        this.context.font = "18px Helvetica";
        this.context.strokeStyle = 'black'
        this.context.strokeText(message, this.box.x + 20, this.box.y + 20, this.box.w - 10);
    }

    generateRectangle() {
        const canvas = document.createElement('canvas');

        canvas.height = this.box.h - 4;
        canvas.width = this.box.w - 4;

        const context = canvas.getContext('2d').fillRect(
            this.box.x + 2,
            this.box.y + 2,
            this.box.w - 4,
            this.box.h - 4,
        );

        context.fillStyle = 'grey';

        const image = new Image();
        image.src = canvas.toDataURL("image/png");
    }
}
