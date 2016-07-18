/**
 * Created by yuhogyun on 2016. 7. 18..
 */
//module.js
function Person (name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

module.exports = Person;
