
export const LINKS = [
    {label: "agency", path: "agency"},
    {label: "services", path: "services"},
    {label: "cases", path: "cases"},
    {label: "blog", path: "blog"},
    {label: "contacts", path: "contacts"},
]

export const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const REGEXES = {
    EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    PHONE_NUMBER: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
}

export type Languages = 'ru' | 'en';