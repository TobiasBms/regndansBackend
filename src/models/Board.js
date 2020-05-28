const BaseModel = require("./BaseModel");

class Board extends BaseModel {
    static get tableName() {
        return "board"
    };

    static get idColumn() {
        return "boardId"
    }

    static get relationMappings() {

        const User = require("./User");

        return {
            boardUsers: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "board.boardId",
                    through: {
                        from: "board_has_user.boardId",
                        to: "board_has_user.userId"
                    },
                    to: "users.userId"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['boardName'],
            properties: {
                id: {type: 'integer'},
                boardName: {
                    type: 'string',
                    maxLength: 255
                },
                boardDescription: {
                    type: 'string',
                    maxLength: 255
                },
                token: {
                    type: 'string',
                },
                boardInputs: {
                    type: 'text'
                }
            },
            additionalProperties: false
        };
    }
}

module.exports = Board;