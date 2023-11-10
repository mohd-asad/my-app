const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors = require("cors");

const app =express();
app.use(cors());
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
main().catch(err=>console.log(err));

async function main(){
  await mongoose.connect('mongodb+srv://admin-asad:N0_passw0rd@cluster0.ascc5jd.mongodb.net/keeperdb');
}

const noteSchema= new mongoose.Schema({
    title:String,
    content:String,
  }
);
  
  const Note=mongoose.model('Note',noteSchema);

  app.route("/notes")
  .get((req,res)=>{
    Note.find({}, null)
   .then( docs => res.send(docs) )
   .catch( err => res.send(err) );
  })
  .post((req,res)=>{
    const newNote = new Note({
      title:req.body.title,
      content: req.body.content
    })
    newNote.save()
    .then(savedDoc => {
      savedDoc === newNote; // true
    })
    .catch((err)=>{console.log(err)});
  })
  app.delete('/notes/:id', (req, res) => {
    Note.deleteOne(
        {_id: req.params.id}
    )
    .then( () => res.send("note successfully deleted"))
    .catch( err => res.send(err) )
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
}); 