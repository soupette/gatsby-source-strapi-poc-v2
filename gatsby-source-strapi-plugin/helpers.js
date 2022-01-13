const cleanData = ({ id, attributes }) => {
  return {
    id,
    ...attributes,
  };
};

const getEndpoints = ({ collectionTypes, singleTypes }, schemas) => {
  const singularNames = [...(collectionTypes || []), ...(singleTypes || [])].map(
    ({ singularName }) => singularName,
  );

  const endpoints = schemas
    .filter(({ schema }) => singularNames.indexOf(schema.singularName) !== -1)
    .map(({ schema: { kind, singularName, pluralName } }) => {
      if (kind === 'singleType') {
        return {
          singularName,
          kind,
          endpoint: `/${singularName}`,
        };
      }

      return {
        singularName,
        pluralName,
        kind,
        endpoint: `/${pluralName}`,
      };
    });

  return endpoints;
};

module.exports = { cleanData, getEndpoints };
