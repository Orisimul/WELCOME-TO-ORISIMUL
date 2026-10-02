```js
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

                profileFields.classList.add(
                    "show"
                );

            } else {

                profileFields.classList.remove(
                    "show"
                );

            }

        }
    );

});


function finishForm() {

    const form =
        document.querySelector(".form-section");

    const thanks =
        document.getElementById("thanks");

    form.style.display = "none";

    thanks.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
```
