import express, { json } from "express";
import mongoose from "mongoose";
import Students from "./models/student.js";


const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb+srv://khushboo0767be21:Mongo%404321@cluster0.qsgwl0c.mongodb.net/SchoolDB")
.then(()=>{console.log("Database connected")})
.catch((err) =>{console.log(err)})


app.get("/", (req,res)=>{
    res.send("<h1>hello world</h1>");
})

app.post('/addStudent',async(req,res)=>{
    const data=req.body;
    const student=Students(data);
    await student.save();
    res.json("Data Saved Successfully");
})

app.get('/getall',async(req,res)=>{
    const students=await Students.find({});
    res.status(200).json(students);
})
// app.put('/update/:roll', async(req,res)=>{
//     const roll =parseInt(req.params);
//     const student=await Students.find({roll: roll});
//     const data=req.body;
//     student.name = data.name;
//     student.roll = data.roll;
//     student.marks = data.marks;
//     await student.save();
//     res.json("Data Saved Successfully");
    
// })

app.put('/update/:roll', async (req, res) => {
    const roll = parseInt(req.params.roll); // Corrected the usage of req.params.roll
    try {
        const student = await Students.findOne({ roll: roll }); // Use findOne instead of find
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const data = req.body;
        student.name = data.name;
        student.roll = data.roll;
        student.marks = data.marks;

        await student.save();
        res.json("Data Saved Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/update/:roll', async (req, res) => {
    const roll = parseInt(req.params.roll);

    try {
        const student = await Students.findOne({ roll: roll });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const data = req.body;

        if (data.name) {
            student.name = data.name;
        }

        if (data.roll) {
            student.roll = data.roll;
        }

        if (data.marks) {
            student.marks = data.marks;
        }

        await student.save();
        res.json("Data Updated Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/students/:roll', async (req, res) => {
    const roll = parseInt(req.params.roll);

    try {
        const student = await Students.findOne({ roll: roll });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student.name);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/students/:roll', async (req, res) => {
    const roll = parseInt(req.params.roll);

    try {
        const result = await Students.deleteOne({ roll: roll });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.listen(port, (req,res) =>{
    console.log(`Server started on port ${port}`);
})
