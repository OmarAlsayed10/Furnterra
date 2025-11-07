export const transformImageUrl = (imageUrl: string, baseUrl: string = 'http://localhost:3000'): string => {
    if (!imageUrl) return ""
    if (imageUrl.startsWith("http"))
        return imageUrl

    const path = imageUrl.replace('./', '')
    const pathWithSlash = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${pathWithSlash}`
}

export function transformImages(item: any, baseUrl: string = 'http://localhost:3000') {
    if (Array.isArray(item)) {
        return item.map(item => {
            return transformSingleImageUrl(item, baseUrl)
        })
    }
    return transformSingleImageUrl(item, baseUrl)
}

const transformSingleImageUrl = (item: any, baseUrl: string) => {
    // Normalize legacy `image` field to `images`
    if (item?.image?.length && !item?.images?.length) {
        item.images = item.image.map((img: string) => transformImageUrl(img, baseUrl));
    }

    // Transform `images` to absolute URLs
    if (item?.images?.length) {
        item.images = item.images.map((img: string) =>
            transformImageUrl(img, baseUrl)
        );
    }
    return item;
}
