export const getStrapiMedia = (url: string) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${url}`;
}