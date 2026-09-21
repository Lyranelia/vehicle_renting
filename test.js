"use strict";
// This is gonna be a test file for TypeScript 
// prompt am Arsch, muss zu readline wechseln
Object.defineProperty(exports, "__esModule", { value: true });
const nodeFs = require("node:fs");
const readlineSync = require("readline-sync");
/*// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question: string) => {
    return new Promise((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
};*/
class TwoWheelVehicle {
    type;
    name;
    id;
    isRented;
    pricePerMinute;
    static nextId = 1;
    constructor(type, name, pricePerMinute) {
        this.type = type;
        this.name = name;
        this.id = TwoWheelVehicle.nextId;
        TwoWheelVehicle.nextId += 1;
        this.isRented = false; // beim Erstellen nicht vermietet, is ja logisch, wa
        this.pricePerMinute = pricePerMinute;
    }
    calculatePrice(duration = 1) {
        return duration * this.pricePerMinute;
    }
}
class ElectricVehicle extends TwoWheelVehicle {
    battery;
    constructor(type, name, pricePerMinute, battery = 100) {
        super(type, name, pricePerMinute); // man ruft den Constructor der Elternklasse auf
        this.battery = battery;
    }
    rent(duration = 1) {
        if (this.isRented === true) {
            return `This ${this.type} is already rented.`;
        }
        if (this.battery <= 20) {
            return `This ${this.type} must be charged first.`; // kannst auch mit override Funktionen überschreiben und das schon in der Elternklasse definieren
        }
        this.isRented = true;
        return `You're renting this ${this.type} for ${duration} minutes.`;
    }
}
class EScooter extends ElectricVehicle {
    constructor(name, pricePerMinute, battery = 100) {
        super("E-Scooter", name, pricePerMinute, battery);
    }
}
class EBike extends ElectricVehicle {
    constructor(name, pricePerMinute, battery = 100) {
        super("E-Bike", name, pricePerMinute, battery);
    }
}
class Bike extends TwoWheelVehicle {
    constructor(name, pricePerMinute) {
        super("Bike", name, pricePerMinute);
    }
}
let vehicles = [
    new EScooter("Xiaomi 1 Pro", 0.08),
    new EScooter("Xiaomi 2 Pro", 0.08),
    new EScooter("Xiaomi 5 Pro", 0.09),
    new EScooter("Xiaomi 1 ", 0.07),
    new EBike("Decathlon Rockrider", 0.12),
    new EBike("Decathlon 2", 0.11),
    new EBike("Decathlon 3", 0.12),
    new EBike("Xiaomi 4", 0.13),
    new Bike("Fahrrad Marke 4 Pro", 0.06),
    new Bike("Fahrrad Marke 3 Pro", 0.05),
    new Bike("Fahrrad Marke 4 ", 0.05),
    new Bike("Fahrrad Marke 4 Lite", 0.05)
];
// Hervorragend, das funktioniert schonmal
// dann jetzt Methoden, wa
// und ne Dublettenprüfung für die IDs wär auch ganz sinnvoll
// console.log(vehicles)
function logo() {
    console.log("\n+++++++++++++++++++++++++++++");
    console.log("+     SCOOTERS; EBIKES      +");
    console.log("+          & BIKES          +");
    console.log("+++++++++++++++++++++++++++++\n\n");
}
function logType(type) {
    console.log(`You want to rent an ${type}, is that right?`);
}
logo();
const customer = readlineSync.question("Hi! What should I call you?\nname: ");
console.log(`Okay, thank you, ${customer}!`);
let isTypeNull = true;
while (isTypeNull) {
    let typeOfVehicle = readlineSync.question("\nWhat kind of vehicle do you want to rent today?\n[1] e-scooter\n[2] e-bike\n[3] bike\n");
    // Antwort parsen und auswerten
    if (typeOfVehicle === null || isNaN(parseInt(typeOfVehicle))) {
        continue;
    }
    isTypeNull = false;
    const num = parseInt(typeOfVehicle);
    try {
        switch (num) {
            case 1:
                logType("e-scooter");
                break;
            case 2:
                logType("e-bike");
                break;
            case 3:
                logType("bike");
                break;
            default:
                console.log("Please enter 1, 2, or 3");
        }
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=test.js.map