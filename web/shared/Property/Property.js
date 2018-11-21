/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import moment from 'moment';
import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

// import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyDeleteMutation } from './__generated__/PropertyDeleteMutation.graphql';
// import PropertyP from '../../pages/property';

// type PropertyData = {|
//   lead?: Property_property,
// |};

// const PropertyFragment = createFragment<PropertyData>(
//   graphql`
//     fragment Property_property on Property {
//       id
//       landSurface
//       livingSurface
//     }
//   `
// );

const PropertyDeleteLead = createMutation<PropertyDeleteMutation, {}>(graphql`
  mutation PropertyDeleteMutation($input: DeletePropertyInput!) {
    deleteProperty(input: $input) {
      deletedPropertyId
    }
  }
`);

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  const { edges } = props && props.property;
  return (
    
    <Flex justifyContent="center">
      <Paper
        css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
      >
      <Link href={{ pathname: '/' }}>
                <Button
                  to="/"
                  color="primary"
                  variant="contained"
                  css={{ marginTop: 10, marginBottom: 10 }}
                >
                  Create New
                </Button>
              </Link>
        <PropertyDeleteLead>
          {({ mutate, mutating }) => (
            <>
              <Typography variant="h6">
                Properties
              </Typography>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Created</TableCell>
                      <TableCell numeric>Living Surface</TableCell>
                      <TableCell numeric>Land Surface</TableCell>
                      <TableCell numeric>Number of rooms</TableCell>
                      <TableCell numeric>Number of parkings</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {edges && edges.map((property, index) => {
                      return (
                        <TableRow key={property.node.id}>
                          <TableCell component="th" scope="row">
                            {moment(property.node.createdAt).fromNow()}
                          </TableCell>
                          <TableCell numeric>{property.node.livingSurface || '-'}</TableCell>
                          <TableCell numeric>{property.node.landSurface || '-'}</TableCell>
                          <TableCell numeric>{property.node.numberOfRooms || '-'}</TableCell>
                          <TableCell numeric>{property.node.numberOfParkings || '-'}</TableCell>
                          <TableCell>
                          <IconButton aria-label="Delete">
                            <DeleteRoundedIcon
                              onClick={()=>mutate(
                                {
                                  "propertyId": property.node.id
                                },
                                (props) => {
                                  console.log(`Deleted property id: ${props.deletedPropertyId}`)
                                  window.location = '/property'

                                }
                              )}
                            />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
        </PropertyDeleteLead>
      </Paper>
    </Flex>

  );
};
