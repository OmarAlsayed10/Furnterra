export function parseNestedQuery(query: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  const operatorMap: Record<string, string> = {
    gte: '$gte',
    lte: '$lte',
    in: '$in',
    ne: '$ne',
    eq: '$eq',
  };

  for (const [key, value] of Object.entries(query)) {
    const match = key.match(/^(\w+)\[(\w+)\]$/);
    if (match) {
      const [, fieldName, operator] = match;
      const mongoOperator = operatorMap[operator];
      if (!mongoOperator) continue; // ignore unknown operators

      if (!result[fieldName]) {
        result[fieldName] = {};
      }

      const parsedValue = isNaN(Number(value)) ? value : Number(value);
      result[fieldName][mongoOperator] = parsedValue;
    } else {
      result[key] = isNaN(Number(value)) ? value : Number(value);
    }
  }

  return result;
}
