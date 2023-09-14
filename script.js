const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.memory-card');
const message = document.querySelector("#finalMessage");
const front = document.querySelectorAll(".front-face");
const container0 = document.querySelector(".container0");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const container3 = document.querySelector(".container3");
const container4 = document.querySelector(".container4");
const correct1 = document.getElementById("correctContainer1");
const correct2 = document.getElementById("correctContainer2");
const correct3 = document.getElementById("correctContainer3");
const correct4 = document.getElementById("correctContainer4");
const msg = document.getElementById("message")


const correctCards = {
    container1: 0,
    container2: 0,
    container3: 0,
    container4: 0
};

container1.appendChild(correct1);
container2.appendChild(correct2);
container3.appendChild(correct3);
container4.appendChild(correct4);

function updateResults() {
    correct1.innerHTML = `Ați introdus corect <span class="correct">${correctCards.container1}/6</span> cuvinte`;
    correct2.innerHTML = `Ați introdus corect <span class="correct">${correctCards.container2}/6</span> cuvinte`;
    correct3.innerHTML = `Ați introdus corect <span class="correct">${correctCards.container3}/6</span> cuvinte`;
    correct4.innerHTML = `Ați introdus corect <span class="correct">${correctCards.container4}/6</span> cuvinte`;
    if (correctCards.container1 === 6 &&
        correctCards.container2 === 6 &&
        correctCards.container3 === 6 &&
        correctCards.container4 === 6) {
        document.getElementById("message").style.visibility = "visible";

    }

}




function checkCorrectCards() {

    correctCards.container1 = 0;
    correctCards.container2 = 0;
    correctCards.container3 = 0;
    correctCards.container4 = 0;

    cards.forEach((card) => {
        if (card.parentElement === container1 && card.dataset.framework === "img1") {
            correctCards.container1++;
        } else if (card.parentElement === container1 && card.dataset.framework === "img2") {
            correctCards.container1++;
        } else if (card.parentElement === container1 && card.dataset.framework === "img3") {
            correctCards.container1++;
        } else if (card.parentElement === container1 && card.dataset.framework === "img4") {
            correctCards.container1++;
        } else if (card.parentElement === container1 && card.dataset.framework === "img5") {
            correctCards.container1++;
        } else if (card.parentElement === container1 && card.dataset.framework === "img6") {
            correctCards.container1++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img7") {
            correctCards.container2++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img8") {
            correctCards.container2++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img9") {
            correctCards.container2++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img10") {
            correctCards.container2++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img11") {
            correctCards.container2++;
        } else if (card.parentElement === container2 && card.dataset.framework === "img12") {
            correctCards.container2++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img13") {
            correctCards.container3++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img14") {
            correctCards.container3++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img15") {
            correctCards.container3++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img16") {
            correctCards.container3++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img17") {
            correctCards.container3++;
        } else if (card.parentElement === container3 && card.dataset.framework === "img18") {
            correctCards.container3++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img19") {
            correctCards.container4++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img20") {
            correctCards.container4++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img21") {
            correctCards.container4++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img22") {
            correctCards.container4++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img23") {
            correctCards.container4++;
        } else if (card.parentElement === container4 && card.dataset.framework === "img24") {
            correctCards.container4++;
        }
    });
    updateResults();


}



cards.forEach((card) => {
    card.addEventListener("dragend", checkCorrectCards);
});

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })

})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element

}



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;


    // checkForMatch();

}

// function checkForMatch() {
//     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

//     isMatch ? disableCards() : unflipCards();

//     let allFlipped = true;
//     cards.forEach(card => {
//         if (!card.classList.contains('flip')) {
//             allFlipped = false;
//         }
//     });
//     if (allFlipped) {
//         message.classList.remove('hidden');
//     }
// }


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    setTimeout(() => {
        // set background color to green after 5 seconds
        front.style.background = 'green';
    }, 2000);
}


function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        card.style.order = Math.floor(Math.random() * 12);
    });

    message.classList.add('hidden');
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragover', dragOver);
    card.addEventListener('drop', drop);
});



