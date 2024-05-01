const details = document.querySelectorAll('input')
const form = document.querySelector("form");
const message = document.querySelector('.message');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const details = document.querySelectorAll('input')


    if (!details[0].value || !details[1].value || !details[2].value || !details[3].value) {
        message.textContent = "Please fill the form correctly.";
        return;
    }

    else if (details[2].value !== details[3].value) {
        message.textContent = "Your passwords don't match.";
        return;
    }
    else {
        let user = {
            name: details[0].value,
            email: details[1].value,
            password: details[2].value
        };
        createAccount(user)
    }

    async function createAccount(data) {
        try {
            const response = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const jsonData = await response.json();
                throw new Error(jsonData.error);
            }

            const jsonData = await response.json();
            alert(jsonData.message);
            if (response.status === 200) window.location.href = 'log-in.html'

        } catch (error) {
            message.textContent = error.message
        }

        form.reset()
    };
})