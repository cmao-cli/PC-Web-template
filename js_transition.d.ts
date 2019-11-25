// External libs

// These will have to remain until we (or someone else) writes
// proper .d.ts definition files for them.
declare var template:any;
// node's typings definitions currently break stuff, use this instead
declare var DEBUG:any;
interface NodeRequire {
  ensure:(paths:string[], callback:(require:<T>(path:string) => T) => void, name?:string ) => void;
}

declare interface DefaultObejct {
  [key:string]:any;
}

declare interface Window {
  browserHistory:import('history').History<any>;
  CODEMAOCONFIG:any;
}