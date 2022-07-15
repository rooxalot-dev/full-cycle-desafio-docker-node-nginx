const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const createTableIfNotExists = async (connection) => {
    const checkIfTableExistsQuery = `
    SELECT count(*) as count
    FROM information_schema.TABLES
    WHERE (TABLE_SCHEMA = 'nodedb') AND (TABLE_NAME = 'users')`;

    const createUsersTable = `
    CREATE TABLE users (
        username varchar(500)
    )
    `;

    const promise = new Promise((resolve, reject) => {
        connection.query(checkIfTableExistsQuery, (error, results, fields) => {
            if (error) {
                reject(error);
            } else if (results[0].count > 0) {
                console.log('Tabela users já exste!');
                resolve(true);
            } else {
                console.log('Criando tabela users!');
                connection.query(createUsersTable, function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    console.log('Tabela users criada com sucesso!');
                    resolve(true);
                });
            }
          });
    });

    return promise;
}

const insertUser = async (connection, username) => {
    const insertUserCommand = 'INSERT INTO users VALUES(?)';

    const promise = new Promise((resolve, reject) => {
        console.log('Inserindo usuário na tabela users!');
        connection.query(insertUserCommand, username, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log('usuário inserido na tabela com sucesso!');
                resolve(results);
            }
        });
    });

    return promise;
};

const queryAll = async (connection) => {
    const getAllUsersQuery = 'SELECT username FROM users;';

    const promise = new Promise((resolve, reject) => {
        console.log('Obtendo todos os usuários na tabela users!');
        connection.query(getAllUsersQuery, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log('usuários obtidos com sucesso!');
                const users = results.map((result) => ({
                    username: result.username
                }));

                resolve(users);
            }
        });
    });

    return promise;
};

const getAllUsers = async (username) => {
    const connection = mysql.createConnection(config);
    try {
        const success = await createTableIfNotExists(connection);
        if (success) {
            const allUsers = await queryAll(connection, username);
            return allUsers;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log('Erro ao criar usuário', error);
    } finally {
        connection.end();
    }
};

const saveUser = async (username) => {
    const connection = mysql.createConnection(config);
    try {
        const success = await createTableIfNotExists(connection);
        if (success) {
            const insertedResults = await insertUser(connection, username);
            console.log('insertedResults', insertedResults);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log('Erro ao criar usuário', error);
    } finally {
        connection.end();
    }
};

module.exports = {
    saveUser,
    getAllUsers,
}