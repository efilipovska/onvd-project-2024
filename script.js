// Button text change
let isTextChanged = false;
function changeButtonText() {
    let button = document.getElementById('intro_btn');

    if (isTextChanged) {
        button.textContent = 'Прикажи повеќе!';
    }
    else {
        button.textContent = 'Назад...';
    }

    isTextChanged = !isTextChanged;
}


// Search tutor
const tutors = [
    { name: "проф. д-р Андреј Атанасоски", modalId: "#andrej" },
    { name: "проф. д-р Богдан Богдановски", modalId: "#bogdan" },
    { name: "проф. д-р Весна Ветерова", modalId: "#vesna" },
    { name: "проф. д-р Далибор Дабровски", modalId: "#dalibor" },

    { name: "проф. д-р Ана Антевска", modalId: "#ana" },
    { name: "проф. д-р Бојан Бојановски", modalId: "#bojan" },
    { name: "роф. д-р Дејан Дејановски", modalId: "#dejan" },
    { name: "проф. д-р Горан Гордевски", modalId: "#goran" },
    { name: "проф. д-р Евгенија Ефтимова", modalId: "#evgenija" },

    { name: "проф. д-р Зорица Здравеска", modalId: "#zorica" },
    { name: "проф. д-р Иван Иванов", modalId: "#ivan" },
    { name: "проф. д-р Јана Јаневска", modalId: "#jana" },
    { name: "проф. д-р Коста Костадиновски", modalId: "#kosta" },
    { name: "проф. д-р Лора Лорадиновска", modalId: "#lora" },

    { name: "проф. д-р Маја Мајановска", modalId: "#maja" },
    { name: "проф. д-р Ненад Неделковски", modalId: "#nenad" },
    { name: "проф. д-р Оливија Олева", modalId: "#olivija" },

    { name: "проф. д-р Петар Петровски", modalId: "#petar" },
    { name: "проф. д-р Рената Ристова", modalId: "#renata" },
    { name: "проф. д-р Соња Сотирова", modalId: "#sonja" }
];

function findTutor() {

    let input = document.getElementById('search').value.toLowerCase();
    let tutorResult = document.getElementById('result');
    let notFoundMessage = document.getElementById('not_found');

    tutorResult.innerHTML = '';
    notFoundMessage.style.display = 'none';

    if (input.trim() === '') {
        tutorResult.classList.remove('show');
        return;
    }

    let matchingTutors = tutors.filter(tutor => tutor.name.toLowerCase().includes(input));

    if (matchingTutors.length > 0) {
        matchingTutors.forEach(foundTutor => {
            const tutorImage = foundTutor.modalId.substring(1);
            tutorResult.innerHTML += `
                <button type="button" class="profile_icons" data-bs-toggle="modal" data-bs-target="${foundTutor.modalId}">
                    <img src = "images/profile_icons/${tutorImage}.png" alt = "PNG">
                    <span>${foundTutor.name}</span>
                </button>
            `;
        });
        tutorResult.classList.add('show');
    }
    else {
        notFoundMessage.style.display = 'block';
        tutorResult.classList.remove('show');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById('search');
    if (searchBar) {
        searchBar.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                findTutor();
            }
        });
    }
});


// Sort tutors
document.addEventListener("DOMContentLoaded", function() {
    const tutorsContainer = document.querySelector('.tutors');
    const sortLowToHigh = document.getElementById('sortLH');
    const sortHighToLow = document.getElementById('sortHL');

    function sortTutors (order) {
        const tutors = Array.from(tutorsContainer.children);

        tutors.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return order === 'lowToHigh' ? priceA - priceB : priceB - priceA;
        });

        tutorsContainer.innerHTML = '';
        tutors.forEach(tutor => tutorsContainer.appendChild(tutor));
    }

    sortLowToHigh.addEventListener('click', () => sortTutors('lowToHigh'));
    sortHighToLow.addEventListener('click', () => sortTutors('highToLow'));
});


// Filter tutors
document.addEventListener("DOMContentLoaded", function() {
    const tutorsContainer = document.querySelector('.tutors');
    const tutorButtons = tutorsContainer.children;

    const filterAll = document.getElementById('all');
    const filterOnline = document.getElementById('online');
    const filterInPerson = document.getElementById('person');
    const filterBoth = document.getElementById('both');
    const noMatchesMessage = document.getElementById('no_matches');

    function filterTutors(mode) {
        let matchesFound = false;

        for (let i = 0; i < tutorButtons.length; i++) {
            const tutor = tutorButtons[i];
            const tutorMode = tutor.getAttribute('data-mode');

            if (mode === 'all' || tutorMode === mode || tutorMode === 'both') {
                tutor.style.display = '';
                matchesFound = true;
            } else {
                tutor.style.display = 'none';
            }
        }

        if (matchesFound) {
            noMatchesMessage.style.display = 'none';
        } else {
            noMatchesMessage.style.display = 'block';
        }
    }

    filterAll.addEventListener('click', () => filterTutors('all'));
    filterOnline.addEventListener('click', () => filterTutors('online'));
    filterInPerson.addEventListener('click', () => filterTutors('person'));
    filterBoth.addEventListener('click', () => filterTutors('both'));
});
