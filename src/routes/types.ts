import { CreateTickets } from '../screens/products/CreateTickets';



export type MainParamList = {
    AppNavigator: undefined;
    AuthenticationNavigator: undefined;
  };
  export type AppParamList = {
    HomeNavigator: undefined; 
    ProductsNavigator: undefined;
    ProfileNavigator:undefined;
    TabsNavigator: undefined,
  };
  export type AuthenticationParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined; 
  };


  export type TabsParamList = {
    HomeNavigator: undefined;
    ProductsNavigator: undefined;
    ProfileNavigator: undefined;
  };


export type HomeParamList = {
    HomeScreen:undefined;
   NotificationScreen:undefined
  };

  


  export type ProfileParamList = {
    ProfileScreen: undefined;
    EditTickets: {titleScreen: string, titleTicket: string,description:string, email: string, category:string, id:string | number}
    ViewTicket: {titleScreen: string, titleTicket: string,description:string, email: string, category:string}
}
export type ProductsParamList = {
    ProductsScreen: undefined;
    ProducstDetail: {titleScreen: string, category:string}
    CreateTickets: {titleScreen: string, category: string}
}