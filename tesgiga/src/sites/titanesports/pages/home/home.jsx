import React from "react";
import { ThemeProvider, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Components from "../../../../components/components";
import Labels from "../../../../labels/index";
import Style from "./style";

export default (props) => {
	const classes = Style();
	const Card = (props) => {
		return (
			<Grid item xs={6} sm={3}>
				<Components.InteractiveCard
					anim={props.anim}
					delay={props.delay}
					disabled={props.disabled}
					fill
					onClick={() => props.onClick()}
				>
					<img className={classes.cardimg} src={props.src} />
					<Components.Typography className={classes.typographycardtext}>
						{props.title}
					</Components.Typography>
				</Components.InteractiveCard>
			</Grid>
		);
	};
	React.useEffect(() => props._());
	return (
		<ThemeProvider theme={Components.Themes.Dark}>
			<div className={classes.root}>
				<Grid className={classes.grid} container spacing={0}>
					<Grid className={classes.major} item xs={12} sm={10}>
						<Grid
							container
							spacing={0}
							direction="row"
							className={classes.majorsub}
						>
							<Grid item xs={12}>
								<Box className={classes.content}>
									<Components.Typography
										anim={"grow"}
										delay={1500}
										className={classes.typographywelcometitle}
									>
										Welcome to Titan Esports
									</Components.Typography>
									<Components.Typography
										anim={"grow"}
										delay={2000}
										className={classes.typographywelcometext}
									>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the industry's
										standard dummy text ever since the 1500s, when an unknown
										printer took a galley of type and scrambled it to make a
										like Aldus PageMaker including versions of Lorem Ipsum.
									</Components.Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<div className={classes.items}>
									<Grid
										container
										spacing={0}
										className={classes.majorsub2}
										align="center"
										justify="center"
									>
										<Card
											anim={"grow"}
											delay={1500}
											onClick={() =>
												(window.location = `${window.location.protocol}//leagueoflegends.${window.location.host}`)
											}
											title={"League of Legends"}
											src={Labels.images.lol}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"Valorant"}
											src={Labels.images.valorant}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"World of Warcraft"}
											src={
												"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA9lBMVEX///8rN0z0vyr6wygWLU0AJU60kjj0vRvzuwD3wSn0viPzuw37xCj42pL87s30viX42In76cL30HYjM00lMkgdME3++/IOKk7//vkYKEEAGjgSJD4TLE32yln303v76L3q6+364qv53p/1wzv65bX41YMJHzv989309fYfLUWegjzCnDXptyz2zWb2y171xUOkp64AEzSAbkHRpzL99uT536PLzdG2ub9ETl/1x093fYivsrhxZEPPpTJISUleZXOeoqlnXUVRT0eUfD7gsS5QWGhscn81QFTZ296PlJ1gWEbFx8ysjDo8Qkl8a0KghDyLdT8AHE+e91oOAAATwElEQVR4nO1daXvaOBctS2Jjs2+BEHYCYRpI2maDdJpMp1k6aacz///PvAZL9pV1JcsGk8zz+nxpn8TBOlzp3EXbu3cxYsSIESNGjBgxYsSIESNGjBgx/m/QqE9Ko8vccXk2ay/a81m5UxyMSvmL+ms3bBu4KA1mQ8O0oGmaQWH93/qJriXbue7ktZsYHvVusa3ppmYUkiIUDM3U9UVndPHajQ2OfHFomc0QcmN4WgZNdkqN126zOhrdsmZqYsuJWM77/42B2Z3ppprtvDBMffHmSU46Wkh6lKQ5K702CQlGZ5Y8bgrDLAzepiEbg4IZbOyJYI3J47fHsV7cgvlcaHr5bTmQRk7bJr81R7P8hux4qcavUCisIxrrXyWOevGNuMhu0pQ31VjFaFYnHi4WVlTaXizOrDhOX8VxPkw18/K1yVm4aOuSdq6iMnN+fNnN15k+16hf5EeDzkLX5aGBOcy/FjGKoi50f4amG+1BXq4YF93imSlhWdBnrzocJ0PRAFzFJ4OJ2jiqW0GsLoxhNW0UMYsVLnMoOoIOaphaOWAgfdFv6yJLmnP89bntCVFe13Cg/UrTZ90w7673RSGRgb9dz22PoY9YwsboQ3HMdUIgfNHkWAsQF2nF3TM09Damfb2r2/vlw81TddpstprNafXp5m55f/2MUe0PlTnunqGhz7iSRO/l+930sNWcTqvVhIuqRbY1Pkw83l9xNLtnihx3zZDnd/KyTIxbU8jMi2qz1br5fuV5X0mN424ZFvQ2y693/mCxk5BzWU7Hzcdr1pS+cdLOGZpDJm89uX4YN2W241i2xo+sJQemb6y7Q4aGPoCPPy+nrSD0CMnx0z00ZH0mCwd3y9Bsw8js6u6DUudEODY/LJ/BJ5UKcjPuiqGh98GjLw/j4OZzMT18BBwbZf0NMDQXwIBXNxvxIxx77gd2ZSXX3TCEkdPz3cb81hzHS3c81tvid++CoWG6EnqyPNwGvzXH5rn78qKwp+6AoTZ0e+j1NKS+oGjduMOxK3L/0TM0284TJ3fjLfKzUD387nz4RDAYI2dodpwHXkL4Pz+0bnr04+t4oh01Q6Axy8Ot80usQoBb+oLGAqMYMUPdKYP1bppRELQwXjpNmCMUo2WoO8WTq0ABaDA03Z4649sQKUO9S393+yEyfolVIOdo6oyzYpQM3UDt+5Y1lKM4fqGv4jpqhAzdVGLZipaghQ+O3njlJjqGpvPJj1FpDMQhDXAaQyMqhmXmk7XZTgkCinW2omrMt0WwxESGxmLHBAHFCduZ9C1VwxvMZFhBo+XQ5a4IWhSvyTtHbBhubKfq3WEGuE4LojsQGRcfqKIWGStq5W0QnDBfmzOjdx6xm/CgRf3igtEEfRtrxs5gH3VU5iVSR8+jOu3ZL64zRnRFITz6bLcgHb+3yy5qU7whDWKHormx2DTYQUhT+qfoYlERmjQMZ8K3QmFThkX4cc7Aflzn85W0DJUAra9JP4l8FE2mGsxINAfCtiuhznYJ0kdv1ypT+ev9vgSf1SlWfsg+aP/9R/ujWj379V20USHBeAqTJBQ9kvDWPmZTQmQDMKz+TIo/KJX9vUYeo0NxDq2obTRPegFlxgmSHuggPPojlRQh+yXAUK18zQo/KPXpiD7WJLWbOqp+ocCYUCeFtXtXR9OfxS0TkPmJ/vRgX/RdZU5r7ld1SLziAFLUNhiJzCikkTzjKA5+iSieHuDW+vgX1nsrX4QMv4DnnX6aZJx0eIY5aEIaA94xve/gWwZv2CecYXr/txr28z3B52Q/puFjLRKDd6ERzb6YghyMLNNw7YWtq4lGUOY9zvDg2+/oL472UYaZ93vscy1S8IeRVmEYluGI0RnyQ6+vP3gvaNpRAkU2idowjTNMel83JX6fyej0sEvDhuB7oj3h3BuuCYyY2U8nEFQ+Z7PoQDz4HWOY/Y37lPEzb0RjJiYhQ57RGfJDPifER1AKZ5j+kUqhA/HgFLUh/2j1jhgRdjA93No36CqoW73nGdZ+w2Qw9QNlaAmTQIMwftk/kS+Degwop+EcBhNzky/pBPHieDfN7OPj0LJUBuFe/YL2daw/UyPCpCec1kCd0TpCE1o97xRjiEpmZRUhZP/gG17BQocU/i0RI7IWCKM1MPijqTQ6RYiqaQb1+NYwtBr+izdi7U+kq2e/oqHt9NFuzDEcRcfBCTaAztBOcI3mvbV/0B6GhaUHnzJ4MIA5i8w3gcP50Fu3ZoIpYQDATkpdxQMaTONjCI28K7alnnDqHgjk2DIiCcChwzCDd9MZ6KSmrTPPgmnCPUzp0dH2x/q7QBKrPew7+luYf9lNhFoTvP7dAH9NHep3wUw9Go+kEKVfD0PckyDdIPtTlH+17NpifSM1hVMVtNojqgDX/kaFkKdB+mLmmyfYpMZlcep9ygF1GG0ohkH32MD6jG5nFS+i+lr1CRFC1LFT63DfESJWoth9hbEdfzMOLWiCAWJSmtsvhctJ8BSKM4FjKW6EpZEEGI/ubDTtKv8FUNOgsWkd+XbE0xRkfLHIchXH9C/yGBeWY1KKSRUF7aYwNwjoL2BcS9y9sJMKIhJeMR0emW+eDoiFRRmh0CScbgpTdDNYgR/8KVUpkZKuUENsyPeyI+d7SLGtr/7k/577FhgQNc2HH4hApQxSBpaVubFexuXAQDCzHxn2lb+CCY3j9OFgMoLNQ/EBTU8211T7pWCEtPuQJ/Oo/ckzlAnNSr7tdi7cgRjMI8KQjwzDa9l8KGYErp4IDc36OkxKZUJjYdxbtwpxamqApSzT/pFsGFoUEYJcuQL+jolaUSmVF5TJQGQaGiQ0BUJjkAWIN9I3YmUWT4bO2Dn7D/wdEpVmxBHNGmQgQo8YqKgIwm6aeckX52H5ncfrMWOV1ZGnoELjekTAMFDwDTwpCUqf5ZPaWCnDIzVsVzwFNsSiUrnQWJjaLQVSY7QljDyApWDSu/Hk1wWW/qQYGx4x/Rjm71gH8J26Ouyt29XhHbcKoJshuaFcaPBSBiM1HkPB5ArLvlJ+U1cte4vNAJYy1MUULswh0xWPPi/EsgNGTjxFRzjOMCk9FeT3Dpr2jDBMLwIkUCAqpaaXS6lgIEK/zqmt+7sKH5XipToIIqZMHqsemYIvhg5fn/dZwwxpJpQar8d0u3D1JyI0eEEZMrQrboy7UD8VBXRuEu2d+K4uwQZiBhD0Rj2uWGKZiSdwRUCmEutILUIBIBYi5XxpVLoGOhBdqeFq/24/xKYFsl98VwHYkSmU/QC1fSDB5K983GFC0NdcwUSCHsrhCLO+XydN0IIbmL4IsGYBrCclWZck/XU48DVFkECleTPR0BqpgciTQxtTOwkGRdMAhe9ZGIbYLK4TXCLJR+oXMXAaMaGoGAxAVtfAoEY9QwRTFiScleZONmofkW5Kc3lkrNFiHOZn0Gk1D0j+hOTqCgB/RfTJL2hL4KUIJ/ZCp3jtX1WQais+T4wyBP0tQLkNYaiwHhgZT45bq/H8KH20PiCrQrEMyxsz7KvaEAsvqUtAZ1EJfcyRChbjYAzD2XDOKY2KDbGBSCbi0elBIphHiJT6JIebM4RaeqlsQ8wjEs8tWGmx/rMKklggc6gciJbOQykN9Ie2x1fwFqg1SHrBe8P1L1cDEZXSv/2lNNG0/WE4Le1wUduVCkOkZGanF3gpzp6ewvq20rrG6iYeH8al9l/5x6UJdJbNnkhDhyEZiOich4IJadQ2DBW1wVLbTJ0hWpxf6b5gZdj6l8gQVYnZaG4RMvKG+aG93B9bSMMDWR61HmtHKD87RzpA8kqFmI0W2+pwbkY9e+ryOb7S4nzEI65kUbgC2KJS/YlIqULMhhZM1TNgZkrHrtPcqTBEVGPl8wXDcF32xSqJPgV9G817rqkBqhjwiyHlHfEEMADmEZNHwmG4WoyQxkrJCjEbLeuP+LKgCpB66bnSRjXMI36t1LBlYfYv/9mT5VwykFWYcI40yE42vuat5BCxHDH7T1q8ED/z/l++kuhfZ1sztFsKgpNA02tzbt6ip3SoADYQ3++xs4OMQU//5Wn719kS7pr2JL+iQgnI3JOSu0AWgGVO/2WHIePhs0i0419nSziroeHqu0BbS0b8/KFf0dvGHj/kUlWG8CemdpjBJgPwJYksSMl7Eq6YyP4hEVNFqeFbnGI6aeoHq7eYyqq8iAhNP/RiDOhHlabXCLAZecas2c9Yus9wVonZEk27nXCXeaBZbljBohG70gE7sg1Ma6SeRHtQHIaifQwQyJKhwlkQgnD9Lf1LtYGIzLKwBtoT7B1xv4NfKsmhPQxhaKJ1JHx4dPlQ4VZpIOLZvMtwPy2M4QiUtvWR+dFRWKFht+WRP1X0iEjlDDb/Yw1dIgYfUUh/6XIaOAwDrvpiPCkpDuBroD1AV4qC5v+sosErQEZBaOg6aLjS2xCTQQG3k+j2j9T8RVrW/sxqaheb8gePqEgp8RV5ZCGzMpClOGrdVCqV6zIhNqkNHhFsRYGgnbQYLv21wSwwJSql1E2xFVwO1rmt9Aml9JfkhszGoOBbn+AaatLFVYqmeF2YYj0fIdifQR9RkFJSDIZbzwJ6wxWYeIiUB5SyYHwHk42MpLZIGfqnv9TdY1vPAoBZQ03yEr9FNWug26AIwfWEGlaacXGqYEI7vYcbJgL7ihXgISKkk/dUjvuQ+HyS+Um+AxUppToD3X0hGZwguyOFVCJVIjeJzydr9GViqiClrVveBKGOHagjX5FKgiGJWcgYk4mpipTabWE2doU7p4bZ+UQOjFAqKgoZkqVcssjUX0rphnXYvBBKugLckUA/QrS5C0KwpdedFpRFpv5SWrVbcsHszQu5I5/Zjp9XNqKwPEqXQcki05RfJZGakDlWJljy6+IS1iLJcUUKUzRCqXFq2Xvi8qKflFIhZQ+0CHsgFnOECN1p6+8ThZ3QWZwujl19E3x6jOIxY8LQ52F1ECOe+GYYVdEpHk4tW+wy/ea3aTjDfPkbHIfFjGYqp9e+/RSf0wa1bHRWdA2/WimJSN+VmZOBNriLjlFkGjb4io2gE7q1bPyQgjVD+VKh1r3dBMYXhj/4w/tJNG7wFRtssSFjH3H+IV916RxPw5whZ3aF7VfAjPEYZB31rQ9FQSd07SMudchtSOpP7BlyG5nQMxKdDQ13cj0VJICufcRVVek4pMeZeQ4g28iE3sO+SKXAZ1ZfEJW58xEVYQ4pm3eaEh1lO5YRLmBz4TlWi5QKnqVp1B7uDNzJa7EN+W3eDqokXPMc1xb69B0H7FlRtJ/KTr6sfMWV0u2BkpIjt83bAT16x3M05Obn0LLnszr7wyTHs+4J0j/gLbAN/IShKHs6pAcmwwJSiG34CNgzdp1PfBCpzcEP0dqST7LV+fQhwXEfLXqRAHNU28anJtpgzvBztPlEsMLmQFxJy1LzyFLg7GfMiE1yYgt7tFO44gUPj9jQ2nIPvarqAJlAdBpP90FJyxjY6tnpA20Lexr05jJjw3MmKu0YWEmjsi87LPIbGYgHkodS2R+cEac0lvGcsRtwQk2CGTu4qYvFKKb3JHCsI3tojyNYfaL3znjO1te3RdB7JruTjqnNfG+KqUMw5zn93oyKYUGjgvoc4c0PDsEbSvDSe6dOZAyTBYNOg/SqUVNsUpHxnlYeKcOkkaQUT262eUUQD/eaki5HMEqGgOK7uygPvnZvDEIIRsoQUvwe2eHl4PoOvotGzTBpGE5E+BKR3oBbZvroxV3RMrQU1anh9R4i6KnVQ/emoAF+M1nEDJMF9zodK5vathmnCfdOy47gVrSoGcL7ZrZtRmjAxlx0sV30DJMmWOJxq3avqhJaT+7FchPxTZY7YJjUhm5B/WS5pa7KXA7Yl9xGuguG1mAEE1vPd1u4AnF6+N294LGBXNW1Y4arm8/BSpaNr7Gcjpc98GJDetfqjhgmNQNWLJ9DXyVroXkI+b0r+tyXuyuGlqbO4IKk3rIVKgSojhPMhcD5pN+dx7tjmNS0S/j8yW3AK51XV8h5LnWul/0uPN4pQ+7a6nfP9zeHyiSnzfHdLXsxd073vbR6xwxXV497ykK987umf3+1jDf13jv+ru9zm/OrMFxd7uzl+O7k6v6utbpAHuNZnTZbh9XH82fv6/pJpcvjd89wxXGBTMc+X98/3iQsoq0mQas1HjefHpb3Lz3u6fqlocjvNRiurkAe9vGVHye9q5fr2/Pz+/Pz2+uX594J+tSk6H9pvIst1tp0Awfy1oKpl0PWaeujM1xfCiYKfdOJNYBcGcUcF3TDTBYDk2x0Z6age2rJUQlDN9yNCIFQEkRVBU03jkvqDbjoz3VTcIt6QQ9xovz20BD7Zc00FzkFlhejzlAXXxJvDrc0NxEa+aFYhgzN1JPlQekC5dmoT0bFuambmlg7te1Mn22IS00mf4UVTS15NuvkBv1Rt5QvjfqXuVx5PjQssRDbbv0N6eUdDDUFNBRCLIuoBVsDV/8zDF+nZ+jzbdzfuB3UO0HcmBKsCOnt8FuhfqwSKgfh99oCw6Oe05TDLR9oZvlt2Y+i0R/qUuVQgmFqg7ehLyjyZVPkuRXpmbMN1lLuBI3RQhie+NHT9EX/DZvPRX00N2VuHEPB8prt/wY9G418cejnz4HtTHPYCRDGvhXUS8WFbsVkEt9uBzxzlfD1zWIyytnxmbkOZGzY4Y1uFoYzK2h97SZuA1aMXRpd5o7Ls3m7PS+XO8XcYFSa/IcNFyNGjBgxYsSIESNGjBgxYsSIESMw/gcKRDFSOSNrhQAAAABJRU5ErkJggg=="
											}
										/>
										<Card
											disabled
											onClick={() => alert("Shalom")}
											title={"Valheim"}
											src={
												"https://www.guilded.gg/asset/GameIcons/Valheim-lg.png"
											}
										/>
									</Grid>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid className={classes.gridpanel} item xs={12} sm={2}>
						<Box
							style={{ height: "100%" }}
							display="flex"
							flexDirection="column"
							justifyContent="center"
						>
							<Grid container spacing={0} align="center" justify="center">
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={1500}
										fill
										onClick={() => window.open(Labels.discord)}
									>
										Discord
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={2000}
										fill
										onClick={() => window.open(Labels.twitch)}
									>
										Twitch
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={2500}
										fill
										onClick={() => window.open(Labels.twitter)}
									>
										Twitter
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={3000}
										fill
										onClick={() => window.open(Labels.reddit)}
									>
										Reddit
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={3500}
										fill
										onClick={() => window.open(Labels.youtube)}
									>
										Youtube
									</Components.PrimaryButton>
								</Grid>
								<Grid item xs={12}>
									<Components.PrimaryButton
										anim={"grow"}
										delay={4000}
										fill
										onClick={() => window.open(Labels.facebook)}
									>
										Facebook
									</Components.PrimaryButton>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</div>
		</ThemeProvider>
	);
};
