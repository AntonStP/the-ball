import {Application, Assets, Graphics, Sprite, Texture, TilingSprite} from 'pixi.js';
import gsap from "gsap";


export const initApp = (sceneRef, appRef, setCurrentTitle) => {
    //TODO: отдельно подгрузить gsap и pixi.js(динамеческий ипрорт)
    //TODO: ресайз (stage тянуть)
    //TODO: переделать на ООП

    const app = new Application();
    appRef.current = app;

    setup(sceneRef, app);
    preload()
        .then(() => {
            addGround(app);
            addShadow(app);
            addBall(app);

            animation(app, setCurrentTitle);
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

    tilingBackground.tileScale =.4;
    tilingBackground.anchor.set(0, 1);
    tilingBackground.x = 0;
    tilingBackground.y = height;

    app.stage.addChild(tilingBackground);
}

export const addShadow = (app) => {
    const { width, height } = app.screen;

    const shadow = new Graphics();
    shadow.name ='shadow';
    shadow.fill(0x000000, .2);
    shadow.ellipse(0, 0, 60, 10); // Параметры: x, y, ширина, высота
    shadow.fill();

    shadow.x = width/2;
    shadow.y = app.screen.height - shadow.height / 2 - height*.105;

    app.stage.addChild(shadow);
}


export const addBall = (app) => {
    const ball = Sprite.from('ball');
    ball.name = 'ball';

    const { width, height } = app.screen;

    ball.interactive = true;
    ball.buttonMode = true;

    ball.anchor.set(.5);
    ball.width = 300;
    ball.height = 300;
    ball.scale = .5;
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height - ball.height / 2 - height*.112;

    app.stage.addChild(ball);
}

export const animation = (app, setCurrentTitle) => {
    const ball = app.stage.getChildByName("ball");
    const shadow = app.stage.getChildByName("shadow");
    const timeline = gsap.timeline();


    ball.on('pointerdown', () => {
        timeline.clear();
        ball.interactive = false;

        //BALL
        timeline.to(ball, {
            y: ball.y - app.screen.height / 9*5,
            duration: .5,
            ease: 'power2.out',
        }, 'jump');
        timeline.to(ball.scale, {
            keyframes: [
                { x: .5, y: .8, duration: .1, ease: 'power1.out' },
                { x: .5, y: .5, duration: .2, ease: 'bounce.out' },
            ],
        }, 'jump+=0');
        timeline.to(ball, {
            rotation: ball.rotation + 6.283,
            duration: .8,
            ease: 'out'
        },"jump+=.2");
        timeline.to(ball, {
            y: ball.y,
            duration: .7,
            ease: 'bounce.out',
            onComplete: () => {
                ball.interactive = true;
                setCurrentTitle();
            }
        },"jump+=.5");

        //SHADOW
        timeline.to(shadow, {alpha: 0, duration: .5, ease: 'power2.out',}, 'jump+=0');
        timeline.to(shadow.scale, {x: .5, duration: .5, ease: 'power2.out',}, 'jump+=0');
        timeline.to(shadow, {alpha: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');
        timeline.to(shadow.scale, {x: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');

    });
}
