import React from "react";
import { graphql } from "gatsby";

interface IAboutProps {
  data: {
    allAirtable: {
      edges: {
        node: {
          data: {
            Link: string;
            Name: string;
          };
        };
      }[];
    };
  };
}

export default (props: IAboutProps) => {
    const { data } = props;
    const entries = data.allAirtable.edges;
  return (
    <div>
      <ul>
        {entries.map((entry, i) => {
          const {
            node: {
              data: { Link: URL, Name }
            }
          } = entry;
          return (
            <li key={i}>
              <a href={URL}>{Name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const pageQuery = graphql`
  query {
  allAirtable(sort: {fields: data___Date}) {
    edges {
      node {
        data {
          Name
          Date
          Link
        }
      }
    }
  }
}

`;
