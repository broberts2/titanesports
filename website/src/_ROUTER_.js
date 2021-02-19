import Components from "./Components/components";

export default (STATE) => {
	switch (STATE.url.split("?")[0]) {
		case "/settings":
			return <Components.Settings STATE={STATE} />;
		case "/staff":
			return <Components.Staff STATE={STATE} />;
		case "/account":
			return <Components.Account STATE={STATE} />;
		case "/articles":
			return <Components.Articles STATE={STATE} />;
		case "/article":
			return <Components.ArticleViewer STATE={STATE} />;
		case "/oracle":
			return <Components.Oracle STATE={STATE} />;
		case "/teams":
			return <Components.Teams STATE={STATE} />;
		case "/team":
			return <Components.Team STATE={STATE} />;
		case "/titan_draft":
			return <Components.TitanDraft STATE={STATE} />;
		default:
			return <Components.Home STATE={STATE} />;
	}
};
