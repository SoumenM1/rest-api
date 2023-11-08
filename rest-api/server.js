const express = require('express');
const cors = require('cors')
const {mongodb} = require('./db/db.js')
const tasksRouter = require('./routes/route.js');
mongodb()
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
