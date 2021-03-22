window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    //Intialze Canvas
    const render = document.querySelector('canvas').getContext('2d');
    const U_Scale = 128; 
    let w, h, u;
    const resize = () => {
        w = render.canvas.width = render.canvas.clientWidth * window.devicePixelRatio;
        h = render.canvas.height = render.canvas.clientHeight * window.devicePixelRatio;
        u = h / U_Scale;
    };
    resize();
    window.addEventListener('resize', resize);

    // Bringing in the Angry Dude
    const player_Avatar = new Image();
    player_Avatar.src = 'sprites/angry_Dude_V1.png';

    //The Animation Loop
    const IMG_SIDE = 116;
    const animation = timestamo => {
        render.clearRect(0, 0, w, h);
        render.fillRect(w / 2, h / 2, u, u);
        window.requestAnimationFrame(animation);

        // Render Angry Dude
        render.drawImage(player_Avatar, 0, 0, IMG_SIDE, IMG_SIDE, 16 * u, 16 * u, IMG_SIDE * u, IMG_SIDE * u);)
    };
    window.requestAnimationFrame(animation)
});
