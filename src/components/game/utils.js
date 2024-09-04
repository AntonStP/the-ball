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
        });

};



export const setup = (sceneRef, app) => {
    console.log('app', app);
    app.init({background: '#1099bb', resizeTo: window})
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
    const background = Texture.from('background');
    const {width, height} = app.screen;

    const tilingBackground = new TilingSprite(
        background, width, height / 3
    );

    console.log('tilingSprite', tilingBackground);

    app.stage.addChild(tilingBackground)

    tilingBackground.anchor.set(0,1);
    tilingBackground.x = 0;
    tilingBackground.y = height;
}

export const addBall = (app) => {
    const ball = Sprite.from('ball');
    app.stage.addChild(ball);

    ball.interactive = true;
    ball.buttonMode = true;

    ball.anchor.set(.5);
    ball.width = app.screen.width / 10;
    ball.height = app.screen.width / 10;
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height - ball.height / 2;

    ball.on('pointerdown', () => {
        gsap.to(ball, {
            y: ball.y - app.screen.height / 2,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(ball, {
                    y: ball.y + app.screen.height / 2,
                    duration: 0.5,
                    ease: 'bounce.out',
                    onComplete: () => {
                        console.log('Прыжок завершен!');
                    }
                });
            }
        })
    });
}
