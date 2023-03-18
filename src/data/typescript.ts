import {Repo} from "."

export const tsRepo: Repo = {
    label: "TS",
    url: "https://refactoring.guru/design-patterns/abstract-factory/typescript/example",
    files: [
        {
            path: "",
            code: `
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}
class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }
    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}
class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }
    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}
interface AbstractProductA {
    usefulFunctionA(): string;
}
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
}
class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
}
interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}
class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return "The result of the B1 collaborating with the " + result;
    }
}
class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return "The result of the B2 collaborating with the " + result;
    }
}
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}
clientCode(new ConcreteFactory1());
console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
`,
        },
        {
            path: "",
            code: `
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}
class ConcreteSubject implements Subject {
    public state: number;
    private observers: Observer[] = [];
    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }
        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }
    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }
        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }
    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
    public someBusinessLogic(): void {
        console.log('\nSubject: I\'m doing something important.');
        this.state = Math.floor(Math.random() * (10 + 1));
        console.log("Subject: My state has just changed to: " + this.state);
        this.notify();
    }
}
interface Observer {
    update(subject: Subject): void;
}
class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if(subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}
class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if(subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserverA();
subject.attach(observer1);
const observer2 = new ConcreteObserverB();
subject.attach(observer2);
subject.someBusinessLogic();
subject.someBusinessLogic();
subject.detach(observer2);
subject.someBusinessLogic();
`,
        },
        {
            path: "",
            code: `  
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}
class Adapter extends Target {
    private adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }
    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return "Adapter: (TRANSLATED) " + result;
    }
}
function clientCode(target: Target) {
    console.log(target.request());
}
console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);
const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log("Adaptee: " + adaptee.specificRequest());
console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
`,
        },
        {
            path: "",
            code: `
class Singleton {
    private static instance: Singleton;
    private constructor() { }
    public static getInstance(): Singleton {
        if (!Singleton.instance) Singleton.instance = new Singleton();
        return Singleton.instance;
    }
    public someBusinessLogic() {
        console.log("Do some logic here");
    }
}
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();
    if (s1 === s2) console.log('Singleton works, both variables contain the same instance.');
    else console.log('Singleton failed, variables contain different instances.');
}
clientCode();
`,
        },
    ],
}
