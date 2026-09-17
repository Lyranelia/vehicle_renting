# TypeScript

Was isn Typescript
Also:

**TypeScript is a typed superset of JavaScript, aimed at making the language more scalable and reliable.**

## Installation
command:
    npm install -g typescript


## Compiling TypeScript
command:
    tsc first.ts


TypeScript — as its name suggests — is the typed version of JavaScript. This means we can specify types to different variables at the time of declaration. They will always hold the same type of data in that scope.


## Class

In object-oriented programming, a class is the template of objects. A class defines how an object would look like in terms of that object’s features and functionalities. A class also encapsulates data for the object.

class Car {

// fields  
  model: String;  
  doors: Number;  
  isElectric: Boolean;

constructor(model: String, doors: Number, isElectric: Boolean) {  
    this.model = model;  
    this.doors = doors;  
    this.isElectric = isElectric;  
  }

displayMake(): void {  
    console.log(`This car is ${this.model}`);  
  }

}

Let’s see how we can create a new instance of this class:

const Prius = new Car('Prius', 4, true);  
Prius.displayMake(); // This car is Prius

To create an object of a class, we use the keyword of new and call the constructor of the class and pass it the properties. Now this object Prius has its own properties of model, doors, and isElectric. The object also can call the method of displayMake, which would have access to the properties of Prius.

## Interface

The concept of interfaces is another powerful feature of TypeScript, which allows you to define the structure of variables. An interface is like a syntactical contract to which an object should conform.

Interfaces are best described through an actual example. So, suppose we have an object of Car:

const Car = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}

If we look at the object above and try to extract its signature, it would be:

{  
  model: String,  
  make: String,  
  display(): void  
}

If we want to reuse this signature, we can declare it in the form of an interface. To create an interface, we use the keyword interface.

interface ICar {  
  model: String,  
  make: String,  
  display(): void  
}

const Car: ICar = {  
  model: 'Prius',  
  make: 'Toyota',  
  display() => { console.log('hi'); }  
}

Here, we’ve declared an interface called ICar, and created an object Car. Car is now binding to the ICar interface, ensuring that the Car object defines all the properties which are in the interface.

## Source
https://www.freecodecamp.org/news/learn-typescript-in-5-minutes-13eda868daeb/