import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { inject, injectable } from "inversify";
import { UserService } from "../user.service";
import { loginRequest } from '../../infraestructure/msal-config'
import { User } from "../../model/user";

import { TYPES } from "../../infraestructure/types";
import { fetchAuth } from "./auth-impl-service";


@injectable()
export class UserImplService implements UserService {

    constructor() {
    }

    async getUser(): Promise<User> {
        const result = await fetchAuth('user', {
            method: 'GET'
        })

        return await result.json()
    }

    async getToken(instance: IPublicClientApplication, account: AccountInfo): Promise<string> {
        const request = {
            ...loginRequest,
            account
        }

        const result = await instance.acquireTokenSilent(request)
        return result.accessToken
    }

}