function solve(){

let myObj = {
    __proto__: {},
    extend: function (template) {

        Object.keys(template).forEach(element => {
            
            if (typeof template[element] === 'function') {
            
                this.__proto__[element]= template[element];
            }
            else{
                this[element]=template[element];
            }
        });;

    }
  }

  return myObj;
      
}

let alabala = solve();

console.log(alabala);

let template = {
    extensionMethod: function (a) {return a+4},
    extensionProperty: 'someString'
}

// console.log(template.keys());
  
alabala.extend(template);

console.log(alabala);
console.log(alabala.__proto__);