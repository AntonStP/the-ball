import Form from "@/baseComponents/form/Form";
import LabelInput from "@/baseComponents/form/LabelInput";
import Button from "@/components/button/Button";
import AuthorizationForm from "@/components/authorizationForm/AuthorizationForm";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import requests from "@/redux/reducers/requests";

export default function Authorization({inputs, button}) {
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(false);


    const slots = {
        all: inputs.map((el, id) => (
            <LabelInput key={`input-${id}`} {...el}/>
        ))
    };


    const onSubmit = useCallback((data) => {
        dispatch(requests.thunks.submit(data))
    }, [])



    return (
        <div className={"authorization"}>
            <Form className={"authorization-form"} as={AuthorizationForm} slots={...slots}
                  useFormProps={{mode: 'onBlur'}}
                  onValidation={(validationValue) => setIsValid(validationValue)}
                  onSubmit={onSubmit}>
                <Button {...button.attr} disabled={!isValid}/>
            </Form>
        </div>
    )
}

