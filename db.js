const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mohamadalmasri335_db_user:c3xYXcBeQrdAhhDK@cluster0.dkzpgsg.mongodb.net/payments?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = mongoose;
