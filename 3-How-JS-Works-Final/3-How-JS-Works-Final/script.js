/////////////////////////////////////
// Lecture: Hoisting

/*
// functions
calculateAge(1965); // works

function calculateAge(year) {
    console.log(2016 - year);
}

// retirement(1956);
// **gives error cause hoisting with functions only works for function declarations**
var retirement = function(year) {
    console.log(65 - (2016 - year));
}


// variables

console.log(age); // undefined
console.log(ages); // gives error
var age = 23;

function foo() {
    console.log(age); // undefined
    var age = 65;
    console.log(age); // 65
}
foo();
console.log(age); // 23
*/



/////////////////////////////////////
// Lecture: Scoping

/*
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    //console.log(c); // gives error
    console.log(a+d);
}
*/



/////////////////////////////////////
// **Lecture: The this keyword**
// **this var is only assigned to a value when the object calls the method**

/*
//console.log(this);

calculateAge(1985);

function calculateAge(year) {
    console.log(2016 - year);
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge;
mike.calculateAge();
// alt: **john.calculateAge.call(mike);**
*/