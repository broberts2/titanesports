import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const stateObj = {};
	props.items.map((el) => (stateObj[el] = false));
	const [state, setState] = React.useState(stateObj);
	return (
		<FormGroup row={props.row}>
			{props.items.map((el, i) => (
				<FormControlLabel
					control={
						<Checkbox
							checked={
								props.value && props.value[el]
									? props.value[el]
									: props.value
									? false
									: state[el]
							}
							onChange={() => {
								setState((lastState) => ({
									...lastState,
									[el]: !state[el],
								}));
								return props.onChange
									? props.onChange({
											...state,
											[el]: !state[el],
									  })
									: null;
							}}
							name={`checkbox${i}`}
						/>
					}
					label={el}
				/>
			))}
		</FormGroup>
	);
};
