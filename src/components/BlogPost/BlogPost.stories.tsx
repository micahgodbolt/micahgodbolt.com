import React from 'react';
import { storiesOf } from '@storybook/react';
import { BlogPost } from './BlogPost';

storiesOf(`BlogPosts`, module).add(`default`, () => <BlogPost body="a" title="1" date="1" />);
