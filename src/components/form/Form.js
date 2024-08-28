import {useForm} from "react-hook-form";
import {formContent} from "@/constants/content";
import Button from "@/components/button/Button";


export default function Form(props) {
    const {inputs, button} = formContent;
    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
    }

    console.log('errors', errors);

    return (
        <form className="form" onClick={handleSubmit(onSubmit)}>
            {inputs.map(({name, registerOptions}, id) => (
                <div className={"form__input"} key={`input-${id}`}>
                    <label>
                        name
                        <input {...register(name, {
                            ...registerOptions
                        })}/>
                    </label>
                    {errors[name] && (
                        <div className={"form__error"}>{errors[name]?.message || 'Ошибка'}</div>)
                    }
                </div>
            ))}
            <Button {...button.attr}/>
        </form>
    )
}

