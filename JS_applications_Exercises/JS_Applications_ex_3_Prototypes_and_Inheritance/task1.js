function solve() {
    class Balloon {

        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight=gasWeight;
        }
    }
    
    class PartyBalloon extends Balloon{
    
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            this.ribbonColor=ribbonColor;
            this.ribbonLength=ribbonLength;

        }   


        get ribbon() {
            return {
                color: this.ribbonColor,
                length: this.ribbonLength
            };    
        }  
 
    }
    
    class BirthdayBalloon extends PartyBalloon{
    
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);
            
            this._text=text;
        }

        get text() {
            return this._text;
        }
        
    }

    let b1 = new BirthdayBalloon(1,2,3,4,5);

    b1._text=22;
    console.log(b1.text);

    return{
        Balloon:Balloon,
        PartyBalloon:PartyBalloon,
        BirthdayBalloon:BirthdayBalloon
    }

}
    
solve();

