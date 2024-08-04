import "./WarningBar.css"
import {useEffect} from "react";

interface  IWarningBar {
    message: string[]

}

function WarningBar(props: IWarningBar) {

    useEffect(() => {
        console.log(props.message)
    }, [props])

    return (
        <div className={"container"}>
            <h4 className={"text"}>{props.message}</h4>
            <ul>
                {props.message.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>

        </div>
    )
}

export default WarningBar