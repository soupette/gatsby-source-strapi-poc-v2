import React from "react"
import { graphql } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"

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
          style={{
            display: `flex`,
            flexDirection: `column`,
            padding: 16,
            border: `1px solid #ccc`,
          }}
        >
          <h2>{article.title}</h2>
          <span>By: TODO</span>
          <p>{article.content}</p>
          {/* <GatsbyImage
            image={post.localFile?.childImageSharp?.gatsbyImageData}
            alt={post.imgAlt}
          /> */}
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
        content
      }
    }
  }
`

export default HomePage
