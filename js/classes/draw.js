export function drawImage(context) {
    return function(image, width, height, coordX, coordY) {
        context.drawImage(
            image,
            0,
            0,
            width,
            height,
            coordX,
            coordY,
            width,
            height,
        );
    };
}
