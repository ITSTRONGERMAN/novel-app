// @ts-nocheck
// #ifndef APP-ANDROID
export type Numeric = string | number;
// #endif
// #ifdef APP-ANDROID
export type Numeric = any;
// #endif