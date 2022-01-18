import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const HomePage = ({ data }) => (
  <>
    <h1>Articles</h1>
    <section
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
        gridGap: 16,
      }}
    >
      {data.allStrapiArticle.nodes.map(article => (
        <div
          key={article.id}
          style={{
            display: `flex`,
            flexDirection: `column`,
            padding: 16,
            border: `1px solid #ccc`,
          }}
        >
          <h2>{article.title}</h2>
          <GatsbyImage
            image={article.image?.localFile?.childImageSharp?.gatsbyImageData}
            alt={article?.image?.alternativeText}
          />
          <div>
            <div>
              <span>By: {article.author?.name || "-"}</span>
              <GatsbyImage
                image={
                  article.author?.avatar?.localFile.childImageSharp
                    ?.gatsbyImageData
                }
                alt="author"
              />
            </div>
            <div>
              <span>
                working in: {article.author?.company.name} with optimized
                picture
              </span>

              <GatsbyImage
                image={
                  article.author?.company?.image?.localFile?.childImageSharp
                    ?.gatsbyImageData
                }
                alt="company-picture"
              />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: article.content?.childMarkdownRemark?.html || "",
            }}
          />
        </div>
      ))}
    </section>
  </>
)

export const query = graphql`
  {
    allStrapiArticle {
      nodes {
        id
        title
        content {
          childMarkdownRemark {
            html
          }
        }
        author {
          name
          avatar {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 30, height: 30)
              }
            }
          }
          company {
            name
            image {
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 30, height: 30)
                }
              }
            }
          }
        }
        image {
          alternativeText
          localFile {
            childImageSharp {
              gatsbyImageData(formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`

export default HomePage
