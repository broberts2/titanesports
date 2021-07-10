/* eslint-disable import/no-anonymous-default-export */
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Components from "components/index";
import GlobalActions from "globalactions/index";
import Sites from "sites/index";
import Routes from "routes";

export default () => {
	const [loading, setLoading] = React.useState(true);
	const [modal, setModal] = React.useState({ state: false, content: null });
	const _setModal = (obj) => setModal(obj);
	const subdomain = window.location.host.split(".")[0];
	React.useEffect(() => GlobalActions().Utils.discordReturnDirect(), []);
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
						subdomain={subdomain}
						sites={Sites}
						route={Route}
						loading={loading}
						cb={(value) => setTimeout(() => setLoading(value), 250)}
						modal={modal}
						setModal={_setModal}
					/>
					<Route
						render={() => (
							<Sites.TitanEsports.Poro
								isLoaded={loading}
								_={() => setLoading(false)}
							/>
						)}
					/>
				</Switch>
				<ThemeProvider theme={Components.Themes.Dark}>
					<Components.PageLoader loading={loading} />
				</ThemeProvider>
			</div>
			<Components.Modal
				disableClickAway={false}
				modal={modal}
				setModal={_setModal}
			/>
		</Router>
	);
};
