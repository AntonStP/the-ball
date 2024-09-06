import {useEffect, useRef} from "react";
import {initApp} from "@/components/game/utils";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTitle} from "@/redux/reducers/content";
import {CSSTransition, SwitchTransition} from "react-transition-group";


export default function Game(props) {
    const dispatch = useDispatch();
    const sceneRef = useRef();
    const appRef = useRef(null);
    const {currentTitle,data} = useSelector((state) => state.content);


    useEffect(() => {
        if (appRef.current) return;
        initApp(sceneRef, appRef, ()=> dispatch(setCurrentTitle(currentTitle)));
    }, []);




    return (
        <div className={"game"}>
            <header className={"game__header"}>
                <SwitchTransition>
                    <CSSTransition key={currentTitle} timeout={300} classNames={"game__title"} mountOnEnter unmountOnExit appear>
                        <h1 className={"game__title"}>{currentTitle}</h1>
                    </CSSTransition>
                </SwitchTransition>
            </header>
            <div className={"game__scene"} ref={sceneRef}/>
        </div>
    )
}

