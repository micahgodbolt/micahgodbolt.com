import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

export const BlogEntry = (data: any) => {
  useStaticQuery(
    graphql`
      query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    `
  );

  console.log("data", data);

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: "hi" }}
        />
      </div>
    </div>
  );
};

export default BlogEntry;
