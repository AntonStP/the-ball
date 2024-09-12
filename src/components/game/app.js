import {Application, Assets, Graphics, Sprite, Texture, TilingSprite} from 'pixi.js';
import gsap from "gsap";


export class App {
    //TODO: отдельно подгрузить gsap и pixi.js(динамеческий ипрорт)
    //TODO: ресайз (stage тянуть)

    constructor(sceneRef, appRef, setCurrentTitle) {
        this.sceneRef = sceneRef;
        this.appRef = appRef;
        this.setCurrentTitle = setCurrentTitle;

        this.app = new Application();
        this.appRef.current = this.app;

        this.init();
    }


    init() {
        this.setup();
        this.preload()
            .then(() => {
                this.addGround();
                this.addShadow();
                this.addBall();

                this.animation();
            });
    }

    setup() {
        this.app.init({background: '#89cee3', resizeTo: window})
            .then(() => {
                this.sceneRef.current.appendChild(this.app.canvas);
            });
    }

    preload() {
        const assets = [
            {alias: 'background', src: './assets/background.png'},
            {alias: 'ball', src: './assets/ball.png'},
        ];
        return Assets.load(assets);
    }

    addGround() {
        const backgroundTexture = Texture.from('background');
        const { width, height } = this.app.screen;

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

        this.app.stage.addChild(tilingBackground);
    }

    addShadow() {
        const { width, height } = this.app.screen;

        const shadow = new Graphics();
        shadow.name ='shadow';
        shadow.fill(0x000000, .2);
        shadow.ellipse(0, 0, 60, 10); // Параметры: x, y, ширина, высота
        shadow.fill();

        shadow.x = width/2;
        shadow.y = this.app.screen.height - shadow.height / 2 - height*.105;

        this.app.stage.addChild(shadow);
    }

    addBall() {
        const ball = Sprite.from('ball');
        ball.name = 'ball';

        const { width, height } = this.app.screen;

        ball.interactive = true;
        ball.buttonMode = true;

        ball.anchor.set(.5);
        ball.width = 300;
        ball.height = 300;
        ball.scale = .5;
        ball.x = this.app.screen.width / 2;
        ball.y = this.app.screen.height - ball.height / 2 - height*.112;

        this.app.stage.addChild(ball);
    }

    animation() {
        const ball = this.app.stage.getChildByName("ball");
        const shadow = this.app.stage.getChildByName("shadow");
        const timeline = gsap.timeline();


        ball.on('pointerdown', () => {
            timeline.clear();
            ball.interactive = false;

            //BALL
            timeline.to(ball, {
                y: ball.y - this.app.screen.height / 9*5,
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
                    this.setCurrentTitle();
                }
            },"jump+=.5");

            //SHADOW
            timeline.to(shadow, {alpha: 0, duration: .5, ease: 'power2.out',}, 'jump+=0');
            timeline.to(shadow.scale, {x: .5, duration: .5, ease: 'power2.out',}, 'jump+=0');
            timeline.to(shadow, {alpha: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');
            timeline.to(shadow.scale, {x: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');

        });
    }

}
