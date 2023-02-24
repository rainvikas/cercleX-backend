const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.post("/", booksController.addBook);
router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getById); //middleware will use here between the routes {autentication}
router.put("/:id", booksController.updateBook); //middleware will use here between the routes {autentication, authorization}
router.delete("/:id", booksController.deleteBook); //middleware will use here between the routes {autentication}
router.post("/token", booksController.loginUser);

module.exports = router;
