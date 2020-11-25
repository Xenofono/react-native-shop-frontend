import CartItemModel from "./CartItemModel";

export default class OrderModel {
  private _id: number;
  private _created: Date;
  private _items: CartItemModel[];
  private _total: number;
  private _expedited?: Date;

  constructor(
    id: number,
    created: Date,
    items: CartItemModel[],
    total: number,
    expedited?: Date
  ) {
    this._id = id;
    this._created = created;
    this._items = items;
    this._total = total;
    this._expedited = expedited;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get created(): Date {
    return this._created;
  }

  public set created(created: Date) {
    this._created = created;
  }

  public get expedited(): any {
    return this._expedited ? this._expedited : false;
  }

  public set expedited(expedited: any) {
    this._expedited = expedited;
  }

  public get items(): CartItemModel[] {
    return this._items;
  }

  public get total(): number {
    return this._total;
  }

  public set total(total: number) {
    this._total = total;
  }

  public readableDate = () => this._created.toLocaleString("sv-SE");

  public expeditedReadableDate = () => {
    return this._expedited ? this._expedited.toLocaleString("sv-SE") : null;
  };
}
