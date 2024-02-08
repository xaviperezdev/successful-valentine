const MOVEMENT = {
    Y: {
        NEXT: 1,
        BUTTON: 100,
    },
    X: {
        NEXT: 2,
        BUTTON: 150,
    },
};

let startingBtnOffsets = { x: undefined, y: undefined };
let translate = { x: 0, y: 0 };

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const checkIsValidMovement = (position, offset, clientHeight) => {
    const errorMargin = (offset - 40) * -1;
    return position > errorMargin && position < clientHeight;
};

const moveButton = (element, axis) => {
    const nextMovement = randomIntFromInterval(1, 2);
    const { top, left } = element.getBoundingClientRect();

    let newTranslatePos = 0;
    let nextPlace = 0;

    if (axis === 'y') {
        newTranslatePos = nextMovement === MOVEMENT.Y.NEXT ? translate.y + MOVEMENT.Y.BUTTON : translate.y - MOVEMENT.Y.BUTTON;
        nextPlace = top + newTranslatePos;

        if (!checkIsValidMovement(nextPlace, nextMovement, startingBtnOffsets.y, document.body.clientHeight)) {
            newTranslatePos = nextMovement === MOVEMENT.Y.NEXT ? translate.y - MOVEMENT.Y.BUTTON : translate.y + MOVEMENT.Y.BUTTON;
        }

        translate.y = newTranslatePos;
    } else {
        newTranslatePos = nextMovement === MOVEMENT.X.NEXT ? translate.x + MOVEMENT.X.BUTTON : translate.x - MOVEMENT.X.BUTTON;
        nextPlace = left + newTranslatePos;

        if (!checkIsValidMovement(nextPlace, nextMovement, startingBtnOffsets.x, document.body.clientWidth)) {
            newTranslatePos = nextMovement === MOVEMENT.X.NEXT ? translate.x - MOVEMENT.X.BUTTON : translate.x + MOVEMENT.X.BUTTON;
        }

        translate.x = newTranslatePos;
    }

    element.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
};

const main = () => {
    const noBtn = document.querySelector('.btn.btn-no');

    startingBtnOffsets.x = noBtn.getBoundingClientRect().left;
    startingBtnOffsets.y = noBtn.getBoundingClientRect().top;

    noBtn.addEventListener('mouseenter', (ev) => {
        const randomMovement = randomIntFromInterval(1, 2);
        moveButton(ev.currentTarget, randomMovement % 2 === 0 ? 'x' : 'y');
    });

    noBtn.addEventListener('click', () => {
        console.log('a');
    });
};

document.addEventListener('DOMContentLoaded', main);
