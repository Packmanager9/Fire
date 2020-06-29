
window.addEventListener('DOMContentLoaded', (event) =>{



    
    let friction = .99
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


    class Triangle{
        constructor(x, y, color, length){
            this.x = x
            this.y = y
            this.color= color
            this.length = length
            this.x1 = this.x + this.length
            this.x2 = this.x - this.length
            this.tip = this.y - this.length*2
            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.stokeWidth = 3
            tutorial_canvas_context.moveTo(this.x, this.y)
            tutorial_canvas_context.lineTo(this.x1, this.y)
            tutorial_canvas_context.lineTo(this.x, this.tip)
            tutorial_canvas_context.lineTo(this.x2, this.y)
            tutorial_canvas_context.lineTo(this.x, this.y)
            tutorial_canvas_context.stroke()
        }

        isPointInside(point){
            if(point.x <= this.x1){
                if(point.y >= this.tip){
                    if(point.y <= this.y){
                        if(point.x >= this.x2){
                            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
                            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
                            this.basey = point.y-this.tip
                            this.basex = point.x - this.x
                            if(this.basex == 0){
                                return true
                            }
                            this.slope = this.basey/this.basex
                            if(this.slope >= this.accept1){
                                return true
                            }else if(this.slope <= this.accept2){
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
            this.xmoms = 0
            this.ymoms = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 2
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
        //    tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        specialmove(){

            if(this.x > tutorial_canvas.width){
                if(this.xmoms > 0){
                this.xmoms*=-1
                }
            }
            if(this.y > tutorial_canvas.height){
                if(this.ymoms > 0){
                this.ymoms*=-1
                }
            }
            if(this.x < 0){
                if(this.xmoms < 0){
                this.xmoms*=-1
                }
            }
            if(this.y < 0){
                if(this.ymoms < 0){
                    this.ymoms*=-1
                }
            }
            this.xmoms*=.99
            this.ymoms*=.99
            this.x += this.xmoms
            this.y += this.ymoms
        }
        control(){
            if(keysPressed['w']){
                this.y-=1
            }
            if(keysPressed['s']){
                this.y+=1
            }
            if(keysPressed['a']){
                this.x-=1
            }
            if(keysPressed['d']){
                this.x+=1
            }
        }
        specialmoveX(){

            this.x -= this.xmoms
            this.y -= this.ymoms
        }
        unmove(){
             //friction
            //  if(this.x > tutorial_canvas.width){
            //     if(this.xmom > 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom*=-1
            //     }
            // }
            // if(this.x < 0){
            //     if(this.xmom < 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y < 0){
            //     if(this.ymom < 0){
            //         this.ymom*=-1
            //     }
            // }
            // this.xmom/=.999
            // this.ymom/=.999
            // this.x -= this.xmom
            this.y -= this.ymom
        }
        move(){
            //friction
            // if(this.x > tutorial_canvas.width){
            //     if(this.xmom > 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom*=-1
            //     }
            // }
            // if(this.x < 0){
            //     if(this.xmom < 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y < 0){
            //     if(this.ymom < 0){
            //         this.ymom*=-1
            //     }
            // }
            // this.xmom*=friction
            // this.ymom*=friction
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }
        isPointInsidex(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*3*this.radius)){
                return true
            }
            return false
        }
    }
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hypotenuse = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hypotenuse)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.x1, this.y1)         
            tutorial_canvas_context.lineTo(this.x2, this.y2)
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.lineWidth = 1
        }
    }


    let log = new Circle(350, 350, 10, "blue")
    let fire = []
    let flammable = []
    log.burning = 5
    flammable.push(log)

    let lock
    for(let k = 0; k<750; k++){
        lock = 0
        let logx = new Circle(Math.random()*700, Math.random()*700, 3, "green")
        for(let g = 0; g<flammable.length; g++){
            if(flammable[g].isPointInsidex(logx)){
                
                lock = 1
            }
        }
        if(lock == 0){
            logx.radius =(Math.random()*4)+3
            logx.burning = Math.floor(Math.random()*-4)
            flammable.push(logx)
        }

    }
   
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width, tutorial_canvas.height)

        log.control()

        for(let f = 0; f<flammable.length; f++){
            flammable[f].draw()
            if(flammable[f].burning >= 1){
                    for(let y = 0;y<flammable[f].burning;y++){
                if(Math.random()<.1){
                        burn(flammable[f])
                    }
                }
            }
        }
        
        for(let f = 0; f<fire.length; f++){
            fire[f].radius -= Math.random()*.1
            if(fire[f].radius <= 0){
                fire[f].radius = 0
            }
            fire[f].move()
            fire[f].control()
            fire[f].draw()
            for(let g = 0; g<flammable.length; g++){
                if(flammable[g].isPointInside(fire[f])){
                    if(Math.random()<.1){
                    flammable[g].burning++
                    if( flammable[g].burning >5 ){
                        flammable[g].burning = 5
                    }

                    }

                }
            }
        }
        for(let f = 0; f<fire.length; f++){
            if(fire[f].radius <= 0){
                fire.splice(f,1)
            }
        }
        for(let f = 0; f<flammable.length; f++){
            if(flammable[f].radius <= 0){
                flammable.splice(f,1)
            }
        }
    }, 7) 

    function burn(obj){
            let spark = new Circle(obj.x, obj.y, Math.random()*3, randomTan(), 2*(Math.random()-.5), (Math.random()-.5)*2)

            obj.radius-=.005*obj.burning
            if(obj.radius <= 0){
                obj.radius = 0
            }
    
            fire.push(spark)

    }


  function randomTan(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i <2; i++) {
      color += letters[(Math.floor(Math.random() * 4)+12)];
    }
    for (var i = 0; i <2; i++) {
      color += letters[(Math.floor(Math.random() * 7)+4)];
    }
    color += "55"
    return color;
  }


})