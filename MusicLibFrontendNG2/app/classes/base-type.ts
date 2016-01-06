export class BaseType{
	constructor(public _id:string, public labels: string[],public properties: Properties,public Album?:any[],public Track?:any[]){}
}

export class Properties{
	constructor(public name:  string,
				public founded: string,
				public length: string,
				public released: string){}
}