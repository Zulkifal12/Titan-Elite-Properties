export namespace PropertyAction {
  export class GetProperties {
    static readonly type = '[Property] GetProperties';
    constructor() {}
  }

  export class updateProperty {
    static readonly type = '[Property] updateProperty';
    constructor(public payload: any) {}
  }
  export class deleteProperty {
    static readonly type = '[Property] deleteProperty';
    constructor(public payload: any) {}
  }
  export class addProperty {
    static readonly type = '[Property] addProperty';
    constructor(public payload: any) {}
  }
}
