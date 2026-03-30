document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".subnav-tab");
  var track = document.getElementById("blogTabsTrack");
  if (!track) return;
  var current = 0;

  var notice = document.getElementById("aiNotice");

  function switchTo(idx) {
    if (idx === current && idx === 0) return;
    tabs.forEach(function (t) { t.classList.remove("active"); });
    tabs[idx].classList.add("active");
    track.style.transform = "translateX(-" + (idx * 50) + "%)";
    current = idx;
    if (notice) {
      if (idx === 1) { notice.classList.add("visible"); }
      else { notice.classList.remove("visible"); }
    }
  }

  // Check URL param for tab selection (e.g. ?tab=survey)
  var params = new URLSearchParams(window.location.search);
  var tabParam = params.get("tab");
  if (tabParam === "survey") {
    track.style.transition = "none";
    switchTo(1);
    // Re-enable transition after paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        track.style.transition = "";
      });
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var idx = parseInt(tab.getAttribute("data-tab-index"), 10);
      switchTo(idx);
    });
  });
});