import {Application, Assets, Sprite, Texture, TilingSprite} from 'pixi.js';
import gsap from "gsap";


export const initApp = (sceneRef, appRef) => {
    const app = new Application();
    appRef.current = app;

    setup(sceneRef, app);
    preload()
        .then(() => {
            addGround(app);
            addBall(app);

            animation(app);
        });

};



export const setup = (sceneRef, app) => {
    console.log('app', app);
    app.init({background: '#89cee3', resizeTo: window})
        .then(() => {
            sceneRef.current.appendChild(app.canvas);
        });
}

export const preload = () => {
    const assets = [
        {alias: 'background', src: './assets/background.png'},
        {alias: 'ball', src: './assets/ball.png'},
    ];
    return Assets.load(assets);
}

export const addGround = (app) => {
    const backgroundTexture = Texture.from('background');
    const { width, height } = app.screen;

    const groundHeight = height * .2;

    const tilingBackground = new TilingSprite({
        texture: backgroundTexture,
        width: width,
        height: groundHeight
    });

    tilingBackground.tileScale =.15;
    tilingBackground.anchor.set(0, 1);
    tilingBackground.x = 0;
    tilingBackground.y = height;

    app.stage.addChild(tilingBackground);
}

export const addBall = (app) => {
    const ball = Sprite.from('ball');
    ball.name = 'ball';

    const { width, height } = app.screen;

    ball.interactive = true;
    ball.buttonMode = true;

    ball.anchor.set(.5);
    ball.width = 150;
    ball.height = 150;
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height - ball.height / 2 - height*.125;

    app.stage.addChild(ball);
}

export const animation = (app) => {
    const ball = app.stage.getChildByName("ball");
    const timeline = gsap.timeline();


    ball.on('pointerdown', () => {
        timeline.clear();
        ball.interactive = false;

        timeline.to(ball, {
            y: ball.y - app.screen.height / 3*2,
            duration: .5,
            ease: 'power2.out',
        }, 'jump')
        timeline.to(ball.scale, {
            keyframes: [
                { x: .3, y: .7, duration: .1, ease: 'power1.out' },
                { x: .3, y: .3, duration: .1, ease: 'bounce.out' }
            ],
        }, 'jump+=0');
        timeline.to(ball, {
            rotation: ball.rotation + 6.283,
            duration: .8,
            ease: 'out',
        },"jump+=.2");
        timeline.to(ball, {
            y: ball.y,
            duration: .5,
            ease: 'bounce.out',
            onComplete: () => ball.interactive = true
        },"jump+=.5");
    });
}
