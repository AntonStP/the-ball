import {useForm} from "react-hook-form";
import {formContent} from "@/constants/content";
import Button from "@/components/button/Button";


export default function Form(props) {
    const {inputs, button} = formContent;
    const {

    } = useForm();

    return (
        <form className="form">
            <Button {...button.attr}/>
        </form>
    )
}

