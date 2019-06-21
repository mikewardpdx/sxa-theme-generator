declare namespace SXA {
  export interface Base {
    register: (name: string, component: object) => void;
    component: any;
  }
}

declare var XA: SXA.Base;
