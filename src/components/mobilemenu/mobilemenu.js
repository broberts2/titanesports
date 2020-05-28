const mobilemenu = document.getElementById("mobilemenu");
if (mobilemenu) {
  mobilemenu.innerHTML = `
<div class="d-block d-lg-none d-xl-none">
  <div id="main" align="left">
    <button class="openbtn" onclick="openNav()">&#9776; Menu</button>
  </div>
</div>
<div id="mySidebar" class="sidebar">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="#demo1" data-toggle="collapse">About</a>
    <div id="demo1" class="collapse">
      <a class="mmenuitem" href="staff-roster.html">Staff Roster</a>
      <a class="mmenuitem" href="rules.html">Rules</a>
      <a class="mmenuitem" href="new-member.html">New Members</a>
      <a class="mmenuitem" href="https://forms.gle/xMmLSCwRgimdkby3A" target="_blank">Apply For Staff Position</a>
      <a class="mmenuitem" href="https://forms.gle/pERKk2QP8vDv4b1i9" target="_blank">Apply For Shoutcasting Position</a>
      <hr>
    </div>
  <a href="#demo2" data-toggle="collapse">Players</a>
    <div id="demo2" class="collapse">
      <a class="mmenuitem" href="#">Sign In</a>
      <a class="mmenuitem" href="#">Statistics</a>
      <a class="mmenuitem" href="https://forms.gle/WcdiyoqgsB7FYTWD7" target="_blank">Appeal Ban Form</a>
      <hr>
    </div>
  <a href="#demo3" data-toggle="collapse">Podcasts</a>
    <div id="demo3" class="collapse">
      <a class="mmenuitem" href="https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw" target="_blank">By The Hearthside</a>
      <hr>
    </div>
  <a href="#demo4" data-toggle="collapse">News & Events</a>
    <div id="demo4" class="collapse">
      <a class="mmenuitem" href="articles.html">News Articles</a>
      <a class="mmenuitem" href="#">Season Schedule</a>
      <a class="mmenuitem" href="events.html">Calendar of Events</a>
      <hr>
    </div>
  <a href="#demo5" data-toggle="collapse">Contact</a>
    <div id="demo5" class="collapse">
      <a class="mmenuitem" href="https://forms.gle/6PDJ4r8Q9mAAExSc6" target="_blank">Player Sign Up Application</a>
      <a class="mmenuitem" href="https://forms.gle/DKUjoU8MRQ75BNC4A" target="_blank">Team Sign Up Application</a>
      <a class="mmenuitem" href="https://forms.gle/HULeV8TK82KB6Mn69" target="_blank">Complaint/Report Player Form</a>
      <a class="mmenuitem" href="https://forms.gle/WcdiyoqgsB7FYTWD7" target="_blank">Appeal Ban Form</a>
      <a class="mmenuitem" href="roster-change.html">Roster Change Form</a>
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
}