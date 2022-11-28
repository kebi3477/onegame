function createDom(tag, ...className) {
    const dom = document.createElement(tag);
    dom.classList.add(...className);
    return dom;
}