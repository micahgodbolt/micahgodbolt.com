import React from "react";
const ReactMarkdown = require('react-markdown')

import { graphql } from "gatsby";

interface IndexPageProps {
  data: {
    allContentfulPost: {
      edges: Post[];
    };
  };
}

interface Post {
  node: {
    id: string;
    text: {
      text: string;
    };
    title: string;
  };
}

export const pageQuery = graphql`
  {
    allContentfulPost {
      edges {
        node {
          id
          title
          text {
            text
          }
        }
      }
    }
  }
`;

export default (props: IndexPageProps) => {
  const post = props.data.allContentfulPost.edges[0].node;
  console.log(props);
  return <div><ReactMarkdown>{post.text.text}</ReactMarkdown></div>;
};
