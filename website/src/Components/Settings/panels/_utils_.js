import React from "react";
import { Dropdown, Text, Theme, Button } from "arclight-react";
import Style from "../style";

const dropdown = (title, theme, onChangeCb, items) => (
	<Style.ControlsDropdown>
		<Style.ControlsTitle>
			<Text theme={theme}>{title}</Text>
		</Style.ControlsTitle>
		<Style.ControlsDropdownItem>
			<Dropdown
				defaultValue={items[0]}
				theme={Theme[theme].complement}
				onChange={onChangeCb}
				items={items.map((el) => ({ component: <div>{el}</div>, value: el }))}
			/>
		</Style.ControlsDropdownItem>
	</Style.ControlsDropdown>
);

const confirms = (theme, confirmCb, cancelCb) => (
	<Style.Confirm>
		<Style.Button>
			<Button
				onClick={() =>
					window.confirm("Confirm operation?")
						? confirmCb().then((res) => {
								window.alert(`Operation status: ${res}`);
								if (res === "Success!") {
									window.location.reload();
								} else {
									window.location.href = "/";
								}
						  })
						: null
				}
				pop
				theme={Theme[theme].complement}
			>
				Submit
			</Button>
		</Style.Button>
		<Style.Button>
			<Button onClick={() => cancelCb()} pop theme={Theme[theme].complement}>
				Cancel
			</Button>
		</Style.Button>
	</Style.Confirm>
);

export default {
	dropdown,
	confirms,
};
