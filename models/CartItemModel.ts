// {"productName":"Röd tröja","quantity":3,"sum":0.0}

export default class CartItemModel {

    private _productName: string
    private _quantity: number
    private _sum: number
    private _productId?: number

  constructor(productName: string, quantity: number, sum: number, productId?: number) {
    this._productName = productName;
    this._quantity = quantity;
    this._sum = sum;
    this._productId = productId;
  }

  public get productName(): string {
    return this._productName;
  }

  public set productName(productName: string) {
    this._productName = productName;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get sum(): number {
    return this._sum;
  }

  public set sum(sum: number) {
    this._sum = sum;
  }

  public get productId(): number {
    return this._productId ? this._productId : -1;
  }

  public set productId(productId: number) {
    this._productId = productId;
  }
}
