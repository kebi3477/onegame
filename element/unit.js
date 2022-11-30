class UnitDOM extends HTMLElement {
    unit = new Unit();

    constructor(props) {
        super(props);
        this.render();
        this.setEvent();
        this.classList.add('ord__lottery--contents');
    }

    pickUnit() {
        const members = document.querySelectorAll('.ord__lottery--player');
        const wrapper = this.querySelector('.ord__lottery--list');
        
        wrapper.textContent = '';
        members.forEach(member => {
            member = member.textContent;
            const character = this.unit.getRandom();
            const item = util.createDom('div', 'ord__lottery--item');
            const player = util.createDom('span', 'ord__lottery--item-player');
            const thumbnail = util.createDom('div', 'ord__lottery--profile');
            const img = util.createDom('img');
            const name = util.createDom('span', 'ord__lottery--name');
            const type = util.createDom('span', 'ord__lottery--type', character.alpha);
    
            player.textContent = member;
            name.textContent = character.name;
            img.alt = character.name;
            img.src = character.image;
            type.textContent = character.type;
    
            item.append(player, thumbnail, name, type);
            thumbnail.append(img);
            wrapper.append(item);
        })
    }

    jackpot() {
        const jackpot = setInterval(() => {
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
            <div class="ord__lottery--list">
                
            </div>
        `;
    }
}