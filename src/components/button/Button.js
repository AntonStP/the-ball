
export default function Button({text, ...rest}) {


    return (
        <button className={'button'} {...rest}>
            {text && <div className={'button__text'}>{text}</div>}
        </button>
    )
}

