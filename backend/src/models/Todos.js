import Sequelize, { Model } from "sequelize";

class Todos extends Model {
    static init(sequelize) {
        super.init(
            {
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: true,
                    }
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
            }
        , {sequelize})
    }
}

export default Todos