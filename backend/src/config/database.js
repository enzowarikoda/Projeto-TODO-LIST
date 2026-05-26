export default {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'todosdb',
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    }
}