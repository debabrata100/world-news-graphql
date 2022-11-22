const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const $PORT = process.env.PORT || 5000;
app.listen($PORT, () => {
  console.log(`Listening to port: ${$PORT}`);
});
