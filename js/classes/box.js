function Box(x,y,w,h,type) {
    this.x = x;
    this.y = y;
    this.w = w - 20;
    this.h = h +10;
    this.type = false || type;
    this.fill = '#44444';
    this.dessinerBox = function (context) {
        if(!type){
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.strokeStyle = this.fill;
        }else{
            context.fillRect(this.x, this.y, this.w, this.h)
            context.strokeRect(this.x, this.y, this.w, this.h)
            context.fillStyle = 'white';
        }
        
    };//endfunction
    this.contains= function(){
        console.log(this.x+' | '+this.w+' | '+this.y+' | '+this.h);
    };    
}
