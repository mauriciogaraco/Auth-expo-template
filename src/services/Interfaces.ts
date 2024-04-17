

export interface User {
  email:string
  name:string
  id: string
}
export interface Ticket {
  
    _id: string,
    title: string,
    username: string,
    email: string,
    description: string,
    category: string,
    status: "COMPLETED" | "UNCOMPLETED",
    user: {
        _id: string,
        name: string
    }

}
export interface TicketResponse {
  
    total: number,
  items: Ticket[]
}


export interface AuthToken {
  token: string;
  refresh_token: string;
}

export interface PublicConfigs {
  key:
    | "is_maintenance_management"
    | "management_min_version_ios"
    | "management_min_version_android"
    | "management_url_google_play"
    | "management_url_app_store";
  value: string;
}

export interface Business {
  id: number;
  name: string;
  promotionalText: string;
  description: string;
  email: string;
  color: string;
  slug: string;
  dni: string;
  subscriptionPlanId: number;
  businessCategoryId: number;
  //phones: Array<Phone>;
  businessCategory: BusinessCategory;
  images: Array<Image>;
  socialNetworks: Array<SocialNetwork>;
  logo: Image | null;
  banner: Image;
  availableCurrencies: Array<Currency>;
  address: AddressBusiness;
  subscriptionPlan: SubscriptionPlan;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  type: string | null;
  licenceUntil: string | null;
  mainCurrency: string | null;
  priceSystems: PriceSystem[];
  configurationsKey: Array<ConfigurationKey>;
  mode: string;
  openHours: string;
  footerTicket: string;
}
export interface Branch {
  id: number;
  name: string;
  logo: Image;
  isMain?: boolean;
}

export interface PriceSystem {
  id: number;
  name: string;
  isMain: boolean;
}

export interface SubscriptionPlan {
  name: string;
  code: string;
  description: string;
}

export interface SocialNetwork {
  user: string;
  url: string;
  type: string;
}

export interface AddressBusiness {
  street: string;
  description: string;
  locality: string;
  municipality: { id: string; name: string; code: string };
  province: { id: string; name: string; code: string };
}

export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  blurHash: string;
}

export interface BusinessCategory {
  id: number;
  name: string;
  description: string;
}

export interface ConfigurationKey {
  key: string;
  value: string;
}
// export interface ConfigurationKey {
//   key:
//     | "tax_rate"
//     | "payment_methods_enabled"
//     | "enabled_discounts"
//     | "print_number_order"
//     | "default_method_payment"
//     | "stock_type_products"
//     | "type_products"
//     | "enable_ongoing_orders"
//     | "enable_testing_orders_printing"
//     | "open_cashbox_at_print";
//   value: string;
// }

// export interface BasicNomenclator {
//   id: number;
//   name: string;
//   description?: string;
// }
export interface Currency {
  id: number;
  exchangeRate: number;
  isActive: boolean;
  isMain: boolean;
  name: string;
  code: string;
  symbol: string;
}

export interface UserReduced {
  id: number;
  displayName: string;
  username: string;
  email: string;
  avatar: Image;
}

export interface UserToLogin {
  id: number;
  username: string;
  email: string;
  avatar: Image;
  roles: Array<Role>;
  lastLogin: Date;
}

export interface Role {
  id: number;
  name: string;
  code: string;
}

export interface AreaAccount {
  id: number;
  name: string;
  code: string | null;
}
export interface Area {
  id: number;
  name: string;
  code: string | null;
  description: string;
  type: string;
  isActive: boolean;
  isMainStock: boolean;
  salaryFixed: number;
  enableSalaryByPercent: boolean;
  salaryPercent: number;
  enablePercentAfter: number;
  createAccessPointTicket: boolean;
  allowDirectlyMovements: boolean;
  productionOrderController: boolean;
  transferFoundsAfterClose: boolean;
  allowProductsMultiprice: boolean;
  allowManualPrice: boolean;
  accountId: number;
  accountTagId: number;
  account: AreaAccount;
  accountTag: AreaAccount;
  saleByCategory: boolean;
  saleOnlyMyStock: boolean;
  stockAreaId: number | null;
 // salesCategories: SimpleSalesCategory[];
  images: string[];
  stockArea: SimpleArea;
  defaultPaymentMethod: string;
  defaultPaymentCurrency: string;
}
/*
export interface SimpleSalesCategory
  extends Pick<SalesCategory, "id" | "name" | "image"> {}
*/
export interface SimpleArea extends Pick<Area, "id" | "name" | "description"> {}

export interface CashRegisterOperation {
  id: number;
  amount: number;
  codeCurrency: string;
  observations: string;
 
  //type: accountOperationType;
  //economicCycleId: number;
  //areaId: number;
  createdAt: Date;
  madeBy: {
    id: number;
    username: string;
    displayName: string;
    avatar: Image;
  };
}
/*
export interface Product {
  id: number;
  name: string;
  salesCode: string;
  description: string;
  promotionalText: string;
  type: productType;
  showForSale: boolean;
  stockLimit: boolean;
  showWhenOutStock: boolean;
  showRemainQuantities: boolean;
  isPublicVisible: boolean;
  qrCode: string;

  totalQuantity: number;
  stockType: productStockType;
  measure: measureType;
  alertLimit: number;
  isAlertable: boolean;
  isAccountable: boolean;
  averageCost: number;

  isAddon: boolean;
  averagePreparationTime: number;
  elaborationSteps: string;
  images: Array<Image>;

  businessId: number;
  salesCategoryId: number;
  productCategoryId: number;
  preparationAreaId: number;
  createdAt: Date;
  productCategory: ProductCategory;
  salesCategory: SalesCategory;
  stockAreaProducts: Array<StockAreaProduct>;
  prices: Array<ProductPrice>;

  quantity: number;
  areaId: number;
  availableAddons?: Array<Addon>;
  listProductionAreas?: Array<Area>;
  listManufacturations?: Array<Manufacturations>;

  combo: Array<Product>;
  onSale: boolean;
  suggested: boolean;
  onSalePrice: Price;

  universalCode: number;
  attributes: Array<ServerAttributeInterface>;

  visibleOnline: boolean;

  supplies: Supply[];
  compositions: CompositionsInterface[];
  // variations: ServerVariationInterface[];
  fixedCosts: FixedCost[];
  supplierId: string | null;
  supplierName: string | null;
  externalId: number;
  newArrival: boolean;
  newArrivalAt: string;
  stockVariations?: StockVariationInterface[];
  stockQuantity?: number;
  variations: Array<VariationInterface>;
}

export interface SuppliesInterface {
  id: number;
  quantity: number;
  supply: {
    id: number;
    name: string;
    averageCost: number;
    measure: string;
    type: string;
  };
}

export interface Supplier {
  id: number;
  name: string;
  observations: null;
  businessId: number;
  updatedAt: string;
  createdAt: string;
  addressId: number;
  deletedAt: string;
  imageId: number;
  image: Image | null;
  address: OnlineAddressInterface;
  phones: Array<Phones>;
}

export interface CompositionsInterface {
  id: number;
  quantity: number;
  composed: {
    id: number;
    name: string;
    averageCost: number;
    measure: string;
    type: string;
  };
  variation: { id: number; name: string; quantity: number };
}

export interface StockVariationInterface {
  id: number;
  quantity: number;
  variationId: number;
  variation: VariationInterface;
}

export interface VariationInterface {
  id: number;
  name: string;
  description: string;
  onSale: boolean;
  price: PriceInvoice;
  onSalePrice: PriceInvoice;
  image: Image;
  attributes: Array<AttributeInterface>;
}

export interface ServerAttributeInterface {
  id: number;
  name: string;
  code: string;
  value: string;
}

export interface AttributeInterface {
  name: string;
  code: string;
  value: string;
}
// export interface Options {
//   id: number;
//   name: string;
//   code: string;
//   value: string;
// }

// export interface AttributeTableInterface {
//   id?: number;
//   active?: boolean;
//   name: string;
//   code: string;
//   options_value: Options[];
//   options: string[];
// }

// export interface VariationsInterface {
//   id: number;
//   name: string;
//   description: string;
//   onSale: boolean;
//   price: {
//     codeCurrency: string;
//     amount: number;
//   };
//   onSalePrice: string;
//   image: Image[];
//   attributes: AttributeVariationsInterfaces[];
// }

export interface ValuesRadio {
  label: string;
  value: string;
}

export interface RadioOptions {
  label: string;
  name: string;
  values: ValuesRadio[];
  value_default?: string;
}

export interface Manufacturations {
  id: number;
  name: string;
  description: string;
  measure: string;
  images: Image[];
}

export interface FixedCost {
  id: number;
  costAmount: number;
  description: string;
}

export interface MyArea {
  id: number;
  name: string;
}

export interface MyStockArea {
  id: number;
  name: string;
}

export interface StockAreaProducts {
  id: number;
  quantity: number;
  product: Product;
  variations: Array<StockVariationInterface>;
}

export interface StockAreaProduct {
  id: number;
  quantity: number;
  area: MyArea;
  variations: Array<StockVariationInterface>;
}

export interface Supply {
  id: number;
  quantity: number;
  baseProductId: number;
  supplyId: number;
  name: string;
  measure: string;
  cost: number;
}

export interface StockProduct {
  id: number;
  product: Product;
  quantity: number;
}

export interface StockProductQuery {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  items: Array<StockProduct>;
}

export interface StockMovement {
  id: number;
  quantity: number;
  costBeforeOperation: number;
  parentId: number;
  operation: operation_movements_types;
  description: string;
  status: operation_movement_status_types;
  isOutFromSale: boolean;
  accountable: boolean;
  businessId: number;
  productId: number;
  transformedToId: number;
  areaId: number;
  movedToId: number;
  movedById: number;
  approvedById: number;
  supplierId: number;
  createdAt: string;
  updatedAt: string;
  approvedBy: {
    username: string;
    email: string;
    displayName: string;
  };
  supplier: null;
  movedTo: StockAreaNomenclator;
  price: Price;
  parent: StockMovement;
  childs: Array<StockMovement>;
  area: SimpleArea;
  removedOperationId: number;
  removedOperation: {
    id: number;
    movedBy: { id: number; displayName: string };
    createdAt: string;
    description: string;
  };
  movedBy: UserReduced;
  product: {
    id: number;
    name: string;
    measure: string;
    images: Image[];
  };
  variationId: number | null;
  variation: { id: number; name: string } | null;
}
export interface SimplePrice {
  id: number;
  price: number;
  codeCurrency: string;
  paymentWay?: payments_ways;
}

export interface Price {
  id: number;
  amount: number;
  codeCurrency: string;
  paymentWay?: payments_ways;
}

export interface ProductPrice extends SimplePrice {
  isMain: boolean;
  priceSystemId: number;
}

export interface Addon {
  outStock: boolean;
  id: number;
  name: string;
  salesCode: string;
  description: string;
  prices: Array<ProductPrice>;
  outSale: boolean;
}

export interface SalesCategory {
  id: number;
  name: string;
  description: string;
  image: Image;
  products: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  image: Image | null;
}
export interface Payment {
  id: number;
  amount: number;
  codeCurrency: string;
  paymentWay: payments_ways;
}

export interface ManagedBy {
  id: number;
  username: string;
  displayName: string;
  avatar: Image;
}

export interface OnlineAddressInterface {
  street_1: string;
  street_2: string;
  description: string;
  city: string;
  postalCode: string;
  municipality: { id: number; name: string; code: string };
  province: { id: number; name: string; code: string };
  country: { id: number; name: string; code: string };
}
export interface OnlineBillShippingInterface extends OnlineAddressInterface {
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
}

export interface OnlineClientInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  registrationWay: string;
  birthAt: string;
  observations: string;
  externalId: number;
  address: OnlineAddressInterface;
  phones: Array<Phone>;
  createdAt: string;
}
export interface FundDestination {
  id: number;
  codeCurrency: string;
  paymentWay: string;
  default: boolean;
  area: {
    id: string;
    name: string;
    code: string;
  };
  account: {
    id: string;
    name: string;
    code: string;
  };
  accountTag: {
    id: string;
    name: string;
    code: string;
  };
}
export interface Order {
  id: number;
  amountReturned: PriceInvoice;
  areaSales: Pick<Area, "id" | "name">;
  businessId: number;
  client: Client;
  closedDate: string;
  createdAt: string;
  currenciesPayment: Array<Payment>;
  totalToPay: Array<PriceInvoice>;
  discount: number;
  houseCosted: boolean;
  isForTakeAway: boolean;
  listResources: string;
  managedBy: ManagedBy;
  name: string;
  numberClients: number;
  observations: string;
  operationNumber: number;
  prices: Array<SimplePrice>;
  salesBy: SimpleUser;
  selledProducts: Array<SelledProduct>;
  shippingBy: OnlineBillShippingInterface;
  shippingPrice: Payment;
  status: order_receipt_status;
  taxes: Payment;
  tipPrice: Payment | null;
  totalCost: number;
  updatedAt: string;
  records: Array<OperationsRecordsInterface>;
  tickets: Array<OrderTicket>;
  modifiedPrice: boolean;
  billing: OnlineBillShippingInterface;
  shipping: OnlineBillShippingInterface;
  customerNote: string | null;
  paymentGateway: PaymentGateway;
  origin: string;
  coupons: Array<OrderCoupon>;
  paidAt: string | null;
  couponDiscountPrice: PriceInvoice;
  pickUpInStore: boolean;
  economicCycle: { id: number; openDate: string } | null;
}

export interface OrderCoupon {
  code: string;
  amount: number;
  discountType: string;
}

export interface PaymentGateway {
  id: number;
  externalId: string;
  name: string;
  description: string;
  isActive: boolean;
  paymentWay: string;
}
export interface SimpleUser {
  id: number;
  username: string;
  displayName: string;
}
export interface OrderSelledProduct {
  name: string;
  quantity: number;
  status: string;
}

export interface OrderTicket {
  name: string;
  productionNumber: number;
  createdAt: string;
  preparedBy: User;
  area: AreaReduced;
  selledProducts: Array<OrderSelledProduct>;
  status: string;
}

export interface AreaReduced extends Pick<Area, "id" | "name" | "code"> {}

export interface OperationsRecordsInterface {
  action: string;
  title: string;
  details: string;
  observations: string;
  createdAt: string;
  madeBy: User;
}

export interface Client {
  id: number;
  firstName?: string; //quitar
  lastName?: string; //quitar
  email: string;
  name: string;
  observations: string;
  businessId: number;
  address: Address;
  phones: Array<Phone>;
  updatedAt: string;
  createdAt: string;
  addressId: number;
  deletedAt: string;
}

export interface Person {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  street: string;
  description: string;
  locality: string;
  shippingRegion: ShippingRegion;
  shippingRegionId: number;
}

export interface ShippingRegion {
  id: number;
  name: string;
  price: Price;
}

export interface Phone {
  id: number | null;
  number: string;
  description: string;
}

export interface Phones {
  number: string;
  description: string | null;
  isMain: boolean;
  isAvailable: boolean;
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}

export interface SelledProduct {
  id: number | string;
  name: string;
  quantity: number;
  removedQuantity: number;
  restoredQuantity: number;
  productionNumber: number;
  priceTotal: Price;
  priceUnitary: Price;
  status: selled_products_status;
  observations: string;
  areaId: number;
  orderReceiptId: number;
  productId: number;
  addons: AddonInterface[];
  image: Image;
  createdAt: Date;
  updatedAt: Date;
  type: productType;
  productionTicketId: number;
  productionTicket?: ProductionTicket;
  listProductionAreas?: Array<Area>;
  productionAreaId?: number;
  variationId: number;
  variation: {
    id: number;
    name: string;
  };
}

export interface Resource {
  id: number;
  code: string;
  numberClients: number;
  isAvailable: boolean;
  isReservable: boolean;
  type: "TABLE";
  areaId: number;
  area: {
    name: string;
  };
}

export interface AddonInterface {
  name: string;
  productId: number;
  quantity: number;
  unityPrice: number;
}

export interface ProductionTicket {
  id: number;
  status: "RECEIVED" | "IN_PROCESS" | "DISPATCHED";
  name: string;
  productionNumber: number;
  areaId: number;
  orderReceiptId: number;
  createdAt: Date;
  updatedAt: Date;
  selledProducts: Array<SelledProduct>;
  orderReceipt: Order;

  //ViaSockets
  hasChange?: boolean;
  textChange?: string;
}

export interface DispatchProduct {
  cost: PriceInvoice;
  measure: string;
  name: string;
  price: PriceInvoice;
  productId: number;
  quantity: number;
  universalCode: number;
  variation: { id: number; name: string } | null;
}

export interface Dispatch {
  id: number;
  mode: string;
  status: DispatchStatus;
  products: DispatchProduct[];
  stockAreaFromId?: number | null;
  stockAreaToId: number | null;
  observations?: string;
  createdAt: string;
  stockAreaFrom: StockAreaNomenclator;
  stockAreaTo: StockAreaNomenclator;
  createdBy: UserReduced | null;
  receivedBy: UserReduced | null;
  receivedAt: string;
  rejectedBy: UserReduced | null;
  rejectedAt: string;
}

export interface StockAreaNomenclator {
  id: number;
  name: string;
  code: null;
  business: BusinessCategory;
}

export type DispatchStatus = "ACCEPTED" | "REJECTED" | "CREATED";

export interface EconomicCycle {
  id: number;
  name: string;
  observations: string;
  openDate: string;
  closedDate: string;
  openBy: UserReduced;
  closedBy: UserReduced | null;
  priceSystem: PriceSystem;
  isActive: boolean;
}

export interface PriceSystem {
  id: number;
  name: string;
  isMain: boolean;
}

export interface IpvProduct {
  stockProductId: number;
  productId: number;
  name: string;
  image: string;
  measure: string;
  productCategory: string;
  productCategoryId: number;
  inStock: number;
  initial: number;
  entry: number;
  movements: number;
  outs: number;
  sales: number;
  processed: number;
  waste: number;
}

export interface IpvData {
  products: Array<IpvProduct>;
  //nextAction: "OPEN" | "CLOSED" | "VIEW";
  //economicCycleId: number;
  openAction?: {
    madeAt: Date;
    madeBy: string;
  };
  closedAction?: {
    madeAt: Date;
    madeBy: string;
  };
}

export interface ReportEconomicCycle {
  totalSales: Array<PriceInvoice>;
  taxes: Array<PriceInvoice>;
  totalTips: Array<PriceInvoice>;
  totalCashOperations: Array<{
    amount: number;
    codeCurrency: string;
    operation: cash_register_operations;
    type: accountOperationType;
  }>;
  totalDiscounts: Array<PriceInvoice>;
  totalCommissions: Array<PriceInvoice>; //
  totalShipping: Array<PriceInvoice>;
  totalTipsMainCurrency: PriceInvoice;
  totalCost: PriceInvoice;
  totalGrossRevenue: PriceInvoice;
  totalInCash: Array<PriceInvoice>;
  totalInCashAfterOperations: Array<PriceInvoice>;
  totalSalary: PriceInvoice;
  totalIncomesNotInCash: Array<{
    amount: number;
    codeCurrency: string;
    paymentWay: string;
  }>;
  totalHouseCosted: Array<PriceInvoice>;
}

export type PriceInvoice = { amount: number; codeCurrency: string };
export interface CashOperation extends PriceInvoice {
  type: accountOperationType;
  operation: cash_register_operations;
}
export interface CashRegisterArqueo {
  areaId: number;
  name: string;
  totalSales: Array<PriceInvoice>;
  totalSalesInMainCurrency: PriceInvoice;
  taxes: Array<PriceInvoice>;
  totalTips: Array<PriceInvoice>;
  totalCashOperations: Array<CashOperation>;
  totalDiscounts: Array<PriceInvoice>;
  totalShipping: Array<PriceInvoice>;
  totalTipsMainCurrency: PriceInvoice;
  totalInCash: Array<PriceInvoice>;
  totalIncomesNotInCash: Array<{
    amount: number;
    codeCurrency: string;
    paymentWay: string;
  }>;
  totalInCashAfterOperations: Array<PriceInvoice>;
  totalHouseCosted: Array<PriceInvoice>;
  totalSalary: PriceInvoice;
  totalCost: PriceInvoice;
  totalGrossRevenue: PriceInvoice;
  totalCommissions: Array<PriceInvoice>;
}

export interface MostSelledProduct {
  totalSale: number;
  name: string;
  prices: Array<{ codeCurrency: string; price: number }>;
  type: string;
  amountRemain: number;
  averageCost: number;
  images: Array<Image>;
  stockLimit: boolean;
}

export interface GraphSales {
  day: string;
  number: number;
  date: string;
  listEconomicCyclesId: number[];
  totalIncome: number;
  totalSales: number;
  totalCost: number;
  grossProfit: number;
}

export interface GroupSalesInterface {
  id: number;
  name: string;
  totalSales: number;
  totalCost: number;
  grossProfit: number;
  codeCurrency: string;
}

export interface Tip {
  id: number;
  displayName: string;
  username: string;
  totalTips: Array<PriceInvoice>;
  totalTipMainCurrency: PriceInvoice;
}

export interface SelledProductReport {
  totalSales: Array<PriceInvoice>;
  quantitySales: number;
  productId: number;
  name: string;
  salesCategoryId: number;
  salesCategory: string;
  areaSalesId: number;
  areaSales: string;
}

export interface SalesCategoryReport {
  id: number;
  name: string;
}

export interface ProductsCategoryReport {
  id: number;
  name: string;
  // data: Array<IpvProduct>,
}

export interface ProductionOrder {
  id: number;
  // orderProductionId?: number; //For duplicated orders
  status: "ACTIVE" | "CREATED" | "CLOSED";
  observations: string;
  createdAt: string;
  closedDate: string;
  openDate: string;
  totalGoalQuantity: number | null;
  totalProduced: number | null;
  createdBy: UserReduced;
  // businessId: number;
}

export interface ProductionOrderState {
  productionOrder: ProductionOrder;
  rawMateriales: ProductReduced[];
  endProducts: ProductReduced[];
}

export interface ProductReduced {
  productId: number;
  name: string;
  measure: string;
  quantity: number;
  goalQuantity: number;
  realProduced: number;
  image: string | null;
}

export interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}

export interface BankAccount {
  id: number;
  name: string;
  address: string;
  description: string;
  isActive: boolean;
  isBlocked: boolean;
  isPrivate: boolean;
  createdAt: string;
  owner: UserReduced | null;
  actualBalance: Array<PriceInvoice>;
  code: string;
  allowMultiCurrency: boolean;
  definedCurrency: string;
  supply: {
    id: number;
    name: string;
    averageCost: number;
    measure: string;
    type: string;
  };
  createdBy: UserReduced | null;
  businessId: number;
  business: Pick<Business, "id" | "name" | "logo">;
}

export interface BankAccountOperation {
  id: number;
  operation: string;
  description: string;
  createdAt: string;
  madeBy: UserReduced | null;
  amount: PriceInvoice | null;
  createdBy: UserReduced | null;
  accountTag: BankAccountTag | null;
  accountTagId: number | null;
}

export interface BankAccountTag {
  id: number;
  name: string;
  code: string;
}

export interface BalanceBankAccount {
  accountId: number;
  accountName: string;
  currencies: Array<PriceInvoice>;
  active?: boolean;
}

export interface AccountBalanceReport {
  mainCurrency: string;
  result: BalanceBankAccount[];
}

export interface FinancialBankAccount {
  tag: string;
  debit: number;
  credit: number;
  total: number;
}
*/