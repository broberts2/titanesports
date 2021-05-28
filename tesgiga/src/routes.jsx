import React from "react";

export default (props) => {
	const Sites = props.sites;
	const util = (loading, cb) => (route, Page) =>
		(
			<props.route exact path={route}>
				<Page isLoaded={!loading} _={() => cb(false)} />
			</props.route>
		);
	const createRoute = util(props.loading, props.cb);
	return (
		<React.Fragment>
			{createRoute("/", Sites.TitanEsports.Home)}
			{createRoute("/leagueoflegends", Sites.LeagueOfLegends.Home)}
			{createRoute("/statistics", Sites.LeagueOfLegends.Statistics)}
			{createRoute("/titandraft", Sites.LeagueOfLegends.TitanDraft)}
			{createRoute("/articles", Sites.LeagueOfLegends.Articles)}
			{createRoute("/staff", Sites.LeagueOfLegends.Staff)}
			{createRoute("/community", Sites.LeagueOfLegends.Community)}
			{createRoute("/admin", Sites.Admin.Home)}
		</React.Fragment>
	);
};
