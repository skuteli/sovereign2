class Agent {

constructor() {
    this.hp = 10;
    this.lifeID = setInterval(()=>{this.live()},
        100
        );
    return this;
}

die() {
    console.log("I'm dying! Aaaargh!")
    clearInterval(this.lifeID)
    let index = agents.indexOf(this);
    if (index > -1) {
        agents.splice(index, 1);
    } 
}

breed() {
    this.hp = this.hp-10
    if (Math.random() > 0.5)
    {agents.push(new Gatherer)}
    else
    {agents.push(new Hunter)}
}

updateState() {
    if (this.hp < 0) {
        this.die();
        return; 
    }
    else if (this.hp > 25) {
        this.breed()
    }
}

work() {
    console.log("I can't do anything:(")
}

updateStats() {
    this.work()
    this.hp--
}

live() {
    this.updateStats()
    this.updateState()
}
}

class Gatherer extends Agent {
    work() {
        this.hp = this.hp + 1.05;
    }
}

class Hunter extends Agent {
    work() {
        if (Math.random() > 0.95) {
        console.log("I caught something! Yay!");
        this.hp = this.hp + 21;
    }
    }
}


class Chieftain extends Agent {
    constructor() {
        console.log("I'm ALIVE!!!");
        super();
        this.tribe = agents;
        this.hp = 5;
    }
    work() {
        let sorted = this.tribe.slice().sort((first,second)=>{return first.hp-second.hp});
        let strongest = sorted[sorted.length-1];
        let weakest = sorted[0];
        strongest.hp = strongest.hp - 3;
        weakest.hp = weakest.hp+1.8;
        this.hp = this.hp+1.2;
    }
}