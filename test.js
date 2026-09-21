"use strict";
// This is gonna be a test file for TypeScript 
// prompt am Arsch, muss zu readline wechseln
Object.defineProperty(exports, "__esModule", { value: true });
const nodeFs = require("node:fs"); // hä wo kommt'n das her?
const readlineSync = require("readline-sync");
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
    static pricePerMinute = 0.09;
    constructor(name, battery = 100) {
        super("E-Scooter", name, EScooter.pricePerMinute, battery);
    }
}
class EBike extends ElectricVehicle {
    static pricePerMinute = 0.11;
    constructor(name, battery = 100) {
        super("E-Bike", name, EBike.pricePerMinute, battery);
    }
}
class Bike extends TwoWheelVehicle {
    static pricePerMinute = 0.05;
    constructor(name) {
        super("Bike", name, Bike.pricePerMinute);
    }
}
let vehicles = [
    new EScooter("Xiaomi 1 Pro"),
    new EScooter("Xiaomi 2 Pro"),
    new EScooter("Xiaomi 5 Pro"),
    new EScooter("Xiaomi 1"),
    new EBike("Decathlon Rockrider"),
    new EBike("Decathlon 2"),
    new EBike("Decathlon 3"),
    new EBike("Xiaomi 4"),
    new Bike("Fahrrad Marke 4 Pro"),
    new Bike("Fahrrad Marke 3 Pro"),
    new Bike("Fahrrad Marke 4"),
    new Bike("Fahrrad Marke 4 Lite")
];
function logo() {
    console.log("\n  +++++++++++++++++++++++++++++");
    console.log("  +     SCOOTERS; EBIKES      +");
    console.log("  +          & BIKES          +");
    console.log("  +++++++++++++++++++++++++++++\n\n");
}
function adminScreen(name) {
    let isTypeNull = true;
    console.log(`Welcome to the admin window, ${name}!`);
    while (isTypeNull) {
        console.log("What do you want to do?");
        let adminQuestion = readlineSync.question("[1] show all vehicles\n[2] show all vehicles, detailed\n[3] show all rentable vehicles\n[4] charge all to 100 %\n[5] add new vehicle\n\nchoice: ");
        const adminNum = parseInt(adminQuestion);
        if (adminQuestion === null || isNaN(adminNum) || adminNum < 1 || adminNum > 5) {
            console.log("Please enter a number between 1 and 5.");
            continue;
        }
        isTypeNull = false;
        switch (adminNum) {
            case 1:
                for (let i = 0; i < vehicles.length; i++) {
                    let vehicle = vehicles[i];
                    if (vehicle) {
                        console.log(`${vehicle.type} - ${vehicle.name}`);
                    }
                }
                ;
                console.log(`number of vehicles: ${vehicles.length}`);
                break;
            case 2:
                for (let i = 0; i < vehicles.length; i++) {
                    let vehicle = vehicles[i];
                    console.log(vehicle);
                }
                break;
            case 3:
                for (let i = 0; i < vehicles.length; i++) {
                    let vehicle = vehicles[i];
                    if (vehicle instanceof ElectricVehicle) {
                        if (vehicle.battery >= 20 && vehicle.isRented === false) {
                            console.log(`${vehicle.type} - ${vehicle.name} - ${vehicle.battery}`);
                        }
                    }
                }
                break;
            case 4:
                for (let i = 0; i < vehicles.length; i++) {
                    let vehicle = vehicles[i];
                    if (vehicle instanceof ElectricVehicle) {
                        if (vehicle.battery != 100 && vehicle.isRented === false) {
                            console.log(`charged for ${100 - vehicle.battery} to 100 %:\n ${vehicle.type} - ${vehicle.name} - ${vehicle.battery}`);
                        }
                    }
                }
                break;
            case 5:
                addVehicle();
                break;
        }
    }
}
function addName(type) {
    let isTypeNullA = true;
    const vehicleName = readlineSync.question(`Please enter the name of the ${type}.\nname: `);
    while (isTypeNullA) {
        if (!vehicleName) {
            console.log("Cannot have empty name. Try again.");
            continue;
        }
        isTypeNullA = false;
    }
    console.log(`\nYou successfully added a new ${type} named "${vehicleName}"!\n`);
    return vehicleName;
}
function addVehicle() {
    let isTypeNull = true;
    while (isTypeNull) {
        const whatVehicle = readlineSync.question("What kind of vehicle do you want to add?\n[1] e-scooter\n[2] e-bike\n[3] bike\nchoice: ");
        const num = parseInt(whatVehicle);
        if (whatVehicle === null || isNaN(num) || num < 1 || num > 3) {
            console.log("Please enter 1, 2, or 3.");
            continue;
        }
        isTypeNull = false;
        switch (num) {
            case 1:
                vehicles.push(new EScooter(addName("E-Scooter")));
                startScreen(customer);
                break;
            case 2:
                vehicles.push(new EBike(addName("E-Bike")));
                startScreen(customer);
                break;
            case 3:
                vehicles.push(new Bike(addName("Bike")));
                startScreen(customer);
                break;
        }
    }
}
function logRentType(type, price) {
    let isTypeNull = true;
    // gucken, ob "a" oder "an" benutzt werden muss
    if (type === "e-scooter" || type === "e-bike") {
        console.log(`You want to rent an ${type}, is that right? That would be ${price} € per minute.`);
    }
    if (type === "bike") {
        console.log(`You want to rent a ${type}, is that right? That would be ${price} € per minute.`);
    }
    while (isTypeNull) {
        let yesOrNo = readlineSync.question("[y]/[n]\nchoice: ");
        if (yesOrNo === null) {
            console.log("Please type 'y' for yes or 'n' for no");
            continue;
        }
        if (yesOrNo.toLowerCase() === "y") {
            console.log("You voted yes!");
            isTypeNull = false;
        }
        else if (yesOrNo.toLowerCase() === "n") {
            console.log("You voted no!");
            isTypeNull = false;
        }
    }
}
function logReturnType(name, price) {
    console.log(`You want to return your ${name}.`);
    let isTypeNullD = true;
    while (isTypeNullD) {
        let duration = readlineSync.question(`How long did you rent your ${name}?\nduration in minutes: `);
        if (duration === null || isNaN(parseInt(duration))) {
            console.log("Please enter a whole number.");
            continue;
        }
        const durationNum = parseInt(duration);
        const vehicle = searchForVehicle();
        if (vehicle == undefined || vehicle == null) {
            console.log("\nYou canceled the return.");
            return undefined;
        }
        vehicle.isRented = false;
        if (vehicle instanceof ElectricVehicle) {
            vehicle.battery = Math.max(0, vehicle.battery - durationNum * 0.5);
        }
        console.log(`\nYou have successfully returned your ${name} and will be charged ${durationNum * price} from your account.\nThank you for being with us!`);
        // das auch vorher mit einer [y]/[n] question, ob das so gewollt ist, vielleicht ist ja die Zahl verkehrt
        isTypeNullD = false;
    }
}
function searchForVehicle() {
    let isTypeNull = true;
    while (isTypeNull) {
        const search = readlineSync.question("Which vehicle?\nPlease enter the exact name (or c to go back): ");
        if (search.toLowerCase() == "c") {
            return undefined;
        }
        if (!search) {
            console.log("\nNothing entered. Please try again.\n");
            continue;
        }
        for (let i = 0; i < vehicles.length; i++) {
            let vehicle = vehicles[i];
            if (vehicle == undefined) {
                continue;
            }
            if (vehicle.name.toLowerCase() == search.toLowerCase()) {
                return vehicle;
            }
            console.log(`\nNo vehicle found with the name "${search}". Please try again.\n`);
        }
    }
}
function startScreen(customer) {
    let isTypeNullA = true;
    while (isTypeNullA) {
        let whatToDo = readlineSync.question(`Welcome, ${customer}!\nWhat do you want to do?\n[1] rent a vehicle\n[2] return a vehicle\n[3] go to admin page\n`);
        const num = parseInt(whatToDo);
        if (whatToDo === null || isNaN(num) || num < 1 || num > 3) {
            console.log("Please enter 1, 2, or 3.");
            continue;
        }
        isTypeNullA = false;
        switch (num) {
            case 1:
                // +++ rent a vehicle +++
                let isTypeNullB = true;
                while (isTypeNullB) {
                    let typeOfVehicle = readlineSync.question(`\nHi, ${customer}!\nWhat kind of vehicle do you want to rent today?\n[1] e-scooter\n[2] e-bike\n[3] bike\n`);
                    // Antwort parsen und auswerten
                    const num = parseInt(typeOfVehicle);
                    if (typeOfVehicle === null || isNaN(num) || num < 1 || num > 3) {
                        console.log("Please enter 1, 2, or 3.");
                        continue;
                    }
                    isTypeNullB = false;
                    switch (num) {
                        case 1:
                            logRentType("e-scooter", EScooter.pricePerMinute);
                            break;
                        case 2:
                            logRentType("e-bike", EBike.pricePerMinute);
                            break;
                        case 3:
                            logRentType("bike", Bike.pricePerMinute);
                            break;
                    }
                }
                break;
            case 2:
                // +++ return a vehicle +++
                let isTypeNullC = true;
                while (isTypeNullC) {
                    let typeOfVehicle = readlineSync.question(`\nHi, ${customer}!\nWhat kind of vehicle do you want to return today?\n[1] e-scooter\n[2] e-bike\n[3] bike\n`);
                    // Antwort parsen und auswerten
                    const num = parseInt(typeOfVehicle);
                    if (typeOfVehicle === null || isNaN(num) || num < 1 || num > 3) {
                        console.log("Please enter 1, 2, or 3.");
                        continue;
                    }
                    isTypeNullC = false;
                    switch (num) {
                        case 1:
                            logReturnType("e-scooter", EScooter.pricePerMinute);
                            break;
                        case 2:
                            logReturnType("e-bike", EBike.pricePerMinute);
                            break;
                        case 3:
                            logReturnType("bike", Bike.pricePerMinute);
                            break;
                    }
                }
                break;
            case 3:
                adminScreen(customer);
                break;
        }
    }
}
// ++++ Ausgeführter Code beginnt hier ++++
logo();
const customer = readlineSync.question("Hi! What should I call you?\nname: ");
console.log(`Okay, thank you, ${customer}!`);
startScreen(customer);
//# sourceMappingURL=test.js.map