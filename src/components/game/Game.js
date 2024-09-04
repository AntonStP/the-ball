import {useEffect, useRef} from "react";
import {initApp} from "@/components/game/utils";


export default function Game(props) {
    const sceneRef = useRef();
    const appRef = useRef(null);

    useEffect(() => {
        if (appRef.current) return;
        initApp(sceneRef, appRef);
    }, []);


    return (
        <div className={"game"} ref={sceneRef} />
    )
}

