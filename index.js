const member = new Member();
const unit = new Unit();
const util = new Util();
const memberButton = document.querySelector('.members__button');
const memberList   = document.querySelector('.members__list');
const printButton = document.querySelector(".print__button");
const printList   = document.querySelector(".print__list");
let cnt = 0;   

function printMember() {
    const members = member.list();
    memberList.innerHTML = '';
    members.forEach(item => {
        const dom = util.createDom('div')
        const deleteButton = util.createDom('button', 'members__bel-button')
        deleteButton.innerText = '삭제';
        deleteButton.onclick = () => {
            member.remove(item);
            printMember();
        }
        dom.append(item, deleteButton);
        memberList.append(dom);
    })
}

function pickUnit() {
    const members = member.list();
    printList.innerText = '';
    members.forEach(member => {
        const character = unit.getRandom();
        const dom = util.createDom('div');
        const img = util.createDom('img');

        img.src = character.image;

        dom.innerText = `${member}의 상위는 [${character.name + " " + character.type}]`;
        dom.append(img);
        printList.append(dom);
    })
}

memberButton.addEventListener('click', function() {
    const input = document.querySelector('.members__input');

    if(input.value !== "") {
        member.add(input.value);
    }

    printMember();
    input.value = "";
})


printButton.addEventListener('click', function() {
    cnt = 0;      
    const jackpot = setInterval(() => {
        cnt += 1;
        if(cnt <= 30) {
            pickUnit();
        } else if(cnt > 30 && cnt <= 60 && cnt % 5 === 0) {
            pickUnit();
        } else if(cnt > 60 && cnt <= 100 && cnt % 10 === 0) {
            pickUnit();
        } else if(cnt <= 180 && cnt % 20 === 0){
            pickUnit();
        }
        
        if(cnt > 210) {
            pickUnit();
            clearInterval(jackpot);
        }
    }, 30);
})