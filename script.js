```js
let currentPage = 1;
const totalPages = 5;

// Your Supabase Edge Function
const SUPABASE_FUNCTION_URL =
    "https://ohypogqvidtdfdndtyyc.supabase.co/functions/v1/hyper-responder";

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


// PROFILE FIELDS

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


// PFP TOKEN

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


// SUBMIT TO SUPABASE

async function finishForm() {
    if (!validateCurrentPage()) {
        return;
    }

    const form = document.getElementById("orisimulForm");

    const formData = new FormData(form);

    // Convert the HTML form names into the database column names.
    const application = {
        name: formData.get("name") || "",
        discord: formData.get("discord") || "",

        introduction: formData.get("introduction") || "",
        about: formData.get("about") || "",
        interests: formData.get("interests") || "",
        talents: formData.get("talents") || "",

        why_orisimul: formData.get("why-orisimul") || "",
        projects: formData.get("projects") || "",
        learn_try: formData.get("learn") || "",
        wont_help_with: formData.get("dont-want") || "",

        wants_profile: formData.get("profile") || "",
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

    try {
        const response = await fetch(
            SUPABASE_FUNCTION_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(application)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Supabase submission error:",
                errorText
            );

            throw new Error(
                `Submission failed: ${response.status}`
            );
        }

        // Hide all form pages
        document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
        });

        // Hide progress bar
        document
            .querySelector(".progress-area")
            .style.display = "none";

        // Show thank-you screen
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
```
