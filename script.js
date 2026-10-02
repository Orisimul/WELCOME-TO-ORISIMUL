
let currentPage = 1;
const totalPages = 5;

const SUPABASE_FUNCTION_URL =
    "https://ohypogqvidtdfdndtyyc.supabase.co/functions/v1/hyper-responder";

let isSubmitting = false;


// ================================
// PAGE NAVIGATION
// ================================

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

    const progressBar =
        document.getElementById("progressBar");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressText =
        document.getElementById("progressText");

    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    if (progressPercent) {
        progressPercent.textContent = `${percent}%`;
    }

    if (progressText) {
        progressText.textContent =
            `section ${page} of ${totalPages}`;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================================
// VALIDATION
// ================================

function validateCurrentPage() {
    const page = document.querySelector(
        `.page[data-page="${currentPage}"]`
    );

    if (!page) {
        console.error(
            `Could not find page ${currentPage}`
        );

        return false;
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


// ================================
// NEXT / BACK
// ================================

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
    const profileInputs =
        document.querySelectorAll('input[name="profile"]');

    const profileFields =
        document.getElementById("profileFields");

    const pfpTokenBox =
        document.getElementById("pfpTokenBox");


    profileInputs.forEach((input) => {
        input.addEventListener("change", () => {

            if (
                input.value === "yes" ||
                input.value === "maybe"
            ) {
                if (profileFields) {
                    profileFields.classList.add("visible");
                }
            } else {
                if (profileFields) {
                    profileFields.classList.remove("visible");
                }

                if (pfpTokenBox) {
                    pfpTokenBox.classList.remove("visible");
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
        token += characters[
            Math.floor(
                Math.random() * characters.length
            )
        ];
    }

    return token;
}


function setupPfp() {
    const pfpYes =
        document.getElementById("pfpYes");

    const pfpNo =
        document.getElementById("pfpNo");

    const pfpToken =
        document.getElementById("pfpToken");

    const pfpTokenBox =
        document.getElementById("pfpTokenBox");


    if (pfpYes) {
        pfpYes.addEventListener("change", () => {

            if (pfpToken) {
                pfpToken.textContent =
                    generatePfpToken();
            }

            if (pfpTokenBox) {
                pfpTokenBox.classList.add("visible");
            }

        });
    }


    if (pfpNo) {
        pfpNo.addEventListener("change", () => {

            if (pfpTokenBox) {
                pfpTokenBox.classList.remove("visible");
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

    const form =
        document.getElementById("orisimulForm");

    if (!form) {
        console.error(
            "ERROR: #orisimulForm does not exist."
        );

        alert(
            "something went wrong with the form :("
        );

        return;
    }


    const formData =
        new FormData(form);


    const application = {

        name:
            formData.get("name") || "",

        discord:
            formData.get("discord") || "",

        introduction:
            formData.get("introduction") || "",

        about:
            formData.get("about") || "",

        interests:
            formData.get("interests") || "",

        talents:
            formData.get("talents") || "",

        why_orisimul:
            formData.get("why-orisimul") || "",

        projects:
            formData.get("projects") || "",

        learn_try:
            formData.get("learn") || "",

        teamwork:
            formData.get("teamwork") || "",

        wont_help_with:
            formData.get("dont-want") || "",

        wants_profile:
            formData.get("profile") || "",

        profile_username:
            formData.get("profile-username") || "",

        profile_display_name:
            formData.get("profile-display-name") || "",

        profile_about:
            formData.get("profile-about") || "",

        profile_interests:
            formData.get("profile-interests") || "",

        profile_skills:
            formData.get("profile-skills") || "",

        profile_extra:
            formData.get("profile-extra") || "",

        profile_picture:
            formData.get("pfp") || "",

        availability:
            formData.get("availability") || "",

        comfort_unknown_people:
            formData.get("social") || "",

        communication:
            formData.get("communication") || "",

        group_easier:
            formData.get("teamwork-easier") || "",

        group_difficult:
            formData.get("teamwork-difficult") || "",

        understands_non_commercial:
            formData.get("understand") || "",

        support:
            formData.get("support") || "",

        questions:
            formData.get("questions") || "",

        anything_else:
            formData.get("extra") || ""
    };


    console.log(
        "Submitting Orisimul application:",
        application
    );


    isSubmitting = true;


    const submitButton =
        form.querySelector(".submit");


    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";
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


        const responseText =
            await response.text();


        console.log(
            "Supabase response:",
            response.status,
            responseText
        );


        if (!response.ok) {

            throw new Error(
                `Supabase returned ${response.status}: ${responseText}`
            );

        }


        console.log(
            "Orisimul application submitted successfully."
        );


        // Hide form pages
        document
            .querySelectorAll(".page")
            .forEach((page) => {
                page.classList.remove("active");
            });


        // Hide progress
        const progressArea =
            document.querySelector(".progress-area");

        if (progressArea) {
            progressArea.style.display = "none";
        }


        // Show thank-you screen
        const thankYou =
            document.getElementById("thankYou");

        if (thankYou) {
            thankYou.classList.add("active");
        } else {
            console.error(
                "Thank-you element #thankYou was not found."
            );
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
            "something went wrong while sending your application :(\
