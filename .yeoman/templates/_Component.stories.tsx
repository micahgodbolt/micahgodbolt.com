import React from "react";
import { storiesOf } from "@storybook/react";
import {<%= name %>} from './<%= name %>';

storiesOf(`<%= name %>s`, module).add(`default`, () => (
  <<%= name %>>Hello</<%= name %>>
));
