import React from "react";
import { graphql } from "gatsby";
import { WorkList, IWorkListProps } from "../components/WorkList";

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
  const entries: IWorkListProps["items"] = data.allAirtable.edges.map(i => ({
    text: i.node.data.Name,
    url: i.node.data.Link
  }));
  return <WorkList items={entries} />;
};

export const pageQuery = graphql`
  query {
    allAirtable(sort: { fields: data___Date }) {
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
