const searchInput = document.querySelector('input')
const list = document.getElementById('list')
const btn = document.querySelector('button')
const div = document.querySelector('div')
const img = document.querySelector('.nameImg')
const infoDiv = document.querySelector('.infoDiv')
// -----------------------------------------------------------

function liveSearch(data) {


    function setList(group) {
        clearList()
        for (const person of group) {
            const item = document.createElement('li')
            item.classList.add('item')
            const text = document.createTextNode(person.name)
            item.appendChild(text)
            list.appendChild(item)
        }
        if (group.length === 0) {
            setNoResults()
        }

        //-----------------
        touchSpisok()
    }

    function clearList() {
        while (list.firstChild) {
            list.removeChild(list.firstChild)
        }
    }

    function setNoResults() {
        const item = document.createElement('li')
        item.classList.add('item')
        const text = document.createTextNode('No results found')
        item.appendChild(text)
        list.appendChild(item)
    }

    function getRelevancy(value, searchTerm) {
        if (value === searchTerm) {
            return 2
        }
        else if (value.startsWith(searchTerm)) {
            return 1
        }
        else if (value.includes(searchTerm)) {
            return 0
        }
        else {
            return -1
        }
    }

    // const searchInput = document.getElementById('search')

    searchInput.addEventListener('input', (event) => {
        img.src = ""
        infoDiv.innerHTML = ''
        let value = event.target.value
        if (value && value.trim().length > 0) {
            value = value.trim().toUpperCase()
            setList(data.filter(person => {
                return person.name.toUpperCase().includes(value)
            }).sort((personA, personB) => {
                return getRelevancy(personB.name, value) - getRelevancy(personA.name, value)
            }))
        }
        else {
            clearList()
        }
    })

    function touchSpisok() {
        let spisok = Array.from(document.querySelectorAll('.item'))
        spisok.forEach(el => {
            el.addEventListener('click', (e) => {
                // console.log(e.target.textContent)
                searchInput.value = e.target.textContent
                clearList()

            })
        })
    }
}

// -----------------------------------------------
liveSearch(country)
btn.addEventListener('click', () => {
    country.forEach(el => {
        // console.log(el.flag)
        if (searchInput.value === el.name) {
            img.src = el.media.flag

            //------------------
            let info = `
            <p>Abbreviation - ${el.abbreviation}<p>
                <p>Capital - ${el.capital}<p>
                <p>Currency - ${el.currency}<p>
                <p>Phone - ${el.phone}<p>
                <p>Population - ${el.population}<p>
            `
            infoDiv.innerHTML = info
        }
    })
    searchInput.value = ''
})
