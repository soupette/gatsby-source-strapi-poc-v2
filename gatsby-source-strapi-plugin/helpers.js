const cleanAttributes = (attributes, currentSchema, allSchemas) => {
  return Object.entries(attributes).reduce((acc, [name, value]) => {
    const attribute = currentSchema.schema.attributes[name];

    // createdAt and updatedAt are not returned by the api
    if (attribute?.type !== 'relation') {
      acc[name] = value;

      return acc;
    }

    const relationSchema = allSchemas.find(({ uid }) => uid === attribute.target);

    if (Array.isArray(value?.data)) {
      return {
        ...acc,
        [name]: value.data.map(({ id, attributes }) =>
          cleanAttributes({ id, ...attributes }, relationSchema, allSchemas),
        ),
      };
    }

    return {
      ...acc,
      [name]: cleanAttributes(
        value.data ? { id: value.data.id, ...value.data.attributes } : {},
        relationSchema,
        allSchemas,
      ),
    };
  }, {});
};

const cleanData = ({ id, attributes }, ctx) => {
  const { contentTypesSchemas, contentTypeUid } = ctx;
  const currentContentTypeSchema = contentTypesSchemas.find(({ uid }) => uid === contentTypeUid);

  return {
    id,
    ...cleanAttributes(attributes, currentContentTypeSchema, contentTypesSchemas),
  };
};

const getEndpoints = ({ collectionTypes, singleTypes }, schemas) => {
  const types = [...(collectionTypes || []), ...(singleTypes || [])];

  const endpoints = schemas
    .filter(
      ({ schema }) =>
        types.findIndex(({ singularName }) => singularName === schema.singularName) !== -1,
    )
    .map(({ schema: { kind, singularName, pluralName }, uid }) => {
      const options = types.find((config) => config.singularName === singularName);
      const { queryParams, populate, queryLimit } = options;

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
        queryParams: queryParams || {
          pagination: {
            limit: queryLimit || -1,
          },
          populate: queryParams?.populate || '*',
        },
      };
    });

  return endpoints;
};

module.exports = { cleanData, getEndpoints };
