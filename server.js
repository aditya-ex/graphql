const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bodyParser = require("body-parser");
// const users = require("./routes/users");

const schema = buildSchema(`type Query{
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
}`);

const root = {
  quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'take it easy' : null
  }
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require("dotenv").config();

app.use(express.json());
app.use("/user", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
