let currentPage = 1;
const totalPages = 5;

const SUPABASE_FUNCTION_URL =
    "https://ohypogqvidtdfdndtyyc.supabase.co/functions/v1/hyper-responder";

let isSubmitting = false;


// ================================
// PAGE NAVIGATION
// ================================

function showPage(page) {
    document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
    });

    const selected = document.querySelector(
        '.page[data-page="' + page + '"]'
    );

    if (selected) {
        selected.classList.add("active");
    }

    const percent = Math.round((page / totalPages) * 100);

    const progressBar = document.getElementById("progressBar");
    const progressPercent = document.getElementById("progressPercent");
    const progressText = document.getElementById("progressText");

    if (progressBar) {
        progressBar.style.width = percent + "%";
    }

    if (progressPercent) {
        progressPercent.textContent = percent + "%";
    }

    if (progressText) {
        progressText.textContent =
            "section " + page + " of " + totalPages;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function validateCurrentPage() {
    const page = document.querySelector(
        '.page[data-page="' + currentPage + '"]'
    );

    if (!page) {
        return false;
    }

    const fields = page.querySelectorAll(
        "input[required], textarea[required], select[required]"
    );

    for (const field of fields) {
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


// ================================
// PROFILE
// ================================

function setupProfile() {
    const inputs = document.querySelectorAll(
        'input[name="profile"]'
    );

    const fields = document.getElementById("profileFields");
    const tokenBox = document.getElementById("pfpTokenBox");

    inputs.forEach(function (input) {
        input.addEventListener("change", function () {

            if (
                input.value === "yes" ||
                input.value === "maybe"
            ) {
                if (fields) {
                    fields.classList.add("visible");
                }
            } else {
                if (fields) {
                    fields.classList.remove("visible");
                }

                if (tokenBox) {
                    tokenBox.classList.remove("visible");
                }
            }
        });
    });
}


// ================================
// PFP TOKEN
// ================================

function generatePfpToken() {
    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let token = "OR-";

    for (let i = 0; i < 5; i++) {
        token += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return token;
}


function setupPfp() {
    const yes = document.getElementById("pfpYes");
    const no = document.getElementById("pfpNo");
    const token = document.getElementById("pfpToken");
    const box = document.getElementById("pfpTokenBox");

    if (yes) {
        yes.addEventListener("change", function () {
            if (token) {
                token.textContent = generatePfpToken();
            }

            if (box) {
                box.classList.add("visible");
            }
        });
    }

    if (no) {
        no.addEventListener("change", function () {
            if (box) {
                box.classList.remove("visible");
            }
        });
    }
}


// ================================
// SUBMIT
// ================================

async function finishForm() {
    if (isSubmitting) {
        return;
    }

    if (!validateCurrentPage()) {
        return;
    }

    const form = document.getElementById("orisimulForm");

    if (!form) {
        alert("something went wrong with the form :(");
        return;
    }

    const data = new FormData(form);

    const application = {
        name: data.get("name") || "",
        discord: data.get("discord") || "",
        introduction: data.get("introduction") || "",
        about: data.get("about") || "",
        interests: data.get("interests") || "",
        talents: data.get("talents") || "",
        why_orisimul: data.get("why-orisimul") || "",
        projects: data.get("projects") || "",
        learn_try: data.get("learn") || "",
        teamwork: data.get("teamwork") || "",
        wont_help_with: data.get("dont-want") || "",
        wants_profile: data.get("profile") || "",
        profile_username: data.get("profile-username") || "",
        profile_display_name: data.get("profile-display-name") || "",
        profile_about: data.get("profile-about") || "",
        profile_interests: data.get("profile-interests") || "",
        profile_skills: data.get("profile-skills") || "",
        profile_extra: data.get("profile-extra") || "",
        profile_picture: data.get("pfp") || "",
        availability: data.get("availability") || "",
        comfort_unknown_people: data.get("social") || "",
        communication: data.get("communication") || "",
        group_easier: data.get("teamwork-easier") || "",
        group_difficult: data.get("teamwork-difficult") || "",
        understands_non_commercial: data.get("understand") || "",
        support: data.get("support") || "",
        questions: data.get("questions") || "",
        anything_else: data.get("extra") || ""
    };

    isSubmitting = true;

    const button = form.querySelector(".submit");

    if (button) {
        button.disabled = true;
        button.textContent = "SENDING...";
    }

    try {
        const response = await fetch(
            SUPABASE_FUNCTION_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(application)
            }
        );

        const responseText = await response.text();

        console.log(
            "Supabase response:",
            response.status,
            responseText
        );

        if (!response.ok) {
            throw new Error(
                "Supabase returned " +
                response.status +
                ": " +
                responseText
            );
        }

        document.querySelectorAll(".page").forEach(
            function (page) {
                page.classList.remove("active");
            }
        );

        const progress = document.querySelector(
            ".progress-area"
        );

        if (progress) {
            progress.style.display = "none";
        }

        const thankYou = document.getElementById("thankYou");

        if (thankYou) {
            thankYou.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(
            "ORISIMUL SUBMISSION ERROR:",
            error
        );

        alert(
            "something went wrong while sending your application :("
        );

        isSubmitting = false;

        if (button) {
            button.disabled = false;
            button.textContent = "FINISH!!!";
        }
    }
}


// ================================
// START
// ================================

document.addEventListener("DOMContentLoaded", function () {
    setupProfile();
    setupPfp();
    showPage(currentPage);

    console.log("Orisimul form loaded successfully.");
});
