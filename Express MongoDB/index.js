const express = require("express");
const connectDB = require("./db");
const Student = require("./schema");

const app = express();
app.use(express.json());

connectDB();
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addStudent", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.json({ message: "Student added", student: saved });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.post("/update/:rollNo", async (req, res) => {
    try {
        const updatedStudent = await Student.findOneAndUpdate({
            rollNo: req.params.rollNo
        }, req.body, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student updated", student: updatedStudent });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

app.delete("/delete/:rollNo", async (req, res) => {
    try {
        const deletedStudent = await Student.findOneAndDelete({
            rollNo: req.params.rollNo
        });

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student deleted", student: deletedStudent });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));