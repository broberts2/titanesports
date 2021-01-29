import Components from "./Components/components"

export default STATE => {
    switch(STATE.url) {
        case "/settings":
            return <Components.Settings STATE={STATE} />
        case "/staff":
            return <Components.Staff STATE={STATE} />
        case "/account":
            return <Components.Account STATE={STATE} />
        default:
            return <Components.Home STATE={STATE} />
    }
}