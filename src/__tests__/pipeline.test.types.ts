import { Equal, Expect } from "@type-challenges/utils";
import { makePipeline } from "../pipeline";

const pipeline1 = makePipeline(1);
const pipedValue1 = pipeline1.getValue();

const pipeline2 = pipeline1.pipe((value: number) => value + "0-test");
const pipedValue2 = pipeline2.getValue();

const pipeline3 = pipeline2.pipe((value: string) => [value, value, value]);
const pipedValue3 = pipeline3.getValue();

// @ts-ignore
type cases = [
  Expect<Equal<typeof pipedValue1, number>>,
  Expect<Equal<typeof pipedValue2, string>>,
  Expect<Equal<typeof pipedValue3, string[]>>,

  Expect<Equal<PipeParameterType<typeof pipeline1.pipe>, number>>,
  Expect<Equal<PipeParameterType<typeof pipeline2.pipe>, string>>,
  Expect<Equal<PipeParameterType<typeof pipeline3.pipe>, string[]>>
];

/**
 * Utils
 */
type PipeParameterType<T> = T extends (value: infer F) => any
  ? F extends (value: infer P) => any
    ? P
    : never
  : never;
