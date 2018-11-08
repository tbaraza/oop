const { squaree, circlee } = require("./O.js");

/**
 * Liskov substitution principle
 * It states that a derived class should be substitutable for it's base class
 * This means that base class implementation should be such that it does
 * not break the base class functionality
 */

/**
 * Say we now have a volumeCalculator class that extends
 * the sumCalculator. How do we extend it?
 */

const areaCalculator = shapes => {
  const proto = {
    type: "areaCalculator",
    sum: () => {
      const areas = [];
      for (shape of shapes) {
        console.log("here", Object.getPrototypeOf(shape));
        if (Object.getPrototypeOf(shape).type === "shapeInterface") {
          areas.push(shape.area());
        } else {
          throw new Error("this is not a shapeInterface object");
        }
      }
      console.log("mwisho", areas);
      return areas.reduce((a, v) => a + v);
    }
  };

  return Object.assign(Object.create(proto), { shapes });
};

const volumeCalculator = shapes => {
  const proto = {
    type: "volumeCalculator"
  };
  console.log("shapes", shapes);
  const areaCalcProto = Object.getPrototypeOf(areaCalculator(shapes));
  const inherit = Object.assign({}, areaCalcProto, proto);
  console.log("inherit", inherit);
  return Object.assign(Object.create(inherit), { shapes });
};

const s = squaree(5);
const c = circlee(20);
const v = volumeCalculator([s, c]);
console.log("VOLUME", v.sum());
