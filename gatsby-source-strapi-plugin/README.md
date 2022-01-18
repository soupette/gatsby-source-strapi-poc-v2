# TODO

- [ ] make sure we always populate the updatedAt field or throws an error during the plugin config validation
- [ ] DZ support
- [ ] components support + extract files from components
- [ ] JSON support https://www.gatsbyjs.com/plugins/gatsby-transformer-json/#gatsby-transformer-json

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
