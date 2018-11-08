/**
 * Interface segregation principle
 * It states that a client should not be forced to implement an
 * interface that it doesn't use
 * Instead of one fat interface many small interfaces are
 * preffered
 */

const areaCalculator = shapes => {
  const proto = {
    sum: () => {
      const areas = [];
      console.log("area", shapes);
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

/**
 * We now want to calculate volume of shape.
 * We can add another contract to the shapeInterface
 */

let shapeInterface = state => ({
  type: "shapeInterface",
  area: () => state.area(state),
  volume: () => state.volume(state)
});

/**
 * Now any shape we create must implement the volume method
 * So this interface will force square factory function to
 * implement a method that it has no use of
 * To fix this we could create a different interface for solid
 * and flat shapes
 */

shapeInterface = state => ({
  type: "shapeInterface",
  area: () => state.area(state)
});

const solidShapeInterface = state => ({
  type: "solidShapeInterface",
  volume: () => state.volume(state)
});

let cubee = length => {
  const proto = {
    length,
    type: "Cubee",
    area: args => Math.pow(args.length, 2),
    volume: args => Math.pow(args.length, 3)
  };
  // implement using the interfaces
  const basics = shapeInterface(proto);
  const complex = solidShapeInterface(proto);
  const composite = Object.assign({}, basics, complex);
  return Object.assign(Object.create(composite), { length });
};

const cube = cubee(6);
console.log("big ben", Object.getPrototypeOf(cube));
console.log("sum", areaCalculator([cube]));
/**
 * But we know that the areaCalculator has only calculates sum for shapeInterface
 * So what do we do???
 * We can create another interface that can be implemented in both
 * flat and solid shapes
 */

const commonShapeInterface = fn => ({
  type: "commonShapeInterface",
  calculate: () => fn()
});

const square = length => {
  const proto = {
    length,
    type: "Square",
    area: args => Math.pow(args.length, 2)
  };
  const basics = shapeInterface(proto);
  const abstraction = commonShapeInterface(() => basics.area());
  const composite = Object.assign({}, basics, abstraction);
  return Object.assign(Object.create(composite));
};

// now cube will be

const refactoredCubee = length => {
  const proto = {
    length,
    type: "Cubee",
    area: args => Math.pow(args.length, 2),
    volume: args => Math.pow(args.length, 3)
  };
  const basics = shapeInterface(proto);
  const complex = solidShapeInterface(proto);
  const abstraction = commonShapeInterface(
    () => basics.area() + complex.volume()
  );
  const composite = Object.assign({}, basics, complex, abstraction);
  return Object.assign(Object.create(composite), { length });
};
const ref = refactoredCubee(3);
console.log("refr", Object.getPrototypeOf(ref));
console.log("vol", ref.volume());

const refactoredAreaCalculator = shapes => {
  const proto = {
    sum: () => {
      const areas = [];
      console.log("area", shapes);
      for (shape of shapes) {
        if (Object.getPrototypeOf(shape).type === "commonShapeInterface") {
          areas.push(shape.calculate());
        } else {
          throw new Error("this is not a commonShapeInterface object");
        }
      }
      return areas.reduce((a, v) => a + v);
    }
  };

  return Object.assign(Object.create(proto), { shapes });
};
const newCalc = refactoredAreaCalculator([ref]);
console.log("new-calc", Object.getPrototypeOf(newCalc));
console.log(newCalc.sum());
