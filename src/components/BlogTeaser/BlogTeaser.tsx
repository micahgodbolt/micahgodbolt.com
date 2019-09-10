import React from 'react';
import { Link } from 'gatsby';
import './BlogTeaser.scss';

interface IBlogTeaserProps extends React.HTMLAttributes<HTMLElement> {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export const BlogTeaser = (props: IBlogTeaserProps) => {
  const { slug, title, date, excerpt, ...rest } = props;
  return (
    <div {...rest} className="BlogTeaser">
      <h3 className="blog-teaser-title">
        <Link to={slug}>{title}</Link>
      </h3>
      <p className="blog-teaser-date">{date}</p>
      <p> {excerpt} </p>
    </div>
  );
};
