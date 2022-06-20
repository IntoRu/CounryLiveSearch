const searchInput = document.getElementById('search')
const list = document.getElementById('list')
let btn = document.querySelector('button')
let div = document.querySelector('div')
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

    //---------------------------

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

liveSearch(country)
btn.addEventListener('click', () => {
    country.forEach(el => {
        // console.log(el.flag)
        if (searchInput.value === el.name) {
            div.innerHTML = el.flag
        }
    })
    searchInput.value = ''
})
