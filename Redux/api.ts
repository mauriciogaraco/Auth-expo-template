import axios from "axios"
import { version } from "react";


const baseURL = 'https://apiwoo.tecopos.com/api/v1' ;

const authApi = axios.create({baseURL} );

export default authApi;