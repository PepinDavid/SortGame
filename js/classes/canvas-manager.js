export class CanvasManager {
    constructor(canvasId) {
        if (!CanvasManager.instance) {
            const canvas = document.getElementById(canvasId);

            if (!canvas)
                throw new Error('Canvas unreachable');

            this.ctx = canvas.getContext('2d');
            CanvasManager.instance = this
        }

        return CanvasManager.instance;
    }

    getContext() {
        return this.ctx;
    }

    saveContext() {
        this.ctx.save();
    }

    restoreContext() {
        this.ctx.restore();
    }

    drawImage(image, sourceCoordinates, destinationCoordinates) {
        this.ctx.drawImage(
            image,
            sourceCoordinates.x,
            sourceCoordinates.y,
            sourceCoordinates.width,
            sourceCoordinates.height,
            destinationCoordinates.x,
            destinationCoordinates.y,
            destinationCoordinates.width,
            destinationCoordinates.height,
        );
    }
}