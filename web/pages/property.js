/* @flow */
import * as React from 'react';
import { graphql } from 'react-relay';
import { nextQuery } from '../controls/relay';
import { Property } from '../shared/Property';

import type { propertyQuery } from './__generated__/propertyQuery.graphql';

const PropertyPage = props => {
return (<Property property={props.data?.properties} />);
} 

const NULL_PROPERTY_ID =
  'UHJvcGVydHk6NjY0NjUwZTYtZWNjYy0xMWU4LWJlM2YtMGI4ZWYxMDFmN2E0';

const PropertyP = nextQuery<propertyQuery, null>(ctx => ({
  query: graphql`
    query propertyQuery {
      properties {
        edges {
          node {
            id
            livingSurface
            landSurface
            numberOfRooms
            numberOfParkings
            createdAt
          }
        }
      }
    }
  `,
  variables: {
    propertyId: ctx.query.propertyId,
  },
  cacheStrategy: 'cache-first',
}))(PropertyPage);

export default PropertyP;
