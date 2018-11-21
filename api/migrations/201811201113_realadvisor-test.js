module.exports.up = async db => {
  console.log('Create properties table');

  await db.schema.alterTable('properties', async table => {
    table.float('land_surface')
    table.float('number_of_rooms')
    table.int('number_of_parkings')
  });
};

module.exports.down = async db => {
  await db.schema.alterTable('', table => {
    table.dropColumn('');
  });
};

module.exports.config = {
  transaction: true
};
