const { Book } = require('../models'); 

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },
    book: async (parent, { _id }) => {
      return Book.findById(_id);
    },
  },
  Mutation: {
    addBook: async (parent, args) => {
      return Book.create(args);
    },
    removeBook: async (parent, { _id }) => {
      return Book.findByIdAndDelete(_id);
    },
  },
};

module.exports = { resolvers };
