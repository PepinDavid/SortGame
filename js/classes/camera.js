// Possible moves for the camera
export const MVTAXES = {
    NONE: "none",
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    BOTH: "both"
};

export class Camera {
    constructor() {
        //camera position
        this.xView = xView || 0;
        this.yView = yView || 0;

        //distance between following object and limits at point of view that canvas affichera
        this.xDeadZone = 0;
        this.yDeadZone = 0;
        this.weightView = canvasWidth;
        this.heightView = canvasHeight;

        //allow movements on x and y at the same time
        this.axesMovements = MVTAXES.BOTH;

        //object that can be followed
        this.followed = null;

        //rectangle representing the viewing angle surrounding the player
        this.viewportRect = new Rectangle(this.xView, this.yView, this.weightView, this.heightView);

        //rectangle representing world limits
        this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight)
    }

    follow(objectFollowing, xDeadZone, yDeadZone) {
        this.followed = objectFollowing;
        //DeadZone is a max size before the camera moves
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    update() {
        if (this.followed != null) {
            //si la camera bouge sur l'axe x(droite/gauche) ou les deux
            if (this.axesMovements == MVTAXES.HORIZONTAL || this.axesMovements == MVTAXES.BOTH) {
                //if object coords.x minus left camera position plus max that camera can show is superior at the width of angle of view
                if (this.followed.totalX - this.xView + this.xDeadZone > this.weightView)
                    this.xView = this.followed.totalX - (this.weightView - this.xDeadZone);
                else if (this.followed.totalX - this.xDeadZone < this.xView)
                    this.xView = this.followed.totalX - this.xDeadZone;
            }

            //si la camera bouge sur l'axe y(haut/bas) ou les deux
            if (this.axesMovements == MVTAXES.VERTICAL || this.axesMovements == MVTAXES.BOTH) {
                //if object coords.y minus top camera plus max that camera can show is superior at the height of angle of view
                if (this.followed.totalY - this.yView + this.yDeadZone > this.heightView)
                    this.yView = this.followed.totalY - (this.heightView - this.yDeadZone);
                else if (this.followed.totalY - this.yDeadZone < this.yView)
                    this.yView = this.followed.totalY - this.yDeadZone;
            }
        }
        
        this.viewportRect.set(this.xView, this.yView);

        //ne pas laisser la camera partir au dela des limites du monde/map
        if (this.viewportRect.dehors(this.worldRect)) {
            if (this.viewportRect.left < this.worldRect.left)
                this.xView = this.worldRect.left;

            if (this.viewportRect.top < this.worldRect.top)
                this.yView = this.worldRect.top;

            if (this.viewportRect.right > this.worldRect.right)
                this.xView = this.worldRect.right - this.weightView;

            if (this.viewportRect.bottom > this.worldRect.bottom)
                this.yView = this.worldRect.bottom - this.heightView;
        }
    }
}
