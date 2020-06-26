import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from '../products/store/product.reducer';

export interface AppState {
    productsList: fromProducts.ProductsState;
}

export const appReducer: ActionReducerMap<AppState> = {
    productsList: fromProducts.ProductReducer
}