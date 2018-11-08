/**
 * This is the complete code for implementation that
 * is fully SOLID
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

const circle = radius => {
  const proto = {
    radius,
    type: "Circle",
    area: args => Math.PI * Math.pow(args.radius, 2)
  };
  const basics = shapeInterface(proto);
  const abstraction = commonShapeInterface(() => basics.area());
  const composite = Object.assign({}, basics, abstraction);
  return Object.assign(Object.create(composite));
};

const circ = circle(3);

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

const calc = sumCalculator([cub, sq, circ]);
console.log("calculator", calc.sum());
