
export class TestBytesPdf {

    data: string;
  
    constructor(args?: Partial<TestBytesPdf>) {
      Object.assign(this, args);
    }
  
  }
  
  export class File {
  
    idEvidence: number;
    name: string;
    type: string;
    creationDate: Date;
  
    constructor(args?: Partial<File>) {
      Object.assign(this, args);
    }
  
  }
  
  export class ItemFile extends File {
  
    file: string;
  
    constructor(args?: Partial<ItemFile>) {
      super(args);
      Object.assign(this, args);
    }
  
  }
  
  export class Response<T> {
  
    message: string;
    timestamp: string;
    details: string;
    code: number;
    data: T;
  
  }

  export class requestBody{
    name:string;
    file:string;
  }
    