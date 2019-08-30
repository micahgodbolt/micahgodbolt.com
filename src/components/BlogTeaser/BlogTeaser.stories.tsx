import React from "react";
import { storiesOf } from "@storybook/react";
import {BlogTeaser} from './BlogTeaser';

storiesOf(`BlogTeasers`, module).add(`default`, () => (
  <BlogTeaser>Hello</BlogTeaser>
));
