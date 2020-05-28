const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const uuid = require("uuid");
const auth = require("../middleware/auth");
const User = require("../models/User");
const boardExists = async (id, res) => {
  const board = await Board.query().findById(id);
  if (!board)
    return res.status(404).send("The Board with the given ID was not found");
  return board;
};
//Create a new board and add the user who created the board to boardHasUser
router.post("/", auth, async function (req, res) {
  try {
    const composeObj = Object.assign(req.body, { token: uuid.v4() });
    if (composeObj) {
      const board = await User.relatedQuery("boards")
        .for(req.user._id)
        .insert(composeObj);
      res
        .status(200)
        .send({ message: "Board has succesfully been created", board: board });
    }
    res.end();
  } catch (e) {
    console.log("Error:", e.data);
  }
});
//Delete a board
router.delete("/:id", auth, async function (req, res) {
  const id = Number(req.params.id);
  const board = await boardExists(id, res);
  const user = await board
    .$relatedQuery("boardUsers")
    .where("board_has_user.userId", req.user._id);
  //check if user who sent request is a part of the board
  console.log("user", user);
  if (user.length === 0)
    return res
      .status(401)
      .send("You dont have permission to update this board");
  const deletedBoard = await Board.query().deleteById(id);
  console.log(deletedBoard);
  res.status(200).send(`board ${id} was succesfully deleted`);
});
//Update board with submitted data
router.put("/submit/:id", auth, async function (req, res) {
  try {
    const id = Number(req.params.id);
    const board = await Board.query().findById(id);
    //check if board exists
    if (!board)
      res.status(404).send("The Board with the given ID was not found");
    //get users from the board and return an array of them
    const user = await board
      .$relatedQuery("boardUsers")
      .where("board_has_user.userId", req.user._id);
    //check if user who sent request is a part of the board
    if (user.length === 0)
      res.status(401).send("You dont have permission to update this board");
    const updatedBoard = await Board.query().patchAndFetchById(id, {
      boardInputs: req.body.boardInputs,
    });
    res.send(updatedBoard);
  } catch (e) {
    console.log(e);
  }
});


router.post("/:id", async function (req, res) {
  try {
    if (isNaN(req.params.id)) {
      res.status(422);
      throw new Error(
        "You are trying to query on a string instead of a integer"
      );
    } else {
      const boardId = req.params.id;
      const userId = req.body.userId;
      const board = await Board.query().findById(boardId);
      const isInDb = await board
        .$relatedQuery("boardUsers")
        .where("board_has_user.userId", userId);
      console.log(isInDb);
      if (isInDb.length !== 0) {
        console.log("is in array");
        res.end();
      } else {
        console.log("is not in array");
        await board.$relatedQuery("boardUsers").for(boardId).relate(userId);
      }
    }
    res.end();
  } catch (e) {
    res.end("Error no user or board with the given id");
  }
});



//get a board from token or ID
router.get("/:id", async function (req, res) {
    try {
        const board = await Board.query().where('BoardId', req.params.id).orWhere('token', req.params.id)
        if(board.length === 0) return res.status(404).send("No board with given id or token found");
        res.send(board[0])
    } catch (e) {
        console.log(e)
    }
});
//get all the users who are member of a board
router.get("/members/:id", async function (req, res) {
  const id = Number(req.params.id);
  try {
    const board = await Board.query().findById(id);
    const users = await board.$relatedQuery("boardUsers");
    res.json(users);
  } catch (e) {
    console.error(e);
  }
  res.end();
});
module.exports = router;
