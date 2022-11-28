class Member {
    names = []

    add(name) { 
        this.names.push(name);
    }

    remove(name) {
        this.names = this.names.filter(nm => nm !== name);
    }

    list() {
        return this.names;
    }

    print() {
        console.log(this.names);
    }
}