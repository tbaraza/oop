/**
 * Open close principle
 * It states that a class should be open for extension but closed for modification
 * This means open for new features to be added without breaking existing code
 */

const sumCalculator = shapes => {
  const proto = {
    sum: () => {
      const areas = [];
      for (shape in shapes) {
        if (shape.type === "Square") {
          areas.push(Math.pow(length, 2));
        } else if (type === "Circle") {
          areas.push(Math.PI * Math.pow(radius, 2));
        }
      }

      return areas.reduce((a, v) => a + v);
    }
  };
  return Object.assign(Object.create(proto), shapes);
};

/**
 * We can modify the sum method to above
 * As you can see when we want to add sums of more shapes,
 * we'll have to add another if/else statement
 * thus modifying the logic
 * This goes against this principle.
 * A fix will be to remove the logic to calculate the area
 * of each shape from the sum method and attach it to each shape
 * factory function
 */

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

const refactoredSumCalculator = shapes => {
  const proto = {
    sum: () => {
      const areas = [];
      for (shape of shapes) {
        areas.push(shape.area());
      }

      return areas.reduce((a, v) => a + v);
    }
  };
};

/**
 * But there comes another problem,
 * How do we know that the object passed is actually a
 * shape and has an area method?
 * This is where interface comes into place.
 * Since js has no interfaces we'll use function composition
 */

const shapeInterface = state => ({
  type: "shapeInterface",
  area: () => state.area(state)
});

// Then we implement this interface in the factory functions
const squaree = length => {
  const proto = {
    length,
    type: "Square",
    area: args => Math.pow(args.length, 2)
  };

  const basics = shapeInterface(proto);
  const composite = Object.assign({}, basics);
  return Object.assign(Object.create(composite), { length });
};

const sq = squaree(10);
console.log("obje", sq);
console.log("prototype", Object.getPrototypeOf(sq));

const circlee = radius => {
  const proto = {
    radius,
    type: "Circle",
    area: args => Math.PI * Math.pow(args.radius, 2)
  };
  const basics = shapeInterface(proto);
  const composite = Object.assign({}, basics);
  return Object.assign(Object.create(composite), { radius });
};

// now this
const refactoreddSumCalculator = shapes => {
  const proto = {
    sum: () => {
      const areas = [];
      for (shape of shapes) {
        if (Object.getPrototypeOf(shape).type === "shapeInterface") {
          areas.push(shape.area());
        } else {
          throw new Error("this is not a shapeInterface object");
        }
      }
      return areas.reduce((a, v) => a + v);
    }
  };

  return Object.assign(Object.create(proto), { shapes });
};

console.log("sum", refactoreddSumCalculator([sq]).sum());

module.exports = {
  squaree,
  circlee
};
