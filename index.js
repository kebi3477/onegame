const member = new Member();
const memberButton = document.querySelector('.ord__lottery--append-btn');
const radnomButton = document.querySelector('.ord__lottery--random-btn');

function printMember() {
    const members = member.list();
    const wrapper = document.querySelector('.ord__lottery--players');
    const name = document.querySelector('.ord__lottery--append-input')

    wrapper.textContent = '';
    name.value = '';

    members.forEach(item => {
        const dom = createDom('div')
        dom.onclick = () => {
            member.remove(item);
            printMember();
        }
        dom.append(item);
        wrapper.append(dom);
    })
}

memberButton.addEventListener('click', function() {
    const name = document.querySelector('.ord__lottery--append-input').value;

    if(name !== "") {
        member.add(name);
    }

    printMember();
})

radnomButton.addEventListener('click', function() {
    const members = member.list();
    const wrapper = document.querySelector('.ord__lottery--list');
    members.forEach(member => {
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
        name.textContent = randomHighUnit();
        img.alt = randomHighUnit();
        img.src = '#';
        type.textContent ='등급';
        type.classList.add('im'); // css 참고

        item.append(player, thumbnail, name, type);
        thumbnail.append(img);
        wrapper.append(item);
    })
})