import React from "react";

export interface I<%= name %>Props extends React.HTMLAttributes<HTMLElement> {

}


export const <%= name %> = (props: I<%= name %>Props) => {
  return (
    <div {...props} > {props.children}  </div>
  );
};

