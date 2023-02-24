const Book = require("../model/bookModel");
const jwt = require('jsonwebtoken')

const addBook = async (req, res) => {
  const { name, author, description, price, available } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};

const getAllBooks = async (req, res) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json({ books });
};

const getById = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const { name, author, description, price, available } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

const loginUser = async function (req, res) {
  try {
    let name = req.body.name
    let author = req.body.author

    if (!(isValid(name) && isValid(author))) {
      return res.status(400).send({ msg: " name and author is required " })
    } else {
      let createdBook = await Book.findOne({ name: name, author: author })
      if (!createdBook)
        return res.status(404).send({ msg: "Cannot login as name and author not matched" });
      let token = jwt.sign({ bookId: createdBook._id }, "cercleX")
      res.setHeader("x-auth-token", token);
      res.status(201).send({ msg: " loged in successfully", data: token })
    }
  }
  catch (error) {
    console.log("This is the error:", error.message)
    res.status(500).send({ msg: "server error", err: error })
  }

}

module.exports = { addBook, getAllBooks, getById, updateBook, deleteBook, loginUser }

