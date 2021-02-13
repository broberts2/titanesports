import React from "react";
import Style from "./style";
import Utils from "./utils";

export default class _ extends React.Component {

    async componentDidMount() {
        const channels = await this.props.STATE.GLOBAL_METHODS.doAction(null, "get", "/Oracle/getAllChannels").then(channels => channels.filter(c => c.type === "text" ? c : null));
        this.setState({ channels, answerArray: [""] });
    }

    render() {
        return this.state ? (
            <Style.Base>
                <Utils.Intro STATE={this.props.STATE} title={"Flash Poll"} description={"Generates a poll in discord!"} />
                <Utils.ScrollItems STATE={this.props.STATE} title={"Select a Channel"} items={this.state.channels} onSelect={selectedChannelId => this.setState({ selectedChannelId })} />
                <Utils.TimeInput STATE={this.props.STATE}  onEnter={ timeInput => this.setState({ timeInput })} />
                <Utils.UrlImage STATE={this.props.STATE} value={this.state.urlImage} imgSrc={this.state.urlImage} onChange={ urlImage => this.setState({ urlImage })} />
                <Utils.Question STATE={this.props.STATE} value={this.state.question} onChange={ question => this.setState({ question })} />
                {this.state.answerArray.map((el, i) => <Utils.ProvideAnAnswer 
                    isLast={this.state.answerArray.length - 1 === i}
                    answerArray={this.state.answerArray}
                    STATE={this.props.STATE} 
                    setAnswerArray={answerArray => this.setState({ answerArray })} 
                    value={this.state.answerArray[i]} 
                    onChange={answer => {
                        const state = this.state;
                        state.answerArray[i] = answer;
                        this.setState({ state })
                    }}
                />)}
                <Utils.Execute STATE={this.props.STATE} isValid={this.state.selectedChannelId && this.state.timeInput && this.state.urlImage && this.state.question && this.state.answerArray[0].length > 0} cb={async () => {
                    const result = await this.props.STATE.GLOBAL_METHODS.doAction(
                        { channelId: this.state.selectedChannelId, time: this.state.timeInput, imgUrl: this.state.urlImage, question: this.state.question, answerArray: this.state.answerArray }, 
                        "post", `/Oracle/create_flash_poll`
                    );
                    if(result === "Success!") {
                        alert("Flash poll creation successful!");
                        this.props.STATE.GLOBAL_METHODS.showModal(null);
                    } else {
                        alert("Failed to create discord flash poll.");
                    }
                }} />
            </Style.Base>
        ) : null
    }
}