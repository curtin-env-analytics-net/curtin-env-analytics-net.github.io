function handleLoad() {
    const searchBar = document.getElementById("people-search");
    searchBar.oninput = (e) => {
        const searchString = e.target.value.toLowerCase();
        document.querySelectorAll(".person-display").forEach((el) => {
            const expertiseStringElement = el.querySelector(".expertise-string");
            let expertiseString = expertiseStringElement !== null ? expertiseStringElement.textContent : "";
            if (el.querySelector(".person-name").textContent === "Ben Phillips") {
                expertiseString += " idiot"
            }
            if (expertiseString.includes(searchString)) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        })
    }
}

window.addEventListener("load", handleLoad)