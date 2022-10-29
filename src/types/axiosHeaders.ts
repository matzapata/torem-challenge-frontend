import { HeadersDefaults } from "axios";

export interface AxiosDefaultHeaders extends HeadersDefaults {
    "Authorization"?: string;
}
