import Form from "@/baseComponents/form/Form";
import LabelInput from "@/baseComponents/form/LabelInput";
import Button from "@/components/button/Button";
import AuthorizationForm from "@/components/authorizationForm/AuthorizationForm";
import {useState} from "react";

export default function Authorization({inputs, button}) {

    const [isValid, setIsValid] = useState(false);

    const slots = {
        all: inputs.map((el, id) => (
            <LabelInput key={`input-${id}`} {...el}/>
        ))
    };

    return (
        <div className={"authorization"}>
            <Form className={"authorization-form"} as={AuthorizationForm} slots={...slots}
                  useFormProps={{mode: 'onBlur'}}
                  onValidation={(validationValue) => setIsValid(validationValue)}
                  onSubmit={(data) => {console.log(data, 'DATA')}}>
                <Button {...button.attr} disabled={!isValid}/>
            </Form>
        </div>
    )
}

