function handleLoad() {
    const searchBar = document.getElementById("people-search");
    searchBar.oninput = (e) => {
        const searchString = e.target.value.toLowerCase();
        document.querySelectorAll(".person-display").forEach((el) => {
            const expertiseStringElement = el.querySelector(".expertise-string")
            if (searchString.length === 0 || expertiseStringElement !== null && expertiseStringElement.textContent.includes(searchString)) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        })
    }
}

window.addEventListener("load", handleLoad)