import React from "react";

export default (props) => {
	const Sites = props.sites;
	const util = (loading, cb) => (route, Page, Default) =>
		(
			<props.route exact={!Default} path={route}>
				<Page
					isLoaded={!loading}
					_={() => cb(false)}
					modal={props.modal}
					setModal={props.setModal}
				/>
			</props.route>
		);
	const createRoute = util(props.loading, props.cb);
	const returnRoutes = (() => {
		switch (props.subdomain) {
			case "leagueoflegends":
				return (
					<React.Fragment>
						{createRoute("/", Sites.LeagueOfLegends.Home)}
						{createRoute("/statistics", Sites.LeagueOfLegends.Statistics)}
						{createRoute("/titandraft", Sites.LeagueOfLegends.TitanDraft)}
						{createRoute("/articles", Sites.LeagueOfLegends.Articles)}
						{createRoute("/staff", Sites.LeagueOfLegends.Staff)}
						{createRoute("/applications", Sites.LeagueOfLegends.Applications)}
						{createRoute("/divinity", Sites.LeagueOfLegends.Divinity)}
						{createRoute("/conquerors", Sites.LeagueOfLegends.Conquerors)}
					</React.Fragment>
				);
			case "admin":
				return (
					<React.Fragment>{createRoute("/", Sites.Admin.Home)}</React.Fragment>
				);
			default:
				return (
					<React.Fragment>
						{createRoute("/", Sites.TitanEsports.Home)}
					</React.Fragment>
				);
		}
	})();
	return returnRoutes;
};
