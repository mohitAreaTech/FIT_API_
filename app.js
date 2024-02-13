require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require("./utils/relation").relation();
const database = require('./utils/database');
const path = require('path')

app.use(cors({
    origin: "*",
}));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const employeeRouter = require("./routes/employeeRoutes");
const authRoutes = require('./routes/authRoutes');
const posRouter = require("./routes/pos");
const adminRoutes = require('./routes/adminRoutes');
const examRouter = require('./routes/training-routes');

app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/pos", posRouter);
app.use("/api/v1/employee", employeeRouter);
app.use('/api/v1/admin', adminRoutes);
app.use("/api/v1/exam", examRouter);

database
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));