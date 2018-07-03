import React from "react";

export default ({ data }) => (
  <div>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>{data.site.siteMetadata.title} is a repository for people who want to learn to play the piano.</p>
  </div>
);


export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
  `