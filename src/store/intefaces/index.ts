import { User } from "../../services/Interfaces";



export interface LoginDataInterface {


  user: User;

}



export interface GlobalDataInterface {

  user: User;
 
  measures: Array<MeasureInterface>;
  orderStatus: Array<any>;
}

export interface ProductSalesCategoryMeasureInterface {
 
  measures: Array<MeasureInterface>;
}

export interface LoginArgs {
  username: string;
  password: string;
}



export interface CategoryReportInterface {
  key: number;
  label: string;
}

export type CurrencyPerCategory = {
  key: number;
  currencies: Array<string>;
};
export interface SelledProductsReportInterface {
  categories: Array<CategoryReportInterface>;

  currencyPerCategory: Array<CurrencyPerCategory>;
}

export interface StockAreaFiltersInterface {
  page: number;
  areaId: number;
  search: string;
  categoryId: number | null;
}
export interface CashOperationsFiltersInterface {
  page: number;
  economicCycleId: number;
  areaId: number | null;
}
export interface OrderFiltersInterface {
  page: number;
  economicCycleId: number;
  areaSalesId: number | null;
  discount: number | null;
  hasDiscount: boolean | null;
  houseCosted: boolean | null;
  status: string | null;
  paymentWay: string | null;
  modifiedPrice: boolean | null;
}

export type OrderFilterDataType = {
  areaSalesId: number;
  discount: string;
  hasDiscount: boolean;
  houseCosted: boolean;
  status: string;
  paymentWay: string;
  modifiedPrice: boolean;
};

export interface AddProductDataInterface {
  name: string;
  type: string;
  // showForSale: boolean;
  // visibleOnline: boolean;
  prices: { price: number; codeCurrency: string }[];
  salesCategoryId: number;
  productCategoryId: number;
  images: Array<number>;
  measure: string;
  listProductionAreas: Array<number>;
}

export interface EditProductDataInterface {
  id: number;
  data: Partial<ProductDataInterface>;
}
export interface ProductDataInterface {
  name: string;
  averageCost: number;
  description: string;
  type: string;
  showForSale: boolean;
  visibleOnline: boolean;
  prices: { price: number; codeCurrency: string }[];
  salesCategoryId: number;
  productCategoryId: number;
  images: Array<number>;
  measure: string;
  listProductionAreas: Array<number>;
}

export interface MeasureInterface {
  code: string;
  value: string;
}

export interface EditUserDataInterface {
  username: string;
  displayName: string;
  email: string;
  avatar?: number;
}

export interface DispatchOperationData {
  mode: string; // "MOVEMENT";
  products: Array<DispatchProduct>;
  stockAreaFromId: number;
  stockAreaToId: number;
  observations: string;
}

export interface DispatchProduct {
  stockAreaProductId: number;
  quantity: number;
  variationId?: number; //Opcional
}

export interface DispatchFilters {
  page: number;
  status: string;
}

export interface DispatchManageData {

  dispatchId: number;
}

export interface StockMovementFilter {
  page: number;
  areaId: number;
  operation?: string;
}
