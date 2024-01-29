import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm';

export class GenericRepository<T extends ObjectLiteral> extends Repository<T> {
  async getAll() {
    return this.find();
  }

  protected async queryWithNamedPlaceHolders(sql: string, namedPlaceholders: ObjectLiteral) {
    const [query, parameters] = this.manager.connection.driver.escapeQueryWithParameters(
      sql,
      namedPlaceholders,
      {}
    );

    return this.manager.query(query, parameters);
  }

  async getCount() {
    return this.count();
  }

  async isExists(options: FindOneOptions<T>) {
    const result = await this.findOne(options);
    return result !== null;
  }
}
