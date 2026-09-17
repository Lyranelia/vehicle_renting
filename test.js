"use strict";
// This is gonna be a test file for TypeScript 
class TwoWheelVehicle {
    type;
    name;
    id;
    isRented;
    pricePerMinute;
    constructor(type, name, id, pricePerMinute) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.isRented = false; // beim Erstellen nicht vermietet, is ja logisch, wa
        this.pricePerMinute = pricePerMinute;
    }
}
class ElectricVehicle extends TwoWheelVehicle {
    battery;
    constructor(type, name, id, pricePerMinute, battery) {
        super(type, name, id, pricePerMinute);
        this.battery = battery;
    }
}
class EScooter extends ElectricVehicle {
    constructor(name, id, pricePerMinute, battery = 100) {
        super("E-Scooter", name, id, pricePerMinute, battery);
    }
}
class EBike extends ElectricVehicle {
    constructor(name, id, pricePerMinute, battery = 100) {
        super("E-Bike", name, id, pricePerMinute, battery);
    }
}
class Bike extends TwoWheelVehicle {
    constructor(name, id, pricePerMinute) {
        super("Bike", name, id, pricePerMinute);
    }
}
const scooter1 = new EScooter("Xiaomi 1 Pro", 1, 0.8);
console.log(scooter1);
