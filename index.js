const member = new Member();
const memberButton = document.querySelector('.members__button');
const memberList   = document.querySelector('.members__list');
const printButton = document.querySelector(".print__button");
const printList   = document.querySelector(".print__list");

function printMember() {
    const members = member.list();
    memberList.innerHTML = '';
    members.forEach(item => {
        const dom = createDom('div')
        const deleteButton = createDom('button', 'members__bel-button')
        deleteButton.innerText = '삭제';
        deleteButton.onclick = () => {
            member.remove(item);
            printMember();
        }
        dom.append(item, deleteButton);
        memberList.append(dom);
    })
}

memberButton.addEventListener('click', function() {
    const name = document.querySelector('.members__input').value;

    if(name !== "") {
        member.add(name);
    }

    printMember();
})

printButton.addEventListener('click', function() {
    const members = member.list();
    printList.innerText = '';
    members.forEach(member => {
        const dom = document.createElement('div');
        dom.innerText = `${member}의 상위는 [${randomHighUnit()}]`;
        printList.append(dom);
    })
})