const express = require("express");
const app = express();

app.use(express.json())

const blogs = [
    {
        "id": 1,
        "title": "Awesome blog 1",
        "body": "This is blog 1."
    },
    {
        "id": 2,
        "title": "Another Awesome blog ",
        "body": "This is blog 1 some random text."
    }
]

app.get("/", (req, res) => {
    return res.send("it works!!")
})

app.get("/api/blogs", (req, res) => {
    if (req.query.id) {
        const blog = blogs.find(blog => blog.id === parseInt(req.query.id))
        if (blog) return res.send(blog)
        return res.status(404).send(`blog with id ${req.query.id} doesn't exists!`)
    }
    return res.json(blogs)
})

app.post("/api/blogs/add", (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).send("Title and body are required!")
    blogs.push({
        id: blogs.length + 1,
        title,
        body
    })
    return res.status(201).send("new post added!")
})

app.put("/api/blogs", (req, res) => {
    const blog = blogs.find(blog => blog.id === parseInt(req.query.id))
    if (!blog) return res.status(404).send(`blog with id ${req.query.id} doesn't exists!`)
    blog.body = req.body.body
    return res.status(204).send(blog)
})

app.delete("/api/blogs", (req, res) => {
    const blog = blogs.find(blog => blog.id === parseInt(req.query.id))
    if (!blog) return res.status(404).send(`blog with id ${req.query.id} doesn't exists!`)
    blogs.splice(blogs.indexOf(blog), 1)
    // console.log(blogs.indexOf(blog));
    return res.send(`blog with id ${req.query.id} deleted.`)
})

app.listen(3000, () => {
    console.log(`Server started on 3000`);
})

