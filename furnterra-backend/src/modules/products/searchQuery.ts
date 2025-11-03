export function searchQuery(
    search: string,
    fields: string[],
  ) {
    if (!search || typeof search !== 'string') {
      return {};
    }
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return {
      $or: fields.map((field) => ({
        [field]: { $regex: safeSearch, $options: 'i' },
      })),
    };
  }