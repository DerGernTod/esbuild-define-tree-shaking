import { log } from "./lib";

declare const IS_DEBUG: boolean;

function foo() {
    if (IS_DEBUG) {
        log("foo");
    }
}

foo();