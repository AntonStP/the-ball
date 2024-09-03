import {Application, Assets, Sprite} from 'pixi.js';
import {useEffect, useRef} from "react";
import gsap from 'gsap';

export default function Game(props) {
    const sceneRef = useRef();
    const appRef = useRef(null);

    useEffect(() => {
        if (appRef.current) return;

        const app = new Application();
        appRef.current = app;

        app.init({background: '#1099bb', resizeTo: window})
            .then(() => {
                sceneRef.current.appendChild(app.canvas);

                Assets.load('./assets/ball.png')
                    .then(res=> {
                        const ball = new Sprite(res);
                        app.stage.addChild(ball);
                        ball.interactive = true;
                        ball.buttonMode = true;

                        ball.anchor.set(.5);
                        ball.width = app.screen.width/10;
                        ball.height = app.screen.width/10;
                        ball.x = app.screen.width / 2;
                        ball.y = app.screen.height - ball.height/2;

                        ball.on('pointerdown', () => {
                            gsap.to(ball, {
                                y: ball.y - app.screen.height/2,
                                duration: 0.5,
                                ease: 'power2.out',
                                onComplete: () => {
                                    gsap.to(ball, {
                                        y: ball.y + app.screen.height/2,
                                        duration: 0.5,
                                        ease: 'bounce.out',
                                        onComplete: () => {
                                            console.log('Прыжок завершен!');
                                        }
                                    });
                                }
                            })
                        });

                    })
                    .catch(e => console.log('e ball ----> ', e));

            })
            .catch(e => console.log('e ----> ', e));


    }, []);



    return (
        <div className={"game"} ref={sceneRef} />
    )
}

