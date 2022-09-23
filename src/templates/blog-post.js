import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../components/ui"
import { avatar as avatarStyle } from "../components/ui.css"
import * as styles from "./blog-post.css"

const Post = props => {

  const post = props.data.contentfulBlogPost;
  console.log("PAGE", post)

  return (
    <Layout {...props} description={props.excerpt}>
      <Container width="narrow">
        <Box paddingY={3}>
          <Heading as="h1" center>
            {post.title}
          </Heading>
          <Space size={4} />
          {post.author && (
            <Box center>
              <Flex>
                {post.author.avatar &&
                  (!!post.author.avatar.gatsbyImageData ? (
                    <Avatar
                      {...post.author.avatar}
                      image={post.author.avatar.gatsbyImageData}
                    />
                  ) : (
                    <img
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      className={avatarStyle}
                    />
                  ))}
                <Text variant="bold">{post.author.name}</Text>
                <Text variant="bold">{post.publishDate}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{post.date}</Text>
          <Space size={4} />
          {post.heroImage && (
            <GatsbyImage
              alt={post.heroImage.alt}
              image={post.heroImage.gatsbyImageData}
            />
          )}
          <div
            className={styles.blogPost}
            dangerouslySetInnerHTML={{
              __html: post.body.body,
            }}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Post


export const postQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
      id
      body {
        body
      }
      publishDate(locale: "sv-SE", formatString: "MMMM DD, YYYY")
      heroImage {
        alt
        gatsbyImageData 
      }
      author {
        name
      }
    }
  }
`