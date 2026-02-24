function handleLoad() {
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const searchIcon = searchToggle.querySelector("i");
  const searchBar = document.getElementById("people-search");

  // Toggle search bar
  searchToggle.addEventListener("click", () => {
    const isCollapsed = searchContainer.classList.contains("collapsed");

    searchContainer.classList.toggle("collapsed", !isCollapsed);
    searchContainer.classList.toggle("expanded", isCollapsed);

    searchIcon.classList.toggle("fa-search", !isCollapsed);
    searchIcon.classList.toggle("fa-times", isCollapsed);

    if (isCollapsed) {
      searchBar.focus();
    } else {
      searchBar.value = "";
      searchBar.dispatchEvent(new Event("input"));
    }
  });

  function filterPeople() {
    const searchString = searchBar.value.trim().toLowerCase();

    document.querySelectorAll(".school-section").forEach((section) => {
      const people = Array.from(section.querySelectorAll(".person-display"));
      let visibleCount = 0;

      people.forEach((el) => {
        const name = el.querySelector(".person-name").textContent;
        const expertise = (el.dataset.expertise || "").toLowerCase();
        const expertiseRaw = el.dataset.expertiseRaw || "";

        const nameLower = name.toLowerCase();

        const matchesName = nameLower.includes(searchString);
        const matchesExpertise = expertise.includes(searchString);
        const matches = matchesName || matchesExpertise;

        const matchNameEl = el.querySelector(".match-name");
        const matchExpertiseEl = el.querySelector(".match-expertise");
        const snippet = el.querySelector(".match-snippet");

        // Reset highlights
        matchNameEl.innerHTML = "";
        matchExpertiseEl.innerHTML = "";
        snippet.style.display = "none";

        if (matches) {
          el.style.display = "flex";
          visibleCount++;

          if (matchesName && searchString.length > 0) {
            const start = nameLower.indexOf(searchString);
            const end = start + searchString.length;

            matchNameEl.innerHTML =
              `Name: ${name.slice(0, start)}<span class="highlight">${name.slice(start, end)}</span>${name.slice(end)}`;
          }

          if (matchesExpertise && searchString.length > 0) {
            const start = expertise.indexOf(searchString);
            const end = start + searchString.length;

            matchExpertiseEl.innerHTML =
              `Expertise: ${expertiseRaw.slice(0, start)}<span class="highlight">${expertiseRaw.slice(start, end)}</span>${expertiseRaw.slice(end)}`;
          }

          if (matchNameEl.innerHTML || matchExpertiseEl.innerHTML) {
            snippet.style.display = "block";
          }
        } else {
          el.style.display = "none";
        }
      });

      section.style.display = visibleCount === 0 ? "none" : "block";
    });
  }

  searchBar.addEventListener("input", filterPeople);

  filterPeople();
}

window.addEventListener("load", handleLoad);