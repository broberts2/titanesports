import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import React from "react";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const [value, setValue] = React.useState(null);
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{props.label}</FormLabel>
			<RadioGroup
				row={props.row}
				value={props.value ? props.value : value}
				onChange={(e) => {
					return props.onChange ? props.onChange(e.target.value) : null;
				}}
			>
				{props.items.map((el) => (
					<FormControlLabel
						value={el}
						control={<Radio onChange={() => setValue(el)} />}
						label={el}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
