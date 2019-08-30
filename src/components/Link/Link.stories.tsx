import React from "react";
import { storiesOf } from "@storybook/react";
import {Link} from './Link';

storiesOf(`Links`, module).add(`default`, () => (
  <Link>Hello</Link>
));
