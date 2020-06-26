import { Product } from 'src/app/shared/models/product.model';
import * as productActions from './product.action';

export interface ProductsState {
    products: Product[];
}
export const initialState: ProductsState = {
    products: []
}

export function ProductReducer(state: ProductsState = initialState, action: productActions.Actions) {
    switch (action.type) {
        case productActions.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case productActions.ADD_PRODUCTS:
            return {
                ...state,
                    products: [...state.products, ...action.payload]
            }
        case productActions.UPDATE_PRODUCT:
            const filteredProducts = state.products.filter(product => {
                return product.id !== action.payload.id;
            });
            return {
                ...state,
                products: [...filteredProducts, action.payload]
            }
        case productActions.DELETE_PRODUCT:
            const leftOverProducts = state.products.filter(product => {
                return product.id !== action.payload;
            });
            return {
                ...state,
                products: [...leftOverProducts]
            }
        default:
            return {
                ...state
            }
    }
}