const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ewhtdrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

   const volunteerCollection = client.db('volunteerDB').collection('volunteer')

   app.get('/volunteer',async (req, res) =>{
      const result = await volunteerCollection.find().toArray()
      res.send(result)
   })

   app.post('/volunteer', async(req, res) =>{
    const volunteer = req.body;
    const result = await volunteerCollection.insertOne(volunteer)
    res.send(result)
   })


   app.delete('/volunteer/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)};
    const result = await volunteerCollection.deleteOne(query)
    res.send(result)
   })



  } finally {
    
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
   res.send('my server is running.')
})

app.listen(port, () =>{
   console.log('My server is running on port : ', port);
})