// CREATIONAL

//singleton

class Singleton {
  instance;
  constructor(instance) {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;
    this.instance = instance;
  }
}

const single1 = new Singleton({ name: "name1" });
const single2 = new Singleton({ name: "name2" });

//factory

class FactBMW {
  constructor(type, price) {
    this.type = type;
    this.price = price;
  }
}

class Factory {
  create(type) {
    if (type === "X3") {
      return new FactBMW(type, 1000);
    }

    if (type === "X5") {
      return new FactBMW(type, 3000);
    }
  }
}

const factory = new Factory();
const x3 = factory.create("X3");
const x5 = factory.create("X5");

// prototype

class Prototype {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  proto() {
    return new Prototype(this.name, this.value);
  }
}

const prototypeObj = new Prototype("Proto", 10);
const proto1 = prototypeObj.proto();
const proto2 = prototypeObj.proto();

// builder

class CarBuilder {
  constructor(car) {
    this.car = car;
    this.auto = false;
    this.autoPilot = false;
  }

  addAutomode() {
    this.auto = true;
    return this;
  }

  addAutoPilot() {
    this.autoPilot = true;
    return this;
  }

  build() {
    return this;
  }
}

const bmw = new CarBuilder("bmw").addAutomode().build();
const seat = new CarBuilder("seat").addAutomode().addAutoPilot().build();

// decorator

class DecoCar {
  constructor(name) {
    this.name = name;
    this.price = 1000;
  }
}

class AutoPilotDecorator {
  constructor(car) {
    this.car = car;
    this.car.price = this.car.price * 3;
  }
}

const decoCar = new AutoPilotDecorator(new DecoCar("mazda"));

// STRUCTURAL PATTERNS

// facade

class CarConstructor {
  constructor(car) {
    this.name = car;
  }

  setEngine() {
    console.log("engine setted");
  }

  setBody() {
    console.log("body setted");
  }
}

class Facade {
  constructor(car) {
    this.car = car;
  }

  produceWholeCar() {
    this.car.setEngine();
    this.car.setBody();
  }
}

const facade = new Facade(new CarConstructor("seat"));

// proxy

class Door {
  open() {
    console.log("door opened");
  }

  close() {
    console.log("door closed");
  }
}

class DoorProxy {
  constructor(door) {
    this.door = door;
  }

  open(password) {
    if (password) {
      this.door.open();
    } else {
      console.log("access denied");
    }
  }

  close() {
    this.door.close();
  }
}

const proxy = new DoorProxy(new Door());

// adapter

class OldEngine {
  simpleLogic() {
    console.log("simpleLogic engine");
  }
}

class NewEngine {
  complicatedLogic() {
    console.log("complicatedLogic engine");
  }
}

class Adapter {
  constructor(engine) {
    this.engine = engine;
  }

  simpleLogic() {
    this.engine.complicatedLogic();
  }
}

class AdapterCar {
  start(engine) {
    engine.simpleLogic();
  }
}

const adapterCar = new AdapterCar();

// composite

class Equipment {
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }
}

class EngineEquipment extends Equipment {
  constructor() {
    super();
    this.setName("engine");
    this.setPrice(1000);
  }
}

class BodyEquipment extends Equipment {
  constructor() {
    super();
    this.setName("body");
    this.setPrice(502);
  }
}

class CarComposite {
  constructor() {
    this.equipments = [];
  }

  add(equipment) {
    this.equipments.push(equipment);
  }

  getSum() {
    const sum = this.equipments.reduce((acc, nextValue) => {
      acc += nextValue.getPrice();

      return acc;
    }, 0);

    console.log("Total sum: ", sum);
  }
}

const composite = new CarComposite();

composite.add(new EngineEquipment());

composite.add(new BodyEquipment());

// flyweight

class FlyweightCar {
  constructor(name) {
    this.name = name;
  }
}

class Flyweight {
  constructor() {
    this.models = {};
  }

  create(name) {
    const model = this.models[name];

    if (model) {
      console.log("from cache");

      return model;
    }

    this.models[name] = new FlyweightCar(name);
    console.log("new record");

    return this.models[name];
  }
}

const flyweight = new Flyweight();

// behavior patterns

//iterator

class IteratorV1 {
  constructor(items) {
    this.items = items;
    this.idx = 0;
  }

  hasNext() {
    return this.idx < this.items.length;
  }

  next() {
    const res = this.items[this.idx];

    this.idx++;

    return res;
  }
}

const collection = new IteratorV1([1, 2, 3, 4, 5, 3]);

while (collection.hasNext()) {
  collection.next();
}

class IteratorV2 {
  constructor(arr) {
    this.arr = arr;
    this.idx = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.idx < this.arr.length) {
          return {
            value: this.arr[this.idx++],
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}

const iter = new IteratorV2(["I", "am", "from", "node", "js"]);

for (const value of iter) {
  // console.log(value);
}

// chain of responsibility

class ChainOfResponsibility {
  constructor(num) {
    this.num = num;
  }

  add(value) {
    this.num += value;

    return this;
  }

  getRes() {
    return this.num;
  }
}

const chainOfResponsibility = new ChainOfResponsibility(10)
  .add(5)
  .add(6)
  .add(10)
  .getRes();

// strategy

class TravelTime {
  getTime() {
    return this.time;
  }
}

class BysicleTime extends TravelTime {
  constructor() {
    super();
    this.time = "5h";
  }
}

class CarTime extends TravelTime {
  constructor() {
    super();
    this.time = "1h";
  }
}

class Comunicator {
  calculateTime(transport) {
    return transport.getTime();
  }
}

const comunicator = new Comunicator();

// template

class TemplateBuilder {
  build() {
    this.setEngine();
    this.setBody();
  }
}

class MazdaBuilder extends TemplateBuilder {
  setEngine() {
    console.log("setEngine  mazda");
  }

  setBody() {
    console.log("setBody  mazda");
  }
}

class MersedesBuilder extends TemplateBuilder {
  setEngine() {
    console.log("setEngine   Mersedes");
  }

  setBody() {
    console.log("setBody   Mersedes");
  }
}

const buildMazda = new MazdaBuilder().build();
const buildMers = new MersedesBuilder().build();

// observer

class News {
  constructor() {
    this.news = "";
    this.users = [];
  }

  addObserver(observer) {
    this.users.push(observer);
  }

  removeObserver(observer) {
    this.users = this.users.filter((user) => user.name !== observer.name);
  }

  notifyAll() {
    this.users.forEach((user) => user.notify(this.news));
  }

  postNews(news) {
    this.news = news;
    this.notifyAll();
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  notify(news) {
    console.log(`User ${this.name} received: ${news}`);
  }
}

const user1 = new Observer("Andii");
const user2 = new Observer("Ivan");

const paper = new News();
paper.addObserver(user1);
paper.addObserver(user2);

paper.postNews("Hello world");

paper.removeObserver(user1);

paper.postNews("Hello news");
