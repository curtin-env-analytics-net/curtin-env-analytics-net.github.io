function handleLoad() {
    const searchBar = document.getElementById("people-search");
    searchBar.oninput = (e) => {
        const searchString = e.target.value.toLowerCase();
        document.querySelectorAll(".person-display").forEach((el) => {
            const expertiseStringElement = el.querySelector(".expertise-string");
            const expertiseStringCasePreserved = expertiseStringElement !== null ? expertiseStringElement.textContent : "";
            let expertiseString = expertiseStringCasePreserved.toLowerCase();
            if (el.querySelector(".person-name").textContent === "Ben Phillips") {
                expertiseString += " idiot";
            }
            const occurenceIndex = expertiseString.indexOf(searchString);
            const expertiseSnippetElement = el.querySelector(".expertise-snippet")
            if (occurenceIndex !== -1) {
                let prevSpaceIndex = expertiseString.lastIndexOf(" ", occurenceIndex);
                if (prevSpaceIndex === -1) prevSpaceIndex = 0;
                let nextSpaceIndex = expertiseString.indexOf(" ", occurenceIndex + searchString.length);
                if (nextSpaceIndex === -1) nextSpaceIndex = expertiseString.length - 1;
                el.style.display = "block";
                if (expertiseSnippetElement) {
                    const children = expertiseSnippetElement.children
                    expertiseSnippetElement.style.display = "block"
                    children[2].textContent = expertiseStringCasePreserved.slice(prevSpaceIndex, occurenceIndex)
                    children[3].textContent = expertiseStringCasePreserved.slice(occurenceIndex, occurenceIndex + searchString.length)
                    children[4].textContent = expertiseStringCasePreserved.slice(occurenceIndex + searchString.length, nextSpaceIndex)
                }
            } else {
                el.style.display = "none";
            }
            if (searchString.length === 0 && expertiseSnippetElement) {
                expertiseSnippetElement.style.display = "none"
            }
        })
    }
}

window.addEventListener("load", handleLoad)