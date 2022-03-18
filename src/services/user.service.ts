import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { User } from "../model/user";

export interface UserService {
    getToken(instance: IPublicClientApplication, account: AccountInfo): Promise<string>
    getUser(): Promise<User>
}