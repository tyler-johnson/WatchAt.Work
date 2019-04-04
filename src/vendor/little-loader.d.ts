declare function load(url: string, callback?: (error?: any) => any, context?: any): void;
declare function load(
  url: string,
  options: {
    setup?: (script: HTMLScriptElement) => any;
    callback?: (error?: any) => any;
    context?: any;
  },
  context?: any
): void;

export = load;
