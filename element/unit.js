class UnitDOM extends HTMLElement {
    unit  = new Unit();
    typies = [ "초월", "불멸", "영원", "제한", "랜덤" ];

    constructor(props) {
        super(props);
        this.render();
        this.setEvent();
        this.classList.add('ord__lottery--contents');
    }
    
    setTypiesDOM() {
        this.typies.forEach(type => {
            const dom = util.createDom('label', 'ord__lottery--select-type');
            const box = util.createDom('div', 'ord__lottery--select-box')
            const checkbox = util.createDom('input', 'ord__lottery--select-input');

            checkbox.setAttribute('id', `ord__lottery-${util.getTypeByENG(type)}`)
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('value', util.getTypeByENG(type));
            checkbox.setAttribute('checked', true);
            dom.setAttribute('for', `ord__lottery-${util.getTypeByENG(type)}`);
            dom.append(checkbox, box, ` ${type}`);

            this.querySelector(".ord__lottery--select-typies").append(dom);
        })
    }

    getSelectedTypies() {
        const typies = [];
        this.querySelectorAll('.ord__lottery--select-input:checked').forEach(input => {
            typies.push(input.value);
        })
        return typies;
    }

    pickUnit() {
        const members = document.querySelectorAll('.ord__lottery--player');
        const wrapper = this.querySelector('.ord__lottery--list');
        
        wrapper.textContent = '';
        members.forEach(member => {
            const character = this.unit.getRandom(this.getSelectedTypies());
            const item = util.createDom('div', 'ord__lottery--item');
            const header = util.createDom('div', 'ord__lottery--item-header');
            const contents = util.createDom('div', 'ord__lottery--item-contents');
            const characherImg = util.createDom('img', 'ord__lottery--characher-img');
            const player = util.createDom('span', 'ord__lottery--item-player');
            const thumbnail = util.createDom('div', 'ord__lottery--profile');
            const img = util.createDom('img');
            const name = util.createDom('span', 'ord__lottery--name');
            const info = util.createDom('div', 'ord__lottery--info');
            const type = util.createDom('span', 'ord__lottery--type', character.alpha);
            const attack = util.createDom('span', 'ord__lottery--attack', character.beta);

            member = member.textContent;
            characherImg.alt = character.name;
            characherImg.src = character.characterImage;
            img.alt = character.name;
            img.src = character.unitImage;
            player.textContent = member;
            name.textContent = character.name;
            attack.textContent = character.attack;
            type.textContent = character.type;

            item.append(header, contents);
            header.append(characherImg, player, thumbnail);
            contents.append(name, info);
            info.append(attack, type)
            thumbnail.append(img);
            wrapper.append(item);
        })
    }

    jackpot() {
        const jackpot = setInterval(() => {
            if(this.getSelectedTypies().length === 0) {
                alert('타입을 선택해주세요.');
                clearInterval(jackpot);
                return;
            }

            this.count += 1;
            if(this.count <= 30) {
                this.pickUnit();
            } else if(this.count > 30 && this.count <= 60 && this.count % 5 === 0) {
                this.pickUnit();
            } else if(this.count > 60 && this.count <= 100 && this.count % 10 === 0) {
                this.pickUnit();
            } else if(this.count <= 180 && this.count % 20 === 0){
                this.pickUnit();
            }
            
            if(this.count > 210) {
                this.pickUnit();
                clearInterval(jackpot);
            }
        }, 30);
    }

    jackpotEvent() {
        this.count = 0;  
        this.jackpot();
    }

    setEvent() {
        document.querySelector('.ord__lottery--random-btn').onclick = () => this.jackpotEvent();
    }
    
    render() {
        this.innerHTML = `
            <div class="ord__lottery--function">
                <div class="ord__lottery--select-typies"></div>
                <div class="ord__lottery--random-btn">추첨</div>
            </div>
            <div class="ord__lottery--lists">
                <div class="ord__lottery--list"></div>
            </div>
        `;
        this.setTypiesDOM();
    }
}