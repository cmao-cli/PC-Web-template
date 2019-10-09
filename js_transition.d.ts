// External libs

// These will have to remain until we (or someone else) writes
// proper .d.ts definition files for them.
declare var template:any;
// node's typings definitions currently break stuff, use this instead
declare var DEBUG:any;
interface NodeRequire {
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?:string ) => void;
}