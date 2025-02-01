async function loadDetails(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container.dataset.loaded) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      container.innerHTML = html;
      container.dataset.loaded = "true";

      // Render KaTeX equations after content is loaded
      renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
        displayMode: true,
        output: "html",
        strict: false,
      });
    } catch (error) {
      console.error("Error loading details:", error);
    }
  }
}

function toggleBibtex(id, url) {
  const details = document.getElementById(id);
  const icon = document.getElementById(id.replace("details", "icon"));

  if (details.style.display === "none") {
    details.style.display = "block";
    icon.className = "fas fa-chevron-up";
    loadDetails(id, url);
  } else {
    details.style.display = "none";
    icon.className = "fas fa-chevron-down";
  }
}
