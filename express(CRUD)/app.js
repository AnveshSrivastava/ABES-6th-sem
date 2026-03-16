const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [{
    "id": 1,
    "name": "Jon Kaisen",
    "email": "mot@gmail.com"
  },
  {
    "id": 2,
    "name": "Jon Kaisen",
    "email": "mot@gmail.com"
  },
  {
    "id": 3,
    "name": "Jon Kaisen",
    "email": "mot@gmail.com"
  },
  {
    "id": 4,
    "name": "Jon Kaisen",
    "email": "mot@gmail.com"
  },
  {
    "id": 5,
    "name": "Jon Kaisen",
    "email": "mot@gmail.com"
  }];

// app.post('/users', (req, res) => {
//     const { name, email } = req.body;
//     const id = users.length + 1;
//     const newUser = { id, name, email };
//     users.push(newUser);
//     res.status(201).json(newUser);
// }
// );

app.post('/add', (req, res)=> {
    const newStudent = {
        id : users.length + 1,
        ...req.body
    }
    users.push(newStudent);
    res.status(201).json({message: 'Student added successfully', student: users});
})

app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) =>{
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})
// app.put('/users/:id', (req, res) => {
//     const user = users.find(u => u.id === parseInt(req.params.id));
//     if (user) {
//         const { name, email } = req.body;
//         user.name = name || user.name;
//         user.email = email || user.email;
//         res.json(user);
//     } else {
//         res.status(404).json({ message: 'User not found' });
//     }
// });

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});