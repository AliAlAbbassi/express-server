const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://mern:mongodb@cluster0.bii6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    console.log(`Mongodb connected ${conn.connection.host}`)
  } catch (error) {
    console.log('err', error)
  }
}

module.exports = connectDB
