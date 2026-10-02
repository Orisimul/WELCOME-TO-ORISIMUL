let currentPage = 1;

const totalFormPages = 5;
const thankYouPage = 6;

const pages = document.querySelectorAll(".page");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const progressPercent =
    document.getElementById("progressPercent");


/* ================================
   PAGE SWITCHING
================================ */

function showPage(pageNumber) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const page =
        document.querySelector(
            `.page[data-page="${pageNumber}"]`
        );


    if (page) {

        page.classList.add("active");

    }


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================================
   PROGRESS
================================ */

function updateProgress() {

    if (currentPage > totalFormPages) {

        const progress =
            document.querySelector(".progress-wrap");

        if (progress) {

            progress.style.display = "none";

        }

        return;

    }


    const progress =
        document.querySelector(".progress-wrap");

    if (progress) {

        progress.style.display = "block";

    }


    const percentage =
        Math.round(
            (currentPage / totalFormPages) * 100
        );


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    if (progressText) {

        progressText.textContent =
            `section ${currentPage} of ${totalFormPages}`;

    }


    if (progressPercent) {

        progressPercent.textContent =
            `${percentage}%`;

    }

}


/* ================================
   REQUIRED QUESTIONS
================================ */

function validatePage() {

    const current =
        document.querySelector(
            `.page[data-page="${currentPage}"]`
        );


    if (!current) {

        return true;

    }


    const requiredInputs =
        current.querySelectorAll(
            "input[required], textarea[required], select[required]"
        );


    for (const input of requiredInputs) {

        if (!input.checkValidity()) {

            input.reportValidity();

            return false;

        }

    }


    return true;

}


/* ================================
   NEXT
================================ */

function nextPage() {

    if (!validatePage()) {

        return;

    }


    if (currentPage < totalFormPages) {

        currentPage++;

        showPage(currentPage);

    }

}


/* ================================
   BACK
================================ */

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        showPage(currentPage);

    }

}


/* ================================
   PROFILE QUESTIONS
================================ */

const profileChoices =
    document.querySelectorAll(
        'input[name="profile"]'
    );


const profileFields =
    document.getElementById(
        "profileFields"
    );


profileChoices.forEach(choice => {

    choice.addEventListener(
        "change",
        () => {

            if (
                choice.checked &&
                (
                    choice.value === "yes" ||
                    choice.value === "maybe"
                )
            ) {

                profileFields.classList.add("show");

            } else {

                profileFields.classList.remove("show");

                hidePfpToken();

            }

        }
    );

});


/* ================================
   PFP TOKEN
================================ */

const pfpChoices =
    document.querySelectorAll(
        'input[name="pfp"]'
    );


const tokenBox =
    document.getElementById(
        "tokenBox"
    );


const tokenText =
    document.getElementById(
        "pfpToken"
    );


function generatePfpToken() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let token = "OR-";


    for (let i = 0; i < 5; i++) {

        token +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];

    }


    return token;

}


function hidePfpToken() {

    if (tokenBox) {

        tokenBox.classList.remove("show");

    }

}


pfpChoices.forEach(choice => {

    choice.addEventListener(
        "change",
        () => {

            if (
                choice.checked &&
                choice.value === "yes"
            ) {

                tokenText.textContent =
                    generatePfpToken();

                tokenBox.classList.add("show");

            } else {

                hidePfpToken();

            }

        }
    );

});


/* ================================
   FINISH
================================ */

function finishForm() {

    if (!validatePage()) {

        return;

    }


    currentPage =
        thankYouPage;


    showPage(currentPage);

}


/* ================================
   START
================================ */

showPage(1);
