function solve(order) {

    let availableEngines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ]

    let result = {};

    result.model = order.model;
    result.engine = availableEngines.find((x)=> x.power>=order.power);
    result.carriage ={type: order.carriage, color: order.color }

    if (order.wheelsize%2===0) {
        order.wheelsize-=1;
    }

    result.wheels = Array(4).fill(order.wheelsize)

    return result;
}


let order = { model: 'Opel Vectra',
power: 110,
color: 'grey',
carriage: 'coupe',
wheelsize: 17 }
;

console.log(solve(order));
  