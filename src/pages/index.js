import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {setData} from "@/redux/reducers/content";
import Authorization from "@/components/authorization/Authorization";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import Game from "@/components/game/Game";

export default function Home() {
    const dispatch = useDispatch();
    const {page} = useSelector((state) => state.content);

    const component = {
        authorization: <Authorization/>,
        game: <Game/>
    }

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => dispatch(setData(res.data)))
            .catch((err) => console.log('ERR ---> ', err))
    },[]);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`main`}>
                <SwitchTransition>
                    <CSSTransition key={page} timeout={300} classNames={'page'}>
                        <section className={'page'}>
                            {component[page]}
                        </section>
                    </CSSTransition>
                </SwitchTransition>
            </main>
        </>
    );
}
