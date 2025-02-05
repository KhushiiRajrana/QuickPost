const express=require("express");
const app=express();
const port =8080;
const path=require("path");
const{v4:uuidv4} =require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "Khushi RajRana",
        content: "I Love Coding. It's like solving a new puzzle every day!"
    },
    {
        id: uuidv4(),
        username: "Yash Raj Rana",
        content: "Hard Work is the Key to Success. Stay consistent and results will follow."
    },
    {
        id: uuidv4(),
        username: "Khushi Raj Rana",
        content: "I got selected for my first internship! Excited for this new journey."
    },
    {
        id: uuidv4(),
        username: "Aryan Sharma",
        content: "Just completed my first full-stack project! Learned so much about React and Node.js."
    },
    {
        id: uuidv4(),
        username: "Sneha Verma",
        content: "Reading books has been a game changer for me. Highly recommend 'Atomic Habits'!"
    },
    {
        id: uuidv4(),
        username: "Rohan Mehta",
        content: "Consistency beats motivation. Keep pushing even when you don’t feel like it!"
    },
    {
        id: uuidv4(),
        username: "Ananya Singh",
        content: "AI and Machine Learning are fascinating. Currently learning about neural networks!"
    },
    {
        id: uuidv4(),
        username: "Vikas Kumar",
        content: "Web development is evolving so fast. Keeping up with new trends is crucial!"
    },
    {
        id: uuidv4(),
        username: "Simran Kaur",
        content: "Just started my journey in Open Source. Contributing feels amazing!"
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs",{posts});
});
app.post("/posts",(req,res)=>{
    let {username , content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log("Requested Post ID:", id);

    let post = posts.find((p) => p.id.toString() === id.toString());
    
    console.log("Found Post:", post);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("view.ejs", { post });
});


app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p)=> p.id===id);
    post.content=newContent;
    res.redirect("/posts");

});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id" , (req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=> p.id !==id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening to port : ${8080}`);
});


 