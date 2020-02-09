document.getElementById("footer").innerHTML = `
<div style="background-color: #000; padding: 30px 0px;">
	<div class="footer" style="margin-top: 30px;">
		<div class="socialfooter container">
			<div class="row" align="center" >
				<div class="col-lg-4"><span class="title">Titan eSports</span></div>
				<div class="col-lg-4 ftrtxt">Connect With Us</div>
				<div class="col-lg-4">
					<div class=" container"><div class="row">
						<div class="col-2">
							<div class="social"><a href="https://www.twitch.tv/titanesportz" target="_blank"><i class="fab fa-twitch"></i></a></div>
						</div>
						<div class="col-2">
							<div class="social"><a href="https://discord.gg/9DPxcfp" target="_blank"><i class="fab fa-discord"></i></a></div>
						</div>
						<div class="col-2">
							<div class="social"><a href="https://www.reddit.com/user/Titan_eSports" target="_blank"><i class="fab fa-reddit-square"></i></a></div>
						</div>
						<div class="col-2">
							<div class="social"><a href="https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw" target="_blank"><i class="fab fa-youtube"></i></a></div>
						</div>
						<div class="col-2">
							<div class="social"><a href="contact.html"><i class="fab fa-instagram"></i></a></div>
						</div>
						<div class="col-2">
							<div class="social"><a href="contact.html"><i class="fab fa-facebook-square"></i></a></div>
						</div>
					</div></div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
AOS.init();
