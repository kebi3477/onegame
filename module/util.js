class Util {
    createDom(tag, ...className) {
        const dom = document.createElement(tag);
        dom.classList.add(...className);
        return dom;
    }

    getTypeByENG(ko) {
        let eng = '';

        switch(ko) {
            case "히든":
                eng = 'hi';
                break;
            case "초월":
                eng = 'tr';
                break;
            case "불멸":
                eng = 'im';
                break;
            case "영원":
                eng = 'et';
                break;
            case "제한":
                eng = 'lm';
                break;
            case "랜덤":
                eng = 'rd';
                break;
        }
        
        return eng;
    }

    getAttackByENG(ko) {
        let eng = '';

        switch(ko) {
            case "물리":
                eng = 'ad';
                break;
            case "마법":
                eng = 'ap';
                break;
        }
        
        return eng;
    }
}