const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome !',
  });
});
app.listen(PORT, () => console.log(`serving on port ${PORT}`));

module.exports = app;
