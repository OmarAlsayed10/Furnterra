export const transformImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return "";
    return imageUrl;
}

export function transformImages(item: any) {
    if (Array.isArray(item)) {
        return item.map(item => transformSingleImageUrl(item))
    }
    return transformSingleImageUrl(item)
}

const transformSingleImageUrl = (item: any) => {
    if (item?.image?.length && !item?.images?.length) {
        item.images = item.image.map((img: string) => transformImageUrl(img));
    }

    if (item?.images?.length) {
        item.images = item.images.map((img: string) => transformImageUrl(img));
    }
    return item;
}