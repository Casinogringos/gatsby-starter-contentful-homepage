import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { graphql } from "gatsby"

import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui"

function PostCard({ slug, heroImage, title, description, excerpt, author, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {heroImage && (
        <>
          <GatsbyImage alt={heroImage.alt} image={heroImage.gatsbyImageData} width={200} height={200} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
      <Text as="p">{description.description}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>Author: {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({ slug, image, title, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
    </BlockLink>
  )
}

const BlogIndex = props => {

  const posts = props.data.allContentfulBlogPost.nodes;

  console.log("POSTS", posts) 

  return (
    <Layout title="Blog">
      <Space size={4} />
      <Container>
        <Box>
          <Heading as="h1">Nyhetas</Heading>
          <FlexList variant="start" gap={4} responsive>
            {posts.map((post) => (
              <Box as="li" background="white" radius="button" key={post.id} padding={4} width="half">
                <PostCard {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
      </Container>
      <Space size={5} />
    </Layout>
  )
}

export default BlogIndex;

export const blogQuery = graphql`
  query {
    allContentfulBlogPost {
      nodes {
        id
        slug
        title
        author {
          name
        }
        description {
          description
        }
        heroImage {
          id
          alt
          gatsbyImageData (
            width: 200,
            height: 200
          )
        }
      }
    }
  }
`