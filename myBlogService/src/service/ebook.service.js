const connection = require("../app/database.js");
class EbookService {
  async create(filename, mimetype, size, user_id) {
    console.log(filename, mimetype, size, user_id);
    const statement = `insert into ebooks (filename, mimetype, size, user_id) values (?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      user_id,
    ]);
    return result;
  }

  async get() {
    const statement = `
      select e.id as id, e.filename as filename, e.mimetype as mimetype, e.size as size, JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url) as author
      from ebooks as e left join user as u on e.user_id = u.id;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }
}

module.exports = new EbookService();
