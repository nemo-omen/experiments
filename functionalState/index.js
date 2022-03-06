const state = key => value => ({[key]: value});

const peopleKey = state('people');

const peopleStore = peopleKey({name: 'Mary'});

peopleKey({name: 'Jeff'});

console.log(peopleStore);