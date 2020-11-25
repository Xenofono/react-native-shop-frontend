import ProductModel from "../../models/ProductModel";
import { ProductsActions } from "../actions/products";

interface ProductsStateInterface {
  products: ProductModel[];
}

export default (
  state: ProductsStateInterface = { products: [] },
  action: ProductsActions
) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      const rawProducts = action.payload;
      console.log("HOHOHO");
      const convertedProducts = rawProducts.map(raw => {
          return new ProductModel(raw.id, raw.name, raw.description, raw.price, raw.imageUrl)
      })
      return { ...state, products: convertedProducts };
    case "ADD_TO_CART":
        return {...state}
    default:
      return state;
  }
};

// constructor(id:number, name: string, description: string, price: number, imageUrl?: string){
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.price = price;
//     this.imageUrl = imageUrl;
// }

