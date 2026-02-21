//lấy 5 phần tử đắt nhất (không sort)
const arr = [
    {
        name : 'lt9',
        price : 900
    },
    {
        name : 'lt10',
        price : 1400
    },
    {
        name : 'lt11',
        price : 1400
    },
    {
        name : 'lt1',
        price : 100
    },
    {
        name : 'lt2',
        price : 200
    },
    {
        name : 'lt3',
        price : 3100
    },
    {
        name : 'lt4',
        price : 400
    },
    {
        name : 'lt5',
        price : 5020
    },
    {
        name : 'lt6',
        price : 600
    },
    {
        name : 'lt7',
        price : 700
    },
    { 
        name : 'lt8',
        price : 800
    },
    
]

function getTopFive (arr) {
    const result = [];
    const set = [];
    let max_prev = 0;
    let object = {};
    let current_price = 0;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < arr.length; j++) {
            if ( arr[j].price > current_price ) {
                if (i != 0) {
                    if (arr[j].price >= max_prev && set[arr[j].name]) {
                        continue;
                    }
                }
                object = arr[j];
                current_price = arr[j].price;
            }
        }

        set[object.name] = {
            ...object
        };
        result.push(object);
        max_prev = current_price;
        current_price = 0;
    }

    return result
}

function getRank (arr = [], numberOfWinner = 0) {

    if (arr.length < numberOfWinner) 
        throw new Error('Invalid input: numberOfWinner should NOT be larger than arr length!');

    const result = [];
    const isInResult = [];
    
    for (var i = 0; i < numberOfWinner; i++) {
        let currentPrice = 0;
        let object = {};

        for (var j = 0; j < arr.length; j++) {
            const currentObject = arr[j];

            if (currentObject.price >= currentPrice && !isInResult[currentObject.name]) {
                object = currentObject;
                currentPrice = currentObject.price;
            }
        }

        isInResult[object.name] = true;
        result.push(object);
    }

    return result;
}

console.log(getRank(arr, 14))

