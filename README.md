# TypeScript Pipeline

A simple pipeline implementation for TypeScript. 100% type safe.

Ideally, this library should've had the same API as this [one](https://github.com/StyleShit/php-pipeline), but unfortunately, it's impossible to achieve 100% type safety when passing pipes as an array (see [this](https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/Pipe/List/Sync.ts)).

It also means that the pipeline can't be lazy, since the type of the value is unknown until all pipes are executed.

## Usage Example:

A simple usage might look like this:

```typescript
import { makePipeline } from "./pipeline";

const pipeline = makePipeline(1)
  .pipe((value: number) => [value, value * 2])
  .pipe((value: number[]) => value.join(","));

const result = pipeline.getValue(); // "1,2"
```

If you'll try to pass a value of a wrong type, you'll get a compile error:

```typescript
import { makePipeline } from "./pipeline";

const pipeline = makePipeline(1)
  .pipe((value: number) => [value, value * 2])
  .pipe((value: string) => value.split(","));

// Error: Argument of type '(value: string) => string[]'
//  is not assignable to parameter of type '(value: number[]) => any'.
```

## Available Methods:

`makePipeline(value)` - Creates a new pipeline with an initial value.

`pipe(pipeFunction)` - Adds a new step to the pipeline. The step is a function that takes the value of the previous step and returns a new value.

`getValue()` - Returns the value of the pipeline after all steps are executed.

---

> Note: The pipeline is immutable, so all methods return a new pipeline.

> Note: The pipeline is not lazy, so the steps are executed directly.

For more information, check out the [tests](./src/__tests__).
