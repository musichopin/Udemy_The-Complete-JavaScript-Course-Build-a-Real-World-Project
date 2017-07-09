/////////////////////////////////
// Lecture: let and const

/*
// 1a
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6); // **error cause name6 is constant**


// 1b
// ES5
function driversLicence5(passedTest) {
    
    if (passedTest) {
        console.log(firstName); // not error, undefined var
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    
    
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);


// ES6
function driversLicence6(passedTest) {
    
    console.log(firstName); // **gives error**
    let firstName;
    const yearOfBirth = 1990; // *consts are more strict*

    if (passedTest) {
        firstName = 'John';
    }
    
    // **es6 vars are block scoped, not function scoped**
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);


// 1c
let i = 23;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
// **prints 23**
*/



/////////////////////////////////
// Lecture: Blocks and IIFEs

/*
// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

console.log(a + b); // **gives error
// since vars are block based no need for self executing anonymous functions
console.log(c); // works since its not let**


// ES5
(function() {
    var d = 3;
})();

console.log(d); // *gives error*
*/



/////////////////////////////////
// Lecture: Strings

/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j')); // false
console.log(n.endsWith('th')); // true
console.log(n.includes(' ')); // true
console.log((firstName + " ").repeat(5)); // John John John John John
console.log(`${firstName} `.repeat(5)); // John John John John John 
console.log(`${n} `.repeat(5));
// John Smith John Smith John Smith John Smith John Smith 
*/


/////////////////////////////////
// Lecture: Arrow functions

/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);

ages5 = years.map(function(el, index) {
    return "Age element " + (index + 1) + ": " + (2016 - el) + ".";
});
console.log(ages5);

ages5 = years.map(function(el, index) {
    const now = new Date().getFullYear();
    const age = now - el;
    return "Age element " + (index + 1) + ": " + age + ".";
});
console.log(ages5);


// ES6
// **single arg with single line of code which is simplest form.
// note that we don't use semicolon where we return or log**
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

// **multiple args (or no args) with single line of code which uses paranthesis**
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

// **multiple args with multiple lines of codes which uses curly braces 
// and return kw (if we return)**
ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/


/////////////////////////////////
// Lecture: Arrow functions 2

/*
// ES5
// 1st ex
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
       
       // **if we didn't reference this kw it would point to global window
       // object within callback function and it would print:
       // this is box number undefined and it is undefined**
       var self = this; 

       document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
box5.clickMe();


// ES6
// **functions in es6 share the surrounding this kw**
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


// ES6
// **if we use 2 arrow functions like so, this kw wud be global object
// and it wud print, this is box number undefined and it is undefined**
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
// box66.clickMe();



// 2nd ex
function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this));
    // **instead of referencing this kw we created a copy of
    // anonymous function describing this kw as local object**
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);


// ES6 
// **also works despite having 2 arrow functions
// (wud also work if method was attached to prototype property)**
function Person(name) {
    this.name = name;
    this.myFriends5 = (friends) => {
    
    var arr = friends.map((el) => 
        this.name + ' is friends with ' + el
    );
    // **instead of referencing this kw we created a copy of
    // anonymous function describing this kw as local object**
    
    console.log(arr);
    }
}
new Person('Mike').myFriends6(friends);
*/

/////////////////////////////////
// Lecture: Destructuring

/*
// ES5
var john = ['John', 26];
var name1 = john[0];
var age1 = john[1];


// ES6
// 1 destructering array
const [name, age] = ['John', 26];
console.log(name);
console.log(age);


// 2 destructering object
const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

// destructering object with same variable names
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

// destructering object with different variable names
const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);


// es6
// 3
// returning values with array
function calcAgeRetirementt(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}


const [age2, retirement] = calcAgeRetirementt(1990);
console.log(age2);
console.log(retirement);


// returning values with object
function calcAgeRetirement(year) {
    var age3 = new Date().getFullYear() - year;
    return {age3, retirement2: 65 - age3};
}


const {age3, retirement2} = calcAgeRetirement(1990);
console.log(age3);
console.log(retirement2);
*/



/////////////////////////////////
// Lecture: Arrays

/*
const boxes = document.querySelectorAll('.box');

// ex1: converting nodelist to array
//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
// **aslında boxes.forEach() deyince de çalıştı**
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes); //transforms nodelist to array
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


// ex2: using loops
//ES5
// **we cannot use break or continue statements with forEach and map methods**
for(var i = 0; i < boxesArr5.length; i++) {
    
    if(boxesArr5[i].className === 'box blue') {
        continue;
    }
    
    boxesArr5[i].textContent = 'I changed to blue!';
    
}


//ES6
for (const cur of boxesArr6) {
    // *alt: if (cur.className === 'box blue')*
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}


// ex3: alternative to indexOf
var ages = [12, 17, 8, 21, 14, 11];

//ES5
var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
// *kind of like forEach() method*
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/



/////////////////////////////////
// Lecture: Spread operator
// **amaç array parçalamak**
/*
// ex1
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

//ES6 
// *destructering ile spreading arasındaki farkı gör:*
const [a, b, c, d] = ages;
const sum4 = addFourAges(a, b, c, d);
console.log(sum4);

//ES6
console.log(...ages);
// prints, 18 30 12 21

//ES6
console.log([...ages]); // anlamsız
// prints, Array [ 18, 30, 12, 21 ]


// ex2
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);


// ex3: *Spread operator might also be used for nodelists*
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'orange');
*/


/////////////////////////////////
// Lecture: Rest parameters
// **amaç array meydana getirmek**
/*
// ex1
// **spread operator is used in function call whereas 
// rest parameter is used in function declaration**
//ES5
function isFullAge5() {
    //**arguments is array like object composed of arguments passed**
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
    })
}

isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(...years) {
    years.forEach(cur => console.log( (2016 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 2016, 1987);

// **using both spread operator and rest parameters**
var arr = [1990, 1999, 1965, 2016, 1987];
isFullAge6(...arr);


// **ex2**
//ES5
function isFullAge5(limit) {
    var argsArr = Array.prototype.slice.call(arguments, 1);
    // **starts to copy from the 2nd index since 1st parameter is limit**

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
        // *limit için closure'dan yararlanılır (?)*
    })
}

isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
function isFullAge6(limit, ...years) {
    years.forEach(cur => console.log( (2016 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);
*/



/////////////////////////////////
// Lecture: Default parameters

/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish');
*/




/////////////////////////////////
// Lecture: Maps

/*
// **maps are better than objects to create hash maps because, we can use 
// numbers and booleans as keys as well, we can iterate maps, its
// easy to get the size of the map using the size property, we can easily 
// add and remove data from map**
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

//console.log(question.size);

// if(question.has(4)) {
//     question.delete(4);
//     console.log('Answer 4 is here')
// }

//question.clear();

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));


// **mini program**
console.log(question.get('question'));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}
// alt using foreach loop:
// question.forEach((value, key) => {
//     if (typeof(key) === 'number') {
//         console.log(`This is ${key}, and it's set to ${value}`)
//     }
// });   

const ans = parseInt(prompt('Write the correct answer'));

// **bu kısımda booleanın key olarak atanmasının önemi ortaya çıkıyor**
console.log(question.get(ans === question.get('correct')));
*/



/////////////////////////////////
// Lecture: Classes

/*
//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

john5.calculateAge();


//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    
    // static methods are attached to the class but not inherited by the class instances
    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

john6.calculateAge();
Person6.greeting();
*/


/////////////////////////////////
// Lecture: Classes and subclasses

/*
// **with inheritance one object access another object's methods and properties**

//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

// **we want prototype of the Athlete to be prototype of Person**
Athlete5.prototype = Object.create(Person5.prototype);
// **order matters: we first set athlete5 prototype property and then
// add methods to that prototype property**
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();


// var personProto = {
//     calculateAge: function() {
//         console.log(2016 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
// const person = new Person6('John', 1990, 'swimmer');

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
*/


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of parks (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/


class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    static calc(arr) {
        const sum = arr.reduce((prev, cur) => prev + cur);
        return [sum, sum / arr.length];
    }
}


class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }
    
    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }

    static moreTrees(p) {
        // **we made method chaining. used findIndex() instead of find().
        // (index'ten yola çıkarak objenin ismini bulduk)**
        const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
        console.log(`${p[i].name} has more than 1000 trees.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    // *static methodlar prototype'da gözükmez*
    static mapBuilder() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        return classification;
    }
    
    classifyStreet (classification) {
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}


// **since we store our objects in array, no need to assign name to objects**
const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function reportParks(p) {
    
    console.log('-----PARKS REPORT-----');
    
    // 1.Density (name, numTrees, area properties)
    p.forEach(el => el.treeDensity());
    
    // 2.Average age (buildYear property)
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = Element.calc(ages); // destructuring
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
    
    // 3.Which park has more than 1000 trees (numTrees, name properties)
    Park.moreTrees(p);
    // *alt: without using moreTrees() method:*
    // const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
    // console.log(`${p[i].name} has more than 1000 trees.`);
}


function reportStreets(s) {
    
    console.log('-----STREETS REPORT-----');
    
    // 1.Total and average length of the town's streets (length property)
    const [totalLength, avgLength] = Element.calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    
    // 2.CLassify sizes (name, buildYear, size properties)
    const classification = Street.mapBuilder();
    s.forEach(el => el.classifyStreet(classification));
}

reportParks(allParks);
reportStreets(allStreets);