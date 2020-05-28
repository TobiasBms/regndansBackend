const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// async function getUser(id) {
//     //We use the try catch here because the await blocks the thread.
//     try {
//         //Objection provides multiple ways to work with the database, Here is a simple query example.
//         const person = await User.query().findById(id);
//         //Date fns makes javascript dates easy to work with here is an example of a simple format.
//         if (typeof person.created === "object") {
//             const test = format(person.created, 'yyyy-MM-dd');
//         }
//         return person;
//     } catch (e) {
//         console.error(e);
//     }
// ks
// }

async function createUser(newUser) {
  try {
    const user = await User.query().insert(newUser);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// router.get("/:id", auth, async function (req, res) {
//     const person = await getUser(req.params.id);
//     res.status(200).json({data: person});
// });

router.get("/me", auth, async function(req, res) {
  const user = await User.query()
    .findById(req.user._id)
    .select("userId", "username", "email","imageUrl");
  res.send(user);
});

//get all boards for the current logged in user
router.get("/all", auth, async function (req, res) {
    try{
        const boards = await User.relatedQuery('boards').for(req.user._id)
        res.status(200).send(boards)
    }catch (e) {
        console.error(e);
        res.end();
    }
});
router.put("/image", async function (req,res) {
  try{
    const user = await User.query().findById(req.body.userId).patch({imageUrl: req.body.image});
    res.end("Success")
  }catch (e) {
    console.log(e)
    res.end("error");
  }
});

router.post("/", async function(req, res) {
  const user = await createUser(req.body);
  if (user.statusCode === 400) {
    // not sure how to handle errors yet.
    res.status(user.statusCode).send(user);
    return;
  }
  const token = user.generateAuthToken();
  console.log(token);
  res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
});

module.exports = router;
