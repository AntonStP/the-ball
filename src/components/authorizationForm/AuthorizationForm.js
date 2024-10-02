
export default function AuthorizationForm({slots, children, ...props}) {

    return (
        <form className={"form"} {...props}>
            {slots.all}
            {children}
        </form>
    )
}

