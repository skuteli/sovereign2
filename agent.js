class Agent {

    constructor() {
        this.hp = 15;
        this.trainingTreshold = 0;
        this.trainingPoints =0;
        this.state = StateMachine.create({
          initial: "training",
          events: [
          { name: 'finishTraining',  from: 'training',  to: 'idle' },
          { name: 'goToWork', from: 'idle', to: 'working'    },
          { name: 'goIdle',  from: 'working',    to: 'idle' }
          ]});
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
        else if (this.state.current != "training" && this.hp > 17) { //fundakurwamentalne
            this.breed()
        }

        if (this.state.current == "working")   { this.work()      }
        else if (this.state.current == "idle") { this.findWork()  }
        else if (this.state.current == "training") { this.train() }
    }

    findWork() {
        console.log("I can't find work cause i don't know how to work:(")
    }
    train() {
        if (this.trainingPoints>this.trainingTreshold) this.state.finishTraining();
        this.trainingPoints++
    }
    work() {
        console.log("I can't do anything:(")
    }

    updateStats() {
        this.hp--
    }

    live() {
        this.updateStats()
        this.updateState()
    }
}

class Gatherer extends Agent {
    constructor() {
        super();
        this.trainingTreshold = 10;
    }
    work() {
        this.hp = this.hp + 1.1;
    }
        findWork() {
            // TODO: find asset
            this.state.goToWork()
    }
}

class Hunter extends Agent {
    constructor() {
        super();
        this.trainingTreshold = 20;
    }
    work() {
        if (Math.random() > 0.95) {
            console.log("I caught something! Yay!");
            this.hp = this.hp + 24;
        }
    }
            findWork() {
            // TODO: find asset
            this.state.goToWork()
    }
}


class Chieftain extends Agent {
    constructor() {
        console.log("I'm ALIVE!!!");
        super();
        this.tribe = agents;
        this.hp = 15;
        this.trainingTreshold = 10;
    }
            findWork() {
            // TODO: find asset
            this.state.goToWork()
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