import React from 'react';
import { storiesOf } from '@storybook/react';
import { BlogTeaser } from './BlogTeaser';

storiesOf(`BlogTeasers`, module).add(`default`, () => (
  <BlogTeaser slug="1" title="1" date="1" excerpt="1">
    Hello
  </BlogTeaser>
));
