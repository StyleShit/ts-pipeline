export const makePipeline = <T>(value: T) => {
  return {
    pipe<F extends (value: T) => any>(pipeFunction: F) {
      return makePipeline<ReturnType<F>>(pipeFunction(value));
    },

    getValue() {
      return value;
    },
  };
};
