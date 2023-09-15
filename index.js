const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const messages = [];

app.get("/", (req, res) => {
  res.json({ message: "Welcome to this application" });
});

app.get("/getMessages", (req, res) => {
  const recentMessage = messages[messages.length - 1];
  if (recentMessage) {
    res.json([recentMessage]);
  } else {
    res.json([]);
  }
});

app.post("/sendMessage", (req, res) => {
  const { text, sender } = req.body;
  if (text && sender) {
    messages.push({ text, sender });
    res.json({ success: true, message: "Message sent successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid message format" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
