const getEndpoints = ({ collectionTypes, singleTypes }, schemas) => {
  const types = [...(collectionTypes || []), ...(singleTypes || [])];

  const endpoints = schemas
    .filter(
      ({ schema }) =>
        types.findIndex(({ singularName }) => singularName === schema.singularName) !== -1,
    )
    .map(({ schema: { kind, singularName, pluralName }, uid }) => {
      const options = types.find((config) => config.singularName === singularName);
      const { queryParams, queryLimit } = options;

      if (kind === 'singleType') {
        return {
          singularName,
          kind,
          uid,
          endpoint: `/${singularName}`,
          queryParams: queryParams || {
            populate: '*',
          },
        };
      }

      return {
        singularName,
        pluralName,
        kind,
        uid,
        endpoint: `/${pluralName}`,
        queryParams: {
          ...(queryParams || {}),
          pagination: {
            pageSize: queryLimit || 250,
            page: 1,
          },
          populate: queryParams?.populate || '*',
        },
      };
    });

  return endpoints;
};

module.exports = { getEndpoints };
