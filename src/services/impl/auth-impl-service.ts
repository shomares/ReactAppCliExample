import { USERTOKEN } from '../../features/user.slice';

export function
    fetchAuth(url: string, params: RequestInit) {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem(USERTOKEN)}`,
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    };

    return params ? fetch(`${import.meta.env.VITE_SERVICE_URL}/api/${url}`, {
        ...params,
        headers
    }) : fetch(`${import.meta.env.VITE_SERVICE_URL}/api/${url}`, {
        headers
    });
}
