export default class ProductModel {
  private _id: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _imageUrl?: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl?: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._price = price;
    this._imageUrl = imageUrl;
  }

  public get id(): number
  {
         return this._id;
     }
 
     public set id(id: number
 ) {
         this._id = id;
     }
 
     public get name(): string
  {
         return this._name;
     }
 
     public set name(name: string
 ) {
         this._name = name;
     }
 
     public get description(): string
  {
         return this._description;
     }
 
     public set description(description: string
 ) {
         this._description = description;
     }
 
     public get price(): number
  {
         return this._price;
     }
 
     public set price(price: number
 ) {
         this._price = price;
     }
 
     public get imageUrl(): string {
         return this._imageUrl ? this._imageUrl : ""
     }
 
     public set imageUrl(imageUrl: string) {
         this._imageUrl = imageUrl
     }
}
