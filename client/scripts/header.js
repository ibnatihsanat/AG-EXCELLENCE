document.addEventListener('DOMContentLoaded', function () {

    const token = window.localStorage.getItem('token')
    const userName = window.localStorage.getItem('name')

    console.log(window.localStorage.getItem('token'));
    console.log(window.localStorage.getItem('name'));

    const user = userName ? userName : 'Anonymous'
    let dropdownState = false

    const header = document.querySelector('header')
    const header_btn = document.querySelector('header button')
    header_btn.innerHTML = `<p>${user}</p>`

    const icon = document.createElement('div')
    icon.setAttribute('class', `icon icon-${dropdownState}`)
    icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
            </svg>
            `
    header_btn.appendChild(icon)

    const dropdown = document.createElement('div')
    dropdown.setAttribute('class', `dropdown dropdown-${dropdownState}`)

    const profile = document.createElement('a')
    profile.setAttribute('href', 'profile.html')
    profile.innerText = 'Profile'

    const logout = document.createElement('a')
    logout.setAttribute('href', 'login.html')
    logout.addEventListener('click', () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('name')
    })
    logout.innerText = 'Logout'

    if (token) {
        dropdown.appendChild(profile)
        dropdown.appendChild(logout)
    }

    header.appendChild(dropdown)
    header_btn.addEventListener('click', () => {
        icon.classList.remove(`icon-${dropdownState}`)
        dropdown.classList.remove(`dropdown-${dropdownState}`)
        dropdownState = !dropdownState
        icon.classList.add(`icon-${dropdownState}`)
        dropdown.classList.add(`dropdown-${dropdownState}`)
    })

});
