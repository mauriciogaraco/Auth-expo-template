


export interface User {
  email:string
  name:string
  role: "USER_ROLE" | "ADMIN_ROLE"
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
export interface Product {
  _id: string | number,
  title: string,
  icon: string,
  description: string,
  librery: string,
  color: string,
  img?: string 
}
export interface ProductResponse {

  total: number,
items: Product[]
}

export interface AuthToken {
  token: string;
  currentUser: User
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




export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  blurHash: string;
}

