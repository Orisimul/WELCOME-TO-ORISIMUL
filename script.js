let currentPage = 1;
const totalPages = 5;

function showPage(page) {
    document.querySelectorAll(".page").forEach((p) => {
        p.classList.remove("active");
    });

    const selected = document.querySelector(
        `.page[data-page="${page}"]`
    );

    if (selected) {
        selected.classList.add("active");
    }

    const percent = Math.round((page / totalPages) * 100);

    document.getElementById("progressBar").style.width =
        percent + "%";

    document.getElementById("progressPercent").textContent =
        percent + "%";

    document.getElementById("progressText").textContent =
        `section ${page} of ${totalPages}`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function validateCurrentPage() {
    const page = document.querySelector(
        `.page[data-page="${currentPage}"]`
    );

    if (!page) {
        return true;
    }

    const requiredFields = page.querySelectorAll(
        "input[required], textarea[required], select[required]"
    );

    for (const field of requiredFields) {
        if (!field.checkValidity()) {
            field.reportValidity();
            return false;
        }
    }

    return true;
}

function nextPage() {
    if (!validateCurrentPage()) {
        return;
    }

    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

document
    .querySelectorAll('input[name="profile"]')
    .forEach((input) => {

        input.addEventListener("change", () => {

            const profileFields =
                document.getElementById("profileFields");

            if (
                input.value === "yes" ||
                input.value === "maybe"
            ) {
                profileFields.classList.add("visible");
            } else {
                profileFields.classList.remove("visible");

                document
                    .getElementById("pfpTokenBox")
                    .classList.remove("visible");
            }
        });
    });

function generatePfpToken() {
    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let token = "OR-";

    for (let i = 0; i < 5; i++) {
        token += characters[
            Math.floor(
                Math.random() * characters.length
            )
        ];
    }

    return token;
}

document
    .getElementById("pfpYes")
    .addEventListener("change", () => {

        document
            .getElementById("pfpToken")
            .textContent = generatePfpToken();

        document
            .getElementById("pfpTokenBox")
            .classList.add("visible");
    });

document
    .getElementById("pfpNo")
    .addEventListener("change", () => {

        document
            .getElementById("pfpTokenBox")
            .classList.remove("visible");
    });

    async function finishForm() {
        if (!validateCurrentPage()) {
            return;
        }
    
        const form = document.getElementById("orisimulForm");
        const formData = new FormData(form);
    
        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });
    
            if (!response.ok) {
                throw new Error("Submission failed");
            }
    
            document.querySelectorAll(".page").forEach((page) => {
                page.classList.remove("active");
            });
    
            document
                .querySelector(".progress-area")
                .style.display = "none";
    
            document
                .getElementById("thankYou")
                .classList.add("active");
    
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
    
        } catch (error) {
            console.error(error);
    
            alert(
                "something went wrong while sending your application :("
            );
        }
    }
    
    showPage(currentPage);
