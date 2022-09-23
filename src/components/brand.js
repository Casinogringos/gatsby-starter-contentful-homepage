// src/components/banner.js
import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Container, BrandTitle, Text, BrandContainer } from "./ui"

export default function Brand(props) {
  return (
    <BrandContainer>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          width={200}
          image={props.image.gatsbyImageData}
        />
      )}
      <div>
        <BrandTitle>{props.title}</BrandTitle>
        <Text>{props.description}</Text>
      </div>
    </BrandContainer>
  )
}

export const query = graphql`
  fragment HomepageBrandContent on HomepageBrand {
    id
    title
    image {
      id
      alt
      gatsbyImageData
    }
    description
  }
`