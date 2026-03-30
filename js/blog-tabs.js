document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".subnav-tab");
  var track = document.getElementById("blogTabsTrack");
  var current = 0;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var idx = parseInt(tab.getAttribute("data-tab-index"), 10);
      if (idx === current) return;
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      track.style.transform = "translateX(-" + (idx * 50) + "%)";
      current = idx;
    });
  });
});