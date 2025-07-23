
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('products',{
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(100)', notNull: true },
      description: { type: 'TEXT' },
      price: { type: 'NUMERIC', notNull: true },
      quantity: { type: 'integer', notNull: true }  // Fixed here
    });
};


exports.down = (pgm) => {
    pgm.dropTable('products')
};
