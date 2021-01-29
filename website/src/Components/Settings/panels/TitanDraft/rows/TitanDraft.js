import React from "react";
import { Button, Theme } from "arclight-react"
import Style from "../../../style"

export default class _ extends React.Component {
    render() {
        return (
            <Style.Panel backgroundColor={Theme[this.props.STATE.THEME].backgroundColor}>
                <Style.Confirm>
                <Style.Button>
                    <Button onClick={() => console.log("confirm")} pop theme={Theme[this.props.STATE.THEME].complement}>
                        Confirm
                    </Button>
                </Style.Button>
                <Style.Button>
                    <Button onClick={() => console.log("confirm")} pop theme={Theme[this.props.STATE.THEME].complement}>
                        Cancel
                    </Button>
                </Style.Button>
                </Style.Confirm>
            </Style.Panel>
        )
    }
  }