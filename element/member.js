class MemberDOM extends HTMLElement {
    member = new Member();

    constructor(props) {
        super(props);
        this.render();
        this.setEvent();
        this.classList.add('ord__lottery--function');
    }

    add(name) {
        this.member.add(name);
        this.print();
    }

    remove(name) {
        this.member.remove(name);
        this.print();
    }
    
    clear() {
        this.querySelector('.ord__lottery--players').textContent = '';
    }

    print() {
        this.clear();
        const members = this.member.list();
        const wrapper = this.querySelector('.ord__lottery--players');
        const name = this.querySelector('.ord__lottery--append-input');

        wrapper.textContent = '';
        name.value = '';

        members.forEach(item => {
            const dom = util.createDom('div', 'ord__lottery--player')
            dom.onclick = () => this.remove(item)
            dom.append(item);
            wrapper.append(dom);
        });
    }

    addEvent() {
        const name = this.querySelector('.ord__lottery--append-input').value;
        this.add(name);
    }

    setEvent() {
        this.querySelector('.ord__lottery--append-btn').onclick = () => this.addEvent();
        this.querySelector('.ord__lottery--append-input').onkeydown = e => { e.keyCode === 13 && this.addEvent() };
    }

    render() {
        this.innerHTML = `
            <div class="ord__lottery--players"></div>
            
            <div class="ord__lottery--append">
                <input class="ord__lottery--append-input" type="text" placeholder="사용자 입력" />
                <button class="ord__lottery--append-btn">추가</button>
            </div>

            <div class="ord__lottery--random-btn">추첨</div>
        `;
    }
}