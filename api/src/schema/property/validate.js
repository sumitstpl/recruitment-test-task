/* @flow */
import {
  type Context
} from '../../Context';

export default async function (input: any, ctx: Context) {
  const property = { ...input
  };

  const data = await ctx.validate(property)(p =>
    p
    .field('id')
    .fromGlobalId('Property')
    .field('livingSurface', {
      as: 'living_surface'
    })
    .field('landSurface', {
      as: 'land_surface'
    })
    .field('numberOfRooms', {
      as: 'number_of_rooms'
    })
    .field('numberOfParkings', {
      as: 'number_of_parkings'
    })
    .isFloat({
      min: 20,
      max: 5000
    }),
  );

  return data;
}
