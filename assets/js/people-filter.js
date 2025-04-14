function handleLoad() {
    const searchBar = document.getElementById("people-search");
    searchBar.oninput = (e) => {
        const searchString = e.target.value;
        document.querySelectorAll(".person-display").forEach((el) => {
            if (el.querySelector(".person-name").textContent.includes(searchString)) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        })
    }
}

window.addEventListener("load", handleLoad)