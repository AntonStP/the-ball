import {name, password} from "@/constants/form";

export const formContent = {
    inputs: [
        {
            labelProps: {
                className: 'authorization-form__label'
            },
            className: 'authorization-form__input input',
            label: 'username',
            type: 'text',
            name: 'username',
            rules: name()
        },
        {
            labelProps: {
                className: 'authorization-form__label'
            },
            className: 'authorization-form__input',
            label: 'password',
            type: 'password',
            name: 'password',
            rules: password()
        }
    ],
    _inputs: [
        {
            name: 'username',
            type: 'text',
            registerOptions: {
                required: "Поле обязательно к заполнению",
                pattern: {
                    value: /^[A-Za-z][A-Za-z0-9]*$/,
                    message: 'Имя может содержать только буквы и цифры, первый символ должен быть буквой'
                },
                minLength: {
                    value: 3,
                    message: 'Имя должно быть не менее 3 символов'
                },
                maxLength: {
                    value: 12,
                    message: 'Длина имени не должна превышать 20 символов'
                },
            }
        },
        {
            name: 'password',
            type: 'password',
            registerOptions: {
                required: "Поле обязательно к заполнению",
                minLength: {
                    value: 7,
                    message: 'Поле должно быть не менее 7 символов'
                },
                maxLength: {
                    value: 20,
                    message: 'Поле не должно превышать 20 символов'
                },
                pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: 'Пароль должен содержать только буквы и цифры'
                }
            }
        }
    ],
    button: {
        attr: {
            className: 'authorization-form__button button_submit button',
            type: 'submit',
            text: 'Подтвердить'
        }
    }
}