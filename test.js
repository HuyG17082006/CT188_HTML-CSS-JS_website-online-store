

const arrr = [];

arrr['1'] = {
    id : '1',
    name : 'Le Huynh Dat Huy'
}
const id = crypto.randomUUID();
arrr[id] = {
    id : id,
    name : 'Le Huynh Dat Huy2'
}

console.log(arrr.length)

console.table(arrr)

console.log(arrr['2'])


console.log('---------------------------');

let person = arrr['2'];
person = {
    ...person,
    name : 'Huy Le'
}
arrr[person.id] = person

console.log(arrr['2'])