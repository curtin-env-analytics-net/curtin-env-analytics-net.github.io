function handleLoad() {
    const searchBar = document.getElementById("people-search");
  
    const positionFilters = document.querySelector(".position-filter");
    const expertiseFilters = document.querySelector(".expertise-filter");
  
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
      const searchString = searchBar.value.toLowerCase();
      const checkedPositions = getCheckedValues(positionFilters);
      const checkedExpertise = getCheckedValues(expertiseFilters);
  
      sortVisiblePeople();
  
      // LOOP THROUGH EACH SCHOOL SECTION
      document.querySelectorAll(".school-section").forEach((section) => {
        const people = Array.from(section.querySelectorAll(".person-display"));
        let visibleCount = 0;
  
        people.forEach((el) => {
          const name = el.querySelector(".person-name").textContent.toLowerCase();
          const position = (el.dataset.position || "").toLowerCase();
          const expertise = (el.dataset.expertise || "").toLowerCase();
  
          const matchesName = name.includes(searchString);
          const matchesPosition =
            checkedPositions.length === 0 ||
            checkedPositions.some((p) => position.includes(p));
          const matchesExpertise =
            checkedExpertise.length === 0 ||
            checkedExpertise.some((e) => expertise.includes(e));
  
          const matches = matchesName && matchesPosition && matchesExpertise;
  
          const expertiseSnippetElement = el.querySelector(".expertise-snippet");
  
          if (matches) {
            el.style.display = "flex";
            visibleCount++;
  
            if (expertise.includes(searchString) && expertiseSnippetElement) {
              const occurrenceIndex = expertise.indexOf(searchString);
  
              let prevSpaceIndex = expertise.lastIndexOf(" ", occurrenceIndex);
              if (prevSpaceIndex === -1) prevSpaceIndex = 0;
  
              let nextSpaceIndex = expertise.indexOf(" ", occurrenceIndex + searchString.length);
              if (nextSpaceIndex === -1) nextSpaceIndex = expertise.length;
  
              const children = expertiseSnippetElement.children;
              expertiseSnippetElement.style.display = "block";
  
              children[2].textContent = expertise.slice(prevSpaceIndex, occurrenceIndex);
              children[3].textContent = expertise.slice(occurrenceIndex, occurrenceIndex + searchString.length);
              children[4].textContent = expertise.slice(occurrenceIndex + searchString.length, nextSpaceIndex);
            } else if (expertiseSnippetElement) {
              expertiseSnippetElement.style.display = "none";
            }
          } else {
            el.style.display = "none";
          }
  
          if (searchString.length === 0 && expertiseSnippetElement) {
            expertiseSnippetElement.style.display = "none";
          }
        });
  
        // Hide section if no visible people
        section.style.display = visibleCount === 0 ? "none" : "block";
      });
    }
  
    // Run filter whenever search changes
    searchBar.addEventListener("input", filterPeople);
  
    // Run filter whenever a checkbox changes
    document.querySelectorAll(".search-filters input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", filterPeople);
    });
  
    // initial filter
    filterPeople();
  }
  
  window.addEventListener("load", handleLoad);
  