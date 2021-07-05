import { Ingrediant } from "../shared/ingrediant.modal";
export class Recepie{
public name : string;
public description : string;
public imagePath : string;
public ingrediants:Ingrediant[];  
  constructor(name:string , descr:string , imagePath:string,ingrediants:Ingrediant[] ){
    this.name=name;
    this.description=descr;
    this.imagePath=imagePath;
    this.ingrediants=ingrediants;
  } 
}