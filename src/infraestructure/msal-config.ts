export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/common", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri:  import.meta.env.VITE_REDIRECT_URL, // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: "https://localhost/logout", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
}

export const loginRequest = {
    scopes: [`api://${import.meta.env.VITE_CLIENT_ID}/access_as_user`]
};