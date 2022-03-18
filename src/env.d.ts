interface ImportMetaEnv {
    readonly VITE_SERVICE_URL: string,
    readonly VITE_CLIENT_ID: string,
    readonly VITE_REDIRECT_URL: string,
    
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}