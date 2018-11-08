/**
 * Dependency Inversion Principle
 * It states that high level module must not depend om
 * low level module, but they should depend on abstractions
 * We accomplished this by using high order functions when we created
 * a common interface for our shapes
 * The refactored code is below
 */

shapeInterface = state => ({
  type: "shapeInterface",
  area: () => state.area(state)
});

const solidShapeInterface = state => ({
  type: "solidShapeInterface",
  volume: () => state.volume(state)
});

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

const sq = square(6);

const solid = length => {
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

const cub = solid(50);

const sumCalculator = shapes => {
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

const calc = sumCalculator([cub, sq]);
console.log("calculator", calc.sum());
