class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        console.log(this.engine.storyData);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}


class Location extends Scene {

    static myKeys = false;
    
    create(key) {

        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body); 
        
        if(locationData.Choices != null) { 
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        
        if(choice) {
            if (choice.Key) {                                      
                this.engine.show("&gt; "+choice.Text);
                Location.myKeys = true;
                this.engine.show(choice.KeyText);              
            }                                                       
            if (choice.NeedsKey) {                 
                this.engine.show("&gt; "+choice.Text);
                if (Location.myKeys === true) {                      
                    this.engine.gotoScene(Location, choice.Target)  
                } else {                                         
                    this.engine.show(choice.LockedMessage);    
                    console.log("locked message");
                    this.engine.gotoScene(Location, choice.Target2)
                }
            }

            if (choice.Action === "touchTree") {
                this.engine.show("&gt; "+choice.Text); 
                this.touchTree();
                this.engine.gotoScene(Location, choice.Target);
            } else if (!choice.NeedsKey) {
                if (choice.Text != "Speak to Lucifer"){
                    this.engine.show("&gt; "+choice.Text);
                }
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }

    touchTree() {

        let RNG = Math.floor(Math.random() * 3);

        if(RNG == 0) { 
            this.engine.show("As you touch the tree, its bark weeps blood, and a hushed voice emerges from the sap: 'I was once a duke with vast lands and envy deeper than my vaults. In despair over lost power, I chose this fate. Guard your spirit against the dark allure of despair, for it leads only to this grim arboretum.'");
        } else if (RNG == 1){
            this.engine.show("As you touch the tree, its bark weeps blood, and a whispered lament fills the air: 'I am the echo of a poet who spurned life for unrequited love. My verses turned to sobs, and here I stand, rooted in sorrow. Learn, traveler, that no heartache justifies the forfeiture of the soul’s voyage.'")
        } else if (RNG == 2){
            this.engine.show("As you touch the tree, its bark weeps blood, and a soft moan seeps through the cracks: 'In life, I was a merchant, rich in coin but poor in joy. I traded my breath for silence, fleeing the tumult of life for the stillness of death. Beware, for the wealth of the world is fleeting, and despair is a costly purchase.'")
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');



