fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then(() => {
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    p1.textContent =  'Loading...'
    p2.textContent =  ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error
            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
})