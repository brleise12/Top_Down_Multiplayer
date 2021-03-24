window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    //Intialze Canvas
    const render = document.querySelector('canvas').getContext('2d');
    const U_Scale = 128; 
    let w, h, u;
    const resize = () => {
        w = render.canvas.width = render.canvas.clientWidth * window.devicePixelRatio;
        h = render.canvas.height = render.canvas.clientHeight * window.devicePixelRatio;
        u = h / U_Scale;
        render.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bringing in the Angry Dude
    const player_Avatar = new Image();
    player_Avatar.src = 'sprites/angry_Dude_V1.png';

    // Player Input
    const movement = (ArrowRight: false, ArrowLeft: false, ArrowDown: false, ArrowUp: false);
    document.addEventListener('keydown', keydown => {
        if(movement.hasOwnProperty(keydown.key)) {
            movement[keydown.key] = true;
        }
    });
    document.addEventListener('keyup', keyup => {
        if(movement.hasOwnProperty(keyup.key)) {
            movement[keyup.key] = false;
        }
    });

    //Object
    class O_Body {
        constructor (x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
    }
    const O_Body = [];
    O_Body.push(new O_Body(64, 64, 32, 40))

    //The Animation Loop
    let frame_number = false;
    let frame_count = 0;
    const IMG_SIDE = 49;
    let player_direct = 0;
    let x = 16, y = 16;
    const animation = timestamo => {

        //Initiliae Animation
        frame_count++;
        render.clearRect(0, 0, w, h)
        render.fillRect(w / 2, h / 2, u, u);
        render.save();
        render.fillStyle = '#00f';
        render.fillRect(0, 0, w, h);
        render.translate(-Math.floor(x / U_Scale) * w, -Math.floor / U_Scale) * h);


        //Moving Angry Dude
        let left = movement.ArrowLeft, right = movement.ArrowRight, up = movement.ArrowUp, down = movement.ArrowDown;
        let vx = +right - +left;
        let vy = +down - +up;
        if(right || up || left || down) {
            player_direct = right ? 1 : up ? 2 down ? 3 : 0;
            if(frame_count % 30 == 0) {
                frame_number = !frame_number;
      }
     }

     //Colliders
     O_Body.forEach(O_Body => {
         if(O_Body.y <= y + IMG_SIDE && y < O_Body.y + O_Body.h) {
            if(x + IMG_SIDE <= O_Body.x && O_Body.x < x + IMG_SIDE + vx) {
                vx = 0;
                x + O_Body.x - IMG_SIDE;
         }
         if(O_Body.x + O_Body.w <= x && x + vx < O_Body.x + O_Body.y) {
             vx = 0;
             x = O_Body.x + O_Body.w;
         }
         if(O_Body.x <= x + IMG_SIDE && x <= O_Body.x + O_Body.w) {
             if(y + IMG_SIDE <= O_Body.y && O_Body.y < y + IMG_SIDE + vy) {
                 vy = 0;
                 y = O_Body - IMG_SIDE;
             }
             if(O_Body.y + O_Body.h <= y + vy < O_Body.y + O_Body.h) {
                 vy = 0;
                 y = O_Body.y + O_Body.h;
             }
         }
        }
     });
     x += vx;
     y += vy;


        // Render Angry Dude and box
        render.fillStyle = '#00f';
        O_Body.forEach(O_Body => {
            fillRect(O_Body.x * u, O_Body.y * u, O_Body.w * u, O_Body.h * u);
        });
        render.drawImage(player_Avatar, +frame_number * IMG_SIDE, player_direct * IMG_SIDE, IMG_SIDE, IMG_SIDE, x * u, 16 * u, y * u, IMG_SIDE * u);
    
        render.restore();
        window.requestAnimationFrame(animation);
    };
    window.requestAnimationFrame(animation)
});
