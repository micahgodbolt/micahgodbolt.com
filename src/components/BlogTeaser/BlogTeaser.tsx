import React from "react";
import {Link} from "gatsby";

interface IBlogTeaserProps extends React.HTMLAttributes<HTMLElement> {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export const BlogTeaser = (props: IBlogTeaserProps) => {

  const {slug, title, date, excerpt, ...rest} = props;
  return (
    <div {...rest} >
      <h3>
        <Link to={slug}>{title}</Link>
      </h3>
      <small>{date}</small>
      <p> {excerpt} </p>
    </div>
  );
};
