//constructeur de notre angle de vue
function Rectangle(left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
}

//function d'initialisation
Rectangle.prototype.set = function (left, top, /*optionnel*/ width, /*optionnel*/ height) {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
}

// fonction ???
Rectangle.prototype.dedans = function (r) {
    return (r.left <= this.left &&
        r.right >= this.right &&
        r.top <= this.top &&
        r.bottom >= this.bottom
    )
}

Rectangle.prototype.dehors = function (r) {
    return (this.left < r.right &&
        r.left < this.right &&
        this.top < r.bottom &&
        r.top < this.bottom)
}