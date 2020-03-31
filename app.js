const express = require("express");
const app = express();

// Set a port to run the server
const PORT = 3000;

// Initialize a project repository
const projects = [{
  id: "1",
  title: "Projeto Green Forest",
  tasks: []
},{
  id: "2",
  title: "Projeto San Paolo",
  tasks: []
},{
  id: "3",
  title: "Projeto Paris",
  tasks: []
}];

// Set the middleware that handles the json files
app.use(express.json());

// Middleware that checks if a project exists
let checkProjectExists = (req, res, next) => {
  const {id} = req.params;
  let project = projects.find(project => project.id == id);
  if(!project){
    return res.status(400).json({
      error: "Project not found"
    })
  }
  return next();
}

// Middleware that checks if an ID already exists
let checkIdExists = (req,res,next) => {
  const {id} = req.body;
  let project = projects.find(project => project.id == id);
  if(project){
    return res.status(400).json({
      error: "ID already exists"
    })
  }
  return next();
}

// Global Middleware that calls all requests and prints (console.log) a request counter
let logRequests = (req,res,next) => {
  console.count("Number of requests");
  next();
}

// Executes global middleware
app.use(logRequests);

// List all projects
app.get("/projects", (req, res) => {
  return res.json(projects);
});

// Get a project filtered by your id
app.get("/projects/:id", checkProjectExists, (req, res) => {
  const {id} = req.params; // route params
  let project = projects.filter((project)=>project.id===id);
  return res.json(project);
});

// Create a new project
app.post("/projects", checkIdExists, (req,res) => {
  const {id, title} = req.body;
  let newProject = {
   id,
   title,
   tasks: [] 
  };
  projects.push(newProject);
  res.json(projects);
});

// Update a project based on its ID
app.put("/projects/:id", checkProjectExists, (req,res) => {
  const {id} = req.params;
  const {title} = req.body;
  let project = projects.forEach((project) => {
    if (project.id === id){
      project.title = title;
    }
  });
  res.json(projects);
});

// Delete a project based on its ID
app.delete("/projects/:id", checkProjectExists, (req, res) => {
  const {id} = req.params;
  //let index = projects.map(project => project.id).indexOf(id);
  let projectIndex = projects.findIndex(project => project.id == id);
  projects.splice(projectIndex, 1);
  res.json(projects);
});

// Create a new task in an existing project
app.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const {title} = req.body;
  const {id} = req.params;
  let project = projects.find(project => project.id == id);
  project.tasks.push(title);
  res.json(projects);
});

// Start the express server on port 3000 (seted)
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}.`));