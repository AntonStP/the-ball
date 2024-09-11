import {useForm} from "react-hook-form";
import {formContent} from "@/constants/content";
import Button from "@/components/button/Button";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setPage, setUser} from "@/redux/reducers/content";


export default function Form(props) {
    //TODO: использовать форму из шаблона
    //TODO: запрос через slice Requests из шаблона
    //TODO: try catch на локал сторадж

    const dispatch = useDispatch();
    const {inputs, button} = formContent;
    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit,
        reset
    } = useForm({mode: "onBlur",});

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        axios.post('https://dummyjson.com/auth/login',data, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                dispatch(setUser(res.data));
                window.localStorage.setItem('user', JSON. stringify(res.data))
                dispatch(setPage('game'))
            })
            .catch((err) => console.log('ERR ---> ', err))
        reset();
    };


    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(({name,registerOptions, ...rest}, id) => (
                <div className={"form__input"} key={`input-${id}`}>
                    <label>
                        {name}
                        <input {...rest} {...register(name, registerOptions)}/>
                    </label>
                    <div className={"form__error"}>
                        {errors[name] &&
                            <span className={'form__error-text'}>{errors[name]?.message || 'Ошибка'}</span>}
                    </div>
                </div>
            ))}
            <Button {...button.attr} disabled={!isValid}/>
        </form>
    )
}

