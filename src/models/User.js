const {Model} = require("objection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseModel = require("./BaseModel");
const Boardrole = require('./Boardrole');
const Board = require('./Board');

class User extends BaseModel {

    constructor() {
        super();
    }

    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "userId";
    }

    static relationMappings = {
        //This is the key you will look for inside $relatedQuery
        role: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: Boardrole,
            join: {
                from: 'boardrole.roleId',
                to: 'users.roleId'
            }
        },

        boards: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: Board,
            join: {
                from: "users.userId",
                through: {
                    from: "board_has_user.userId",
                    to: "board_has_user.boardId"
                },
                to: "board.boardId"
            }
        }
    };

    // This method is called right before a query().insert is called on the User model
    async $beforeInsert(queryContext) {
        //Check if user email already exist when trying to create a user.
        const email = await User.query().where('email', this.email).first();
        if (email) {
            throw {
                data: {
                    email: '"Email" already exists.'
                },
                statusCode: 400
            };
        }

        // Doing password hashing right before query insert to avoid validation on a hashed password
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    generateAuthToken() {
        const token = jwt.sign({_id: this.userId, email: this.email, username: this.username}, process.env.jwtPrivate);
        console.log(token);
        return token;
    }

    getUsername() { // just to test methods
        return this.username
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'username', 'password'],

            properties: {
                id: {type: 'integer'},
                email: {
                    type: 'string',
                    format: 'email'
                },
                username: {
                    type: 'string',
                    minLength: 5,
                    maxLength: 24
                },
                imageUrl:{
                    type: 'string'
                },
                password: {
                    type: 'string',
                    pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                    /*
                        At least one upper case English letter, (?=.*?[A-Z])
                        At least one lower case English letter, (?=.*?[a-z])
                        At least one digit, (?=.*?[0-9])
                        At least one special character, (?=.*?[#?!@$%^&*-])
                        Minimum eight in length .{8,} (with the anchors)
                    */
                }
            },
            additionalProperties: false
        };
    }
}


module.exports = User;