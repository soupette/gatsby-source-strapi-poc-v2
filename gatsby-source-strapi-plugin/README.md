# TODO

- [ ] make sure we always populate the updatedAt field or throws an error during the plugin config validation
- [ ] DZ support
- [ ] components support + extract files from components
- [x] JSON support https://www.gatsbyjs.com/plugins/gatsby-transformer-json/#gatsby-transformer-json

## Working with images:

```js
export const query = graphql`
  {
    allStrapiArticle {
      nodes {
        id
        title
        # richtext content
        content {
          childMarkdownRemark {
            html
          }
        }
        # relation
        author {
          name

          # media field
          avatar {
            # default field for media
            alternativeText

            # processed image
            localFile {
              childImageSharp {
                gatsbyImageData(width: 30, height: 30)
              }
            }
          }

          # relation of author deep nesting
          company {
            name
            # media field
            image {
              alternativeText

              # processed image
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 30, height: 30)
                }
              }
            }
          }
        }

        # media field at the root level
        image {
          alternativeText

          # processed image
          localFile {
            childImageSharp {
              gatsbyImageData(formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`;
```

### JSON fields

Given the following response:

```js
[
  {
    data: {
      id: 1,
      attributes: {
        title: 'My title',
        json: {
          ok: 'cool',
        },
      },
    },
  },
  {
    data: {
      id: 2,
      attributes: {
        title: 'My second title',
        // Note that this is not a plain object, in this case you can find the value of the field with the `content` key
        json: 'this is json',
      },
    },
  },
];
```

You can query this field in GraphiQL as follows

```js
query MyQuery {
  allStrapiArticle {
    nodes {
      id
      json {
        ok
        content
      }
    }
  }
}
```

Here's the response:

```js
{
  "data": {
    "allStrapiArticle": {
      "nodes": [
        {
          "id": 1,
          "json": {
            "ok": "cool",
            "content": null
          }
        },
        {
          "id": 2,
          // Since this is not a plain object in the db you can access the value with the content key
          "json": {
            "ok": null,
            "content": "this is json"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```
