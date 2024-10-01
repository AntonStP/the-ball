const {Application, Assets, Graphics, Sprite, Texture, TilingSprite} = await import('pixi.js');
const {gsap} = await import('gsap');


export class App {
    //TODO: ресайз (stage тянуть)

    constructor(sceneRef, appRef, setCurrentTitle) {
        this.sceneRef = sceneRef;
        this.appRef = appRef;
        this.setCurrentTitle = setCurrentTitle;

        // Базовый размер холста
        this.width = 1920;
        this.height = 1080;

        this.app = new Application();
        this.appRef.current = this.app;

        this.init();
        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
        this.resize();
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
        this.app.init({
            resizeTo: window,
            width: this.width,
            height: this.height,
            background: '#89cee3'
        })
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

        const groundHeight = this.height * .3;

        const tilingBackground = new TilingSprite({
            texture: backgroundTexture,
            width: this.width,
            height: groundHeight
        });

        tilingBackground.tileScale.set(.67);
        tilingBackground.anchor.set(.5, 0);
        tilingBackground.x = this.width / 2;
        tilingBackground.y = this.height - groundHeight;

        this.app.stage.addChild(tilingBackground);
    }

    addShadow() {
        const shadow = new Graphics();
        shadow.name = 'shadow';
        shadow.fill(0x000000, .2);
        shadow.ellipse(0, 0, 70, 12); // Параметры: x, y, ширина, высота
        shadow.fill();

        shadow.x = this.width / 2;
        shadow.y = this.height - shadow.height / 2 - this.height * .187;

        this.app.stage.addChild(shadow);
    }

    addBall() {
        const ball = Sprite.from('ball');
        ball.name = 'ball';

        ball.interactive = true;
        ball.buttonMode = true;

        ball.anchor.set(.5);
        ball.width = this.width * .7;
        ball.height = this.width * .7;
        ball.scale = .65;
        ball.x = this.width / 2;
        ball.y = this.height - ball.height / 2 - this.height * .195;

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
                y: ball.y - this.height / 9 * 5,
                duration: .5,
                ease: 'power2.out',
            }, 'jump');
            timeline.to(ball.scale, {
                keyframes: [
                    {x: .65, y: .8, duration: .1, ease: 'power1.out'},
                    {x: .65, y: .65, duration: .2, ease: 'bounce.out'},
                ],
            }, 'jump+=0');
            timeline.to(ball, {
                rotation: ball.rotation + 6.283,
                duration: .8,
                ease: 'out'
            }, "jump+=.2");
            timeline.to(ball, {
                y: ball.y,
                duration: .7,
                ease: 'bounce.out',
                onComplete: () => {
                    ball.interactive = true;
                    this.setCurrentTitle();
                }
            }, "jump+=.5");

            //SHADOW
            timeline.to(shadow, {alpha: 0, duration: .5, ease: 'power2.out',}, 'jump+=0');
            timeline.to(shadow.scale, {x: .5, duration: .5, ease: 'power2.out',}, 'jump+=0');
            timeline.to(shadow, {alpha: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');
            timeline.to(shadow.scale, {x: 1, duration: .7, ease: 'bounce.out',}, 'jump+=.5');

        });
    }

    resize() {
        const newWidth = window.innerWidth;
        const newHeight  = window.innerHeight;

        const scaleX = newWidth / this.width;
        const scaleY = newHeight / this.height;
        const scale = Math.max(scaleX, scaleY);

        this.app.stage.scale.set(scale);

        this.app.stage.x = (newWidth - this.width * scale) / 2;
        this.app.stage.y = newHeight - this.height * scale;
    }

}
