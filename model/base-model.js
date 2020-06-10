const Sequelize = require('sequelize');
const ModelNotFoundError = require('./exceptions/ModelNotFoundError');

class BaseModel extends Sequelize.Model {
  static async paginate(attribute = {}) {
    if (+attribute.itemsPerPage === -1) {
      const results = await super.findAll(attribute);
      return Promise.all(results.map((d) => d.toJSON()));
    }

    const page = attribute.page && attribute.page > 0 ? parseInt(attribute.page) : 1;
    const itemsPerPage = attribute.itemsPerPage && attribute.itemsPerPage > 0
      ? parseInt(attribute.itemsPerPage)
      : 10;

    const { count, rows } = await super.findAndCountAll({
      ...attribute,
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage
    });

    return {
      rows: await Promise.all(rows.map((r) => r.toJSON())),
      pagination: { count, page, itemsPerPage }
    };
  }

  static async findByPkOrThrow(identifier, options = {}) {
    const resource = await super.findByPk(identifier, options);

    if (resource === null) {
      throw new ModelNotFoundError();
    }

    return resource;
  }

  static async findOneOrThrow(options = {}) {
    const resource = await super.findOne(options);

    if (resource === null) {
      throw new ModelNotFoundError();
    }

    return resource;
  }

  softDelete() {
    return this.update({
      deletedAt: Date.now()
    });
  }
}

module.exports = BaseModel;
