const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    
    if (node.internal.mediaType  === `application/pdf`) {
        const path = createFilePath({ node, getNode}).replace(/\s|\(|\)|\[|\]\<|>/g, '-')

        
        

        createNodeField({
            node,
            name: `slug`,
            value: path,
        });
        createNodeField({
            node,
            name: `fileId`,
            value: node.relativePath.replace('.pdf',''),
        });
        createNodeField({
            node,
            name: `fileHeader`,
            value: node.relativePath.replace('.pdf','').replace(/\//g,' - '),
        });
    }
    if (node.internal.mediaType  === `audio/mpeg`) {
        const path = createFilePath({ node, getNode}).replace(/\s|\(|\)|\[|\]\<|>/g, '-')

        createNodeField({
            node,
            name: `slug`,
            value: path,
        });
        createNodeField({
            node,
            name: `fileId`,
            value: node.relativePath.replace('.mp3',''),
        });
        createNodeField({
            node,
            name: `fileHeader`,
            value: node.relativePath.replace('.mp3','').replace(/\//g,' - '),
        });
    }
    
    
  };

  exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
      graphql(`
        {
            allFile {
            edges {
              node {
                relativePath
                extension
                publicURL
                fields {
                  slug
                  fileId
                  fileHeader
                }
              }
            }
          }
        }
      `
  ).then(result => {
    result.data.allFile.edges.forEach(({ node }) => {
        if(!(node.fields === null)){
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/post.js`),
                context: {
                  // Data passed to context is available in page queries as GraphQL variables.
                  slug: node.fields.slug,
                  fileHeader: node.fields.fileHeader
                },
              })
        }
        
      })
        resolve()
      })
    })
  };

  