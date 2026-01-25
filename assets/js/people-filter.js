function handleLoad() {
    const searchToggle = document.getElementById("search-toggle");
    const searchContainer = document.getElementById("search-container");
    const searchIcon = searchToggle.querySelector("i");
    
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

    const searchBar = document.getElementById("people-search");
    const positionFilters = document.querySelector(".position-filter");
  
    function sortVisiblePeople() {
      document.querySelectorAll(".people-list").forEach((list) => {
        const people = Array.from(list.querySelectorAll(".person-display"))
          .filter((el) => el.style.display !== "none");
  
        people.sort((a, b) => {
          const firstA = a.dataset.firstName.toLowerCase();
          const firstB = b.dataset.firstName.toLowerCase();
  
          if (firstA !== firstB) return firstA.localeCompare(firstB);
  
          const lastA = a.dataset.lastName.toLowerCase();
          const lastB = b.dataset.lastName.toLowerCase();
          return lastA.localeCompare(lastB);
        });
  
        people.forEach((person) => list.appendChild(person));
      });
    }
  
    function getCheckedValues(container) {
      return Array.from(container.querySelectorAll("input[type='checkbox']:checked"))
        .map((el) => el.value.toLowerCase());
    }
  
    function filterPeople() {
      const searchString = searchBar.value.trim().toLowerCase();
      const checkedPositions = getCheckedValues(positionFilters);
  
      sortVisiblePeople();
  
      document.querySelectorAll(".school-section").forEach((section) => {
        const people = Array.from(section.querySelectorAll(".person-display"));
        let visibleCount = 0;
  
        people.forEach((el) => {
          const name = el.querySelector(".person-name").textContent;
          const position = (el.dataset.position || "").toLowerCase();
          const expertise = (el.dataset.expertise || "").toLowerCase();
          const expertiseRaw = el.dataset.expertiseRaw || "";
  
          const nameLower = name.toLowerCase();
  
          const matchesName = nameLower.includes(searchString);
          const matchesExpertise = expertise.includes(searchString);
  
          const matchesPosition =
            checkedPositions.length === 0 ||
            checkedPositions.some((p) => position.includes(p));
  
          const matches = (matchesName || matchesExpertise) && matchesPosition;
  
          const matchNameEl = el.querySelector(".match-name");
          const matchExpertiseEl = el.querySelector(".match-expertise");
          const snippet = el.querySelector(".match-snippet");
  
          // Reset
          matchNameEl.innerHTML = "";
          matchExpertiseEl.innerHTML = "";
          snippet.style.display = "none";
  
          if (matches) {
            el.style.display = "flex";
            visibleCount++;
  
            // Name highlight
            if (matchesName && searchString.length > 0) {
              const start = nameLower.indexOf(searchString);
              const end = start + searchString.length;
  
              matchNameEl.innerHTML =
                `Name: ${name.slice(0, start)}<span class="highlight">${name.slice(start, end)}</span>${name.slice(end)}`;
            }
  
            // Expertise highlight
            if (matchesExpertise && searchString.length > 0) {
              const start = expertise.indexOf(searchString);
              const end = start + searchString.length;
  
              matchExpertiseEl.innerHTML =
                `Expertise: ${expertiseRaw.slice(0, start)}<span class="highlight">${expertiseRaw.slice(start, end)}</span>${expertiseRaw.slice(end)}`;
            }
  
            // show snippet only if there is text
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
  
    document.querySelectorAll(".search-filters input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", filterPeople);
    });
  
    filterPeople();
  }
  
  window.addEventListener("load", handleLoad);
  