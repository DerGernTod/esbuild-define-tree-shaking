# Reproducer

## Problem
ESBuild generates invalid code when creating unreachable blocks via define replacements. It tree-shakes imports of functions that are still used in the unreachable code parts, making other code inspectors (like Google closure compiler) break upon reaching it during analysis.

## Expectation
ESBuild shouldn't tree-shake imports of code that is still used in the result, even if unreachable.

## Example

```ts
import { log } from "./lib";

declare const IS_DEBUG: boolean;

function foo() {
    if (IS_DEBUG) {
        log("foo");
    }
}

foo();
```

Using the `define` config, we can replace the `IS_DEBUG` constant with `false` to create an unreachable code block. ESBuild afterwards removes the `import` statement, but keeps the unreachable block, resulting in this:

```js
function foo() {
  if (false) {
    log("foo");
  }
}
foo();
```

However, running this through other analyzers such as Google closure compiler will result in an error:

> ERROR - [JSC_UNDEFINED_VARIABLE] variable log is undeclared
