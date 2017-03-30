function assert(exp) {
    console.assert(exp);
}

function assertElement(selector) {
    console.assert(document.querySelector(selector) !== null);
}

function assertNoElement(selector) {
    console.assert(document.querySelector(selector) === null);
}