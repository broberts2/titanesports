import React from "react";
import Components from "components/index";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

export default (props) => {
  const classes = Style();
  const [channel, setChannel] = React.useState(null);
  const [channels, setChannels] = React.useState([]);
  const [question, setQuestion] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState(null);
  const [answerArray, setAnswerArray] = React.useState({ 0: "" });
  const [timeout, _setTimeout] = React.useState(null);
  const [timeoutUnits, setTimeoutUnits] = React.useState("Seconds");
  React.useEffect(async () => {
    const channels = await GlobalActions.Requests.getAllChannels().then((res) =>
      res
        .filter((el) => el.type === "text")
        .map((el) => ({
          id: el.id,
          name: el.name,
        }))
    );
    setChannels(channels);
  }, []);
  return (
    <Utils.Document
      title={"Flash Poll"}
      description={"Creates a discord poll."}
      validate={() =>
        channel &&
        timeout &&
        imgUrl &&
        question &&
        Object.keys(answerArray).length > 1
      }
      onSubmit={async () => {
        const __ = (name) => {
          for (let el of channels) {
            if (el.name === name) {
              return el.id;
            }
          }
        };
        const multiplyer = (unit) => {
          switch (unit) {
            case "Seconds":
              return 1000;
            case "Minutes":
              return 60000;
            case "Hours":
              return 60000 * 60;
            case "Days":
              return 60000 * 60 * 24;
          }
        };
        const res = await GlobalActions.Requests.createFlashPoll({
          channelId: __(channel),
          question,
          time: parseInt(timeout) * multiplyer(timeoutUnits),
          answerArray: Object.values(answerArray),
          imgUrl,
        });
      }}
    >
      <Components.Picklist
        onChange={(id) => setChannel(id)}
        invertColor
        items={channels.map((el) => el.name)}
        value={channel}
        helpText={"Select a Channel"}
      />
      <Components.TextField
        label={"Specify a timeout"}
        value={timeout}
        invertColor
        onChange={(value) => _setTimeout(value)}
      />
      <Components.PrimaryButton
        style={{ opacity: timeoutUnits === "Seconds" ? 1 : 0.15 }}
        onClick={() => setTimeoutUnits("Seconds")}
      >
        Seconds
      </Components.PrimaryButton>
      <Components.PrimaryButton
        style={{ opacity: timeoutUnits === "Minutes" ? 1 : 0.15 }}
        onClick={() => setTimeoutUnits("Minutes")}
      >
        Minutes
      </Components.PrimaryButton>
      <Components.PrimaryButton
        style={{ opacity: timeoutUnits === "Hours" ? 1 : 0.15 }}
        onClick={() => setTimeoutUnits("Hours")}
      >
        Hours
      </Components.PrimaryButton>
      <Components.PrimaryButton
        style={{ opacity: timeoutUnits === "Days" ? 1 : 0.15 }}
        onClick={() => setTimeoutUnits("Days")}
      >
        Days
      </Components.PrimaryButton>
      <Components.TextField
        label={"Image Url"}
        value={imgUrl}
        invertColor
        onChange={(url) => setImgUrl(url)}
      />
      <Components.TextField
        label={"Pose a question"}
        value={question}
        invertColor
        onChange={(value) => setQuestion(value)}
      />
      <div>
        {Object.values(answerArray).map((el, index) => (
          <div>
            <Components.TextField
              label={`Response #${index + 1}`}
              value={answerArray[index]}
              invertColor
              onChange={(value) =>
                setAnswerArray((lastArray) => ({
                  ...lastArray,
                  [`${index}`]: value,
                }))
              }
            />
            <Components.PrimaryButton
              onClick={() =>
                setAnswerArray((lastArray) => {
                  const _ = {};
                  const arrStart = Object.values(lastArray).slice(0, index + 1);
                  const arrEnd = Object.values(lastArray).slice(index + 1);
                  arrStart.concat("", arrEnd).map((el, i) => (_[i] = el));
                  return _;
                })
              }
            >
              Add
            </Components.PrimaryButton>
            {Object.keys(answerArray).length > 1 ? (
              <Components.PrimaryButton
                onClick={() =>
                  setAnswerArray((lastArray) => {
                    const _ = {};
                    delete lastArray[index];
                    Object.values(lastArray).map((el, i) => (_[i] = el));
                    return _;
                  })
                }
              >
                Remove
              </Components.PrimaryButton>
            ) : null}
          </div>
        ))}
      </div>
    </Utils.Document>
  );
};
