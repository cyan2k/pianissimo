import React from "react";
import Link from "gatsby-link";

var mainMenu = [];


function buildMenu(node,index){
  var str = node.relativePath;
  var res = str.split("/");

  if(!(str.includes('.pdf')))
    return;
  
  var menulength = mainMenu.length;

  for (let index = 0; index < menulength; index++) {
    const element = mainMenu[index];
    if(element.Header == res[0])
    {

      var file = {
        FileName: node.fields.fileId.replace(res[0] + '/',''),
        Slug: node.fields.slug
      }
    
      element.Files[element.Files.length] = file;

      return;
    }
      
  }

  var valueMenu = {
    Header: res[0],
    Files: new Array(),
    SubMenu: new Array(),
    EndOfPath: false
  };

  var file = {
    FileName: node.fields.fileId.replace(res[0] + '/',''),
    Slug: node.fields.slug
  }

  valueMenu.Files[0] = file;
  mainMenu[menulength] = valueMenu;

}



function buildSubMenu(parentMenu){
  var subMenu = [];

  parentMenu.Files.forEach(element => {
    var str = element.FileName;
    var res = str.split("/");
    var end = false;

    if(parentMenu.EndOfPath)
      return;

      

    if(!str.includes('/'))
      end = true;



    var subMenulength = subMenu.length;
    var tocontinue=false;

    for (let index = 0; index < subMenu.length; index++) {
      const element_sub = subMenu[index];
      if(element_sub.Header == res[0])
      {
        var file = {
          FileName: element.FileName.replace(res[0] + '/',''),
          Slug: element.Slug
        }
      
        element_sub.Files[element_sub.Files.length] = file;

        tocontinue = true;
        break;
      }
    }

    if(!tocontinue)
    {
      var valueMenu = {
        Header: res[0],
        Files: new Array(),
        SubMenu: new Array(),
        EndOfPath: end
      };

      var file = {
        FileName: element.FileName.replace(res[0] + '/',''),
        Slug: element.Slug
      }
    
      valueMenu.Files[0] = file;
  
      subMenu[subMenulength] = valueMenu;
    }
    

  });
  parentMenu.SubMenu = subMenu;
}





function renderMenu(menuarray, index)
{
  if(index>=menuarray.length)
    return;

  if(!menuarray[index].EndOfPath)
  {
    return (
      <div>
        <details style={{ textShadow: `none`, backgroundImage: `none`,  marginLeft: `1rem`, fontSize: 16 }}>
          <summary>{menuarray[index].Header}</summary>
          {buildSubMenu(menuarray[index])}
          {renderMenu(menuarray[index].SubMenu,0)}
        </details>
        {renderMenu(menuarray,index + 1)}
      </div>
    );
  }
  else
  {
    
    return (
      <div>
      <div style={{ textShadow: `none`, backgroundImage: `none`,  marginLeft: `1rem` }}>
     
        <Link to={menuarray[index].Files[0].Slug}>
          {menuarray[index].Header} 
        </Link>
        <br/>

        
      </div>
      {renderMenu(menuarray,index + 1,0)}
      </div>
    );
  }
  
}

const ListLink = props =>
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>
  


export default ({ children, data }) => (
<div>
<div  style={{  padding: `1.25rem 0rem`, float: `left` }}>
        {data.allFile.edges.map(({ node }, index) =>
          <div>
            {buildMenu(node,index)}
          </div>
        )}
        {renderMenu(mainMenu,0,0)}
</div>
  <div style={{ margin: `0 auto`, maxWidth: 1024, padding: `1.25rem 1rem` }}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>{data.site.siteMetadata.title} - {data.site.siteMetadata.subtitle}</h3>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </header>
	
    {children()}
	
  </div>
  <div>
   </div>
  </div>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title,
        subtitle
      }
    },
    allFile(
      filter: {fields: {slug: {ne: null}}},
      sort: {fields: [relativePath], order: ASC}
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
`