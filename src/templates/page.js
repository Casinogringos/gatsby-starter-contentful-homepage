import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Brand from "../components/brand"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import { Container, Box, Heading, Section, MainHeading, Space, Flex } from "../components/ui"

import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Page = props => {

  const page = props.data.contentfulPage;
  console.log("PAGE", page)

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data
        return (
          <a href={uri} className="underline">
            {children}
          </a>
        )
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2>{children}</h2>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, title } = node.data.target

      return (
        <GatsbyImage
          image={getImage(gatsbyImageData)}
          alt={title}
        />
      )
      },
    },
  }
  
  return (
    <Layout title={page.pageTitle}>
      <Container width="narrow">
        <Section>
          <MainHeading>
            {page.pageTitle}
          </MainHeading>
        <p>{page.pageDescription.pageDescription}</p>
        </Section>
        <h2>{page.brands.listTitle}</h2>
        {page.brands && page.brands.brands.map((brand) => {
          return <Brand key={brand.id} {...brand} />
        })}
        {page.contentBlocks && page.contentBlocks.map((block) => (
          <React.Fragment>
            <Flex gap={4} variant="stretch">
              {block.columns && block.columns.map((column) => (
                <Box background="primary" padding={4} marginY={4} radius="button">
                  <h2>{column.title}</h2>
                  {column.content && (
                    <div>{renderRichText(column.content, options)}</div>
                  )}
                </Box>
              ))}
            </Flex>
            {block.brands && (
              <ul>{block.brands.map((brand) => (<Brand key={brand.id} {...brand} />))}</ul>
            )}
    
            {!block.brands && !block.columns && (
              <Box key={block.id} className="page-content" radius="button" background={block.backgroundColor} padding={4}>
                {renderRichText(block.content, options)}
              </Box>
            )}
          </React.Fragment>
        ))}
      </Container>
      <Space size={5} />
    </Layout>
  )
}

export default Page

export const query = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      pageSlug
      pageTitle
      pageDescription {
        id
        pageDescription
      }
      pageContent {
        raw
      }
      brands {
        listTitle
        brands {
          title
          id
          description
          image {
            id
            alt
            gatsbyImageData(
              width: 150, 
              height: 150,
            )
          }
        }
      }
      contentBlocks {
        ... on ContentfulContentBlock {
          id
          backgroundColor
          content {
            raw
            references {
              ... on ContentfulAsset {
                contentful_id
                title
                description
                gatsbyImageData(
                  placeholder: BLURRED
                )
                __typename
              }
            }
          }
        }
        ... on ContentfulColumnBlock {
          id
          columns {
            title
            content {
              raw
            }
          }
        }
        ... on ContentfulBrandList {
          id
          brands {
            title
            id
            description
            image {
              id
              alt
              gatsbyImageData(
                width: 150, 
                height: 150,
              )
            }
          }
        }
      }
    }
  }
`