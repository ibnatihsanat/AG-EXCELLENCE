document.addEventListener('DOMContentLoaded', function () {

    const userName = window.localStorage.getItem('name');

    const main = document.querySelector('main')

    const profile = document.createElement('div')
    profile.className = 'profile'
    main.appendChild(profile)

    const welcomeMsg = document.createElement('h2')
    welcomeMsg.className = 'Welcome'
    welcomeMsg.innerText = `Hi, ${userName}`
    profile.appendChild(welcomeMsg)

    const textEdit = document.createElement('p')
    textEdit.className = 'text'
    textEdit.innerText = `You can edit your name and email by clicking the button below.`
    profile.appendChild(textEdit)

    const editProfileBtn = document.createElement('button')
    editProfileBtn.className = 'edit-profile'
    editProfileBtn.innerText = 'Edit Profile'
    profile.appendChild(editProfileBtn)


    editProfileBtn.addEventListener('click', () => {
        editProfilePopup()
    })

    const editProfilePopup = () => {
        // pop-up to edit profile
        const cover = document.createElement('div')
        cover.className = 'popup'
        main.appendChild(cover)

        const profileForm = document.createElement('form')
        profileForm.className = 'profileForm'
        cover.appendChild(profileForm)

        const NameLabel = document.createElement('label')
        NameLabel.className = 'NameLabel'
        NameLabel.innerText = 'Your Name'
        profileForm.appendChild(NameLabel)

        const firstNameInput = document.createElement('input')
        firstNameInput.type = 'text'
        firstNameInput.className = 'nameInput'
        profileForm.appendChild(firstNameInput)

        const emailLabel = document.createElement('label')
        emailLabel.className = 'NameLabel'
        emailLabel.innerText = 'Your Email'
        profileForm.appendChild(emailLabel)

        const emailInput = document.createElement('input')
        emailInput.type = 'email'
        emailInput.className = 'emailInput'
        profileForm.appendChild(emailInput)

        const passwordLabel = document.createElement('label')
        passwordLabel.className = 'passwordLabel'
        passwordLabel.innerText = 'Password'
        profileForm.appendChild(passwordLabel)

        const passwordInput = document.createElement('input')
        passwordInput.type = 'password'
        passwordInput.className = 'passwordInput'
        profileForm.appendChild(passwordInput)

        const btnContainer = document.createElement('div')
        btnContainer.className = 'btnContainer'
        profileForm.appendChild(btnContainer)

        const discardBtn = document.createElement('button')
        discardBtn.className = 'discardBtn'
        discardBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            `
        discardBtn.addEventListener('click', (e) => {
            e.preventDefault()
            cover.classList.add('hide')
        })
        btnContainer.appendChild(discardBtn)

        const confirmBtn = document.createElement('button')
        confirmBtn.className = 'confirmBtn'
        confirmBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault()
            cover.classList.add('hide')
        })
        btnContainer.appendChild(confirmBtn)
    }
});