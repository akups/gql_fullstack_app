const mongoose = require('mongoose');

async function connectToDb(url) {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected')
  }
  export {connectToDb};