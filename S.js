/**
 * Single responsibility principle
 * States that a class should have one andonly one reason to change
 * Meaning that if a class has two reasons to chnage, split the functionality
 * in two classes
 */

// sum the areas of all the shapes

// First we'll create factory functions for different shapes
// Factory functions are functions that return a new object

const circle = radius => {
  const proto = {
    type: "Circle",
    area: () => Math.PI * Math.pow(radius, 2)
  };

  return Object.assign(Object.create(proto), { radius });
};

const square = length => {
  const proto = {
    type: "Square",
    area: () => Math.pow(length, 2)
  };

  return Object.assign(Object.create(proto), { length });
};

// sum of areas calculator factory function

const sumCalculator = areas => {
  const proto = {
    type: "areaSum",
    sum: () => areas.reduce((a, v) => a + v),
    display: () => console.log("The total area is:", this.sum())
  };
  return Object.assign(Object.create(proto), { areas });
};

/**
 * In this example, notice sumCalculator is has two reasons to change
 * I handles the logic for calculating the sum and displaying the output
 * In the event we want to change the format of how data is displayed?
 */

const s = square(10);
console.log(s.area());
const c = circle(50);
console.log(c.area());
const a = sumCalculator([s.area(), c.area()]);
console.log("sum", a.sum());
