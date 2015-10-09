/**
 * Created by neo on 2015/10/7.
 */
var neo = require('../index');
var should = require('should');
describe("instance of subclass should be SubClass and SuperClass", function () {
    it('instance type', function () {
        function Creature() {

        }

        function Animal() {
            return this;
        }

        neo.extend(Animal, Creature);
        function Sheep() {
            Animal.call(this);
            return this;
        }

        neo.extend(Sheep, Animal, {
            name: function () {
                return 'sheep';
            }
        });
        var sheep = new Sheep();
        sheep.should.be.an.instanceOf(Sheep);
        sheep.should.be.an.instanceOf(Animal);
        sheep.should.be.an.instanceOf(Creature);
    })
});

describe("instance of subclass should have properties and methods of SuperClass", function () {
    it('Employee inherits from Person', function () {
        function Person() {
            this.name = "jack";
            this.age = 0;
        }

        function Employee() {
            Person.call(this);
            this.jobtitle = "";
        }

        neo.extend(Employee, Person);
        var employee = new Employee();
        employee.should.have.properties('name');
        employee.name.should.be.exactly('jack');
        employee.should.have.properties('age');
        employee.should.have.properties('jobtitle');
    })
});

describe("same property of different instance should have different value ", function () {
    it('compare two instance', function () {
        function Education() {
            this.degree = "bachelor";
            return this;
        }

        function Person() {
            this.name = "";
            this.age = 0;
            this.education = new Education();
            return this;
        }

        function Employee() {
            Person.call(this);
            this.jobtitle = "";
        }

        neo.extend(Employee, Person);
        var employee1 = new Employee();
        var employee2 = new Employee();
        should.notStrictEqual(employee1.education, employee2.education);
    })
});

describe("different instance should have same function", function () {
    it('compare two instance', function () {
        function Education() {
            this.degree = "bachelor";
            return this;
        }

        function Person() {
            this.name = "";
            this.age = 0;
            this.education = new Education();
            return this;
        }

        Person.prototype.sayHello = function () {
            console.log('hi');
        }
        function Employee() {
            Person.call(this);
            this.jobtitle = "";
        }

        neo.extend(Employee, Person);
        var employee1 = new Employee();
        var employee2 = new Employee();
        should.strictEqual(employee1.sayHello, employee2.sayHello);
    })
});

describe("Methods added to SubClass will not been added to SuperClass", function () {
    it('compare two prototype', function () {
        function Education() {
            this.degree = "bachelor";
            return this;
        }

        function Person() {
            this.name = "";
            this.age = 0;
            this.education = new Education();
            return this;
        }

        Person.prototype.sayHello = function () {
            console.log('hi');
        }
        function Employee() {
            Person.call(this);
            this.jobtitle = "";
        }

        neo.extend(Employee, Person);
        //var employee1=new Employee();
        //var employee2=new Employee();
        should.notEqual(Employee.prototype, Person.prototype);
    })
});

describe('test extend from anonymous subclass function', function () {
    it('anonymous', function () {
        var Foo = neo.extend(Object, {
            say: function () {
                return "msg"
            }
        });
        var foo = new Foo();
        foo.should.be.an.instanceOf(Foo);
    })
});