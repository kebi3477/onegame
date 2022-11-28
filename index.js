const member = new Member();
const unit = new Unit();
const util = new Util();
let cnt = 0;   
const appendButton = document.querySelector('.ord__lottery--append-btn');
const radnomButton = document.querySelector('.ord__lottery--random-btn');

function printMember() {
    const members = member.list();
    const wrapper = document.querySelector('.ord__lottery--players');
    const name = document.querySelector('.ord__lottery--append-input')

    wrapper.textContent = '';
    name.value = '';

    members.forEach(item => {
        const dom = util.createDom('div')
        dom.onclick = () => {
            member.remove(item);
            printMember();
        }
        dom.append(item);
        wrapper.append(dom);
    });
}

function pickUnit() {
    const members = member.list();
    const wrapper = document.querySelector('.ord__lottery--list');
    wrapper.textContent = '';
    members.forEach(member => {
        const character = unit.getRandom();
        const item = document.createElement('div');
        const player = document.createElement('span');
        const thumbnail = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('span');
        const type = document.createElement('span');

        item.classList.add('ord__lottery--item');
        player.classList.add('ord__lottery--player');
        thumbnail.classList.add('ord__lottery--profile');
        name.classList.add('ord__lottery--name');
        type.classList.add('ord__lottery--type');

        player.textContent = member;
        name.textContent = character.name;
        img.alt = character.name;
        img.src = character.image;
        type.textContent = character.type;
        type.classList.add(character.alpha); // css 참고

        item.append(player, thumbnail, name, type);
        thumbnail.append(img);
        wrapper.append(item);
    })
}

appendButton.addEventListener('click', function() {
    const input = document.querySelector('.ord__lottery--append-input');

    if(input.value !== "") {
        member.add(input.value);
    }

    printMember();
    input.value = "";
})


radnomButton.addEventListener('click', function() {
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