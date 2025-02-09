const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.get("/api/users", (request, response) => {
  response.json("users ok")
})







// To capture all bad URLs
app.all('*', (req, res, next) => {
    res.status(404).send({message: 'path not found'})
})



app.listen(4000);
