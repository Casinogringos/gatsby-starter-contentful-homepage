import * as React from "react"
import { graphql } from "gatsby"
import { Container, Heading } from "./ui"
import Brand from "./brand"

export default function BrandList(props) {
  return (
    <Container width="narrow">
      <Heading>{props.title}</Heading>
      {props.content.map((brand, i) => (
        <Brand key={brand.id} {...brand} />
      ))}
    </Container>
  )
}


export const query = graphql`
  fragment HomepageBrandListContent on HomepageBrandList {
      id
      title
      content {
        id
        ...HomepageBrandContent
      }
  }
`
