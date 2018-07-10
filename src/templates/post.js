import React from "react";

export default ({ data }) => {
  console.log(`\n`, data.allFile.edges)
  return (
    <div>
      <h4>{data.allFile.edges[0].node.fields.fileHeader}</h4>
       <audio src={data.allFile.edges[1].node.publicURL} controls="controls">
      Your browser does not support the audio element.
      </audio>

      <br></br>
      <embed src= {data.allFile.edges[0].node.publicURL + "#zoom=150"} width="1300" height="1700" type='application/pdf'></embed>
    </div>
  );
};


export const query = graphql`
  query BlogPostQuery($slug: String!) {
    allFile(
      filter: {fields: {slug: {eq: $slug}}}
    ){
      totalCount,
      edges{
        node{
          id
          size
          relativePath
          extension
          publicURL
          fields{
            slug
            fileId
            fileHeader
          }
        }
      }
    }
  }
`;