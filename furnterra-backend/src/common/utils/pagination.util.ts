export async function paginate(
    model: any,
    page: number = 1,
    limit: number = 15,
    filters: Record<string, any> = {},
    sort = {},
) {

    const skip = (page - 1) * limit;
    const [items, allItems] = await Promise.all([
        model.find(filters).sort(sort).skip(skip).limit(limit).exec(),
        model.countDocuments(filters)
    ])

    const totalPages = Math.ceil(allItems / limit)

    return {
        items,
        pagination: {
            allItems,
            page,
            limit,
            totalPages
        },
    };
}