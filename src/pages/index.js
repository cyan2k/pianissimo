import React from "react";
import Link from "gatsby-link";

function renderIf(node)
{
  if (node.extension == `mp3`) {
    return(
      <audio src={node.publicURL} controls="controls">
      Your browser does not support the audio element.
      </audio>
    );
   
  }
  if (node.extension == `pdf`) {
    return(
      <embed src={node.publicURL} width="100%" height="1500" type='application/pdf'></embed>
    );
   
  }
}



export default ({ data }) => {
  return(
  <div>
    <h1>Welcome!</h1>
    <div>
      <img
        src="https://www.yamaha-keyboard-guide.com/images/xpiano_keyboard_notes.png.pagespeed.ic.rHyaSwO_7M.webp"
        alt="Piano keyboard"
      />
      
    </div>

  </div>
  );
}

export const query = graphql`
  query MyFilesQuery {
    allFile{
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
          publicURL
        }
      }
    }
    
  }
  
  `

