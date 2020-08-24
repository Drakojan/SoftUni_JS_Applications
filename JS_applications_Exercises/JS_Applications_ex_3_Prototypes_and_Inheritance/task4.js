function solve() {
    
    class Melon{

        constructor(weight, melonSort) {

            if (new.target === Melon) {
                throw new Error('Abstract class cannot be instantiated directly.')
            }

            this.weight =  weight;
            this.melonSort = melonSort;
            this._elementIndex = this.weight*this.melonSort.length;

        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString(){
            
            return `Element: ${this.constructor.name.slice(0,-5)}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`
        }
    }

    class Watermelon extends Melon{

        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon{

        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon{

        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon{

        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon{

        constructor(weight, melonSort) {
            super(weight, melonSort);

            this.elements =['Water','Fire','Earth','Air']
            this.currentElement = this.elements[0];
        }

        morph(){

            let rotatedElement = this.elements.shift();
            this.elements.push(rotatedElement);
            this.currentElement = this.elements[0];
        }

        toString(){
            
            return `Element: ${this.currentElement}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`
        }
    }

    

    // let watermelon = new Watermelon(12.5, "Kingsize");
    // console.log(watermelon.toString());

    // let watermelon2 = new Melolemonmelon(12.5, "Kingsize");

    // watermelon2.morph();

    // console.log(watermelon2.toString());

    return {Melon, Watermelon,Airmelon,Firemelon,Earthmelon,Melolemonmelon}
}
let classes = solve();

let fr = new classes.Watermelon()
console.log(fr);