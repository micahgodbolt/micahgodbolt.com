import React from "react";
import { storiesOf } from "@storybook/react";
import {BlogPost} from './BlogPost';

storiesOf(`BlogPosts`, module).add(`default`, () => (
  <BlogPost>Hello</BlogPost>
));
