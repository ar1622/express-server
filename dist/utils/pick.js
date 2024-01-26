"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pick = void 0;
const Pick = (obj, keys) => {
    const finalObj = {}; // Specify the type of `finalObj` as `Partial<T>`
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.Pick = Pick;
