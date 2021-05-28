import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Components from "./components/components";
import Sites from "./sites/index";
import Routes from "./routes";

export default () => {
	const [loading, setLoading] = React.useState(true);
	return (
		<Router>
			<div
				style={
					loading
						? {
								width: "100vw",
								height: "100vh",
								overflow: "hidden",
								position: "relative",
						  }
						: { position: "relative" }
				}
			>
				<Switch>
					<Routes
						sites={Sites}
						route={Route}
						loading={loading}
						cb={setLoading}
					/>
				</Switch>
				<ThemeProvider theme={Components.Themes.Dark}>
					<Components.PageLoader loading={loading} />
				</ThemeProvider>
			</div>
		</Router>
	);
};
