import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user : req.user.id }).populate("user");
        res.json(tasks);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

export const createTasks = async (req, res) => {
    const { title, description, date} = req.body;
    console.log(req.user);
    const newTask = new Task({
        title,
        description,
        date, 
        user: req.user.id});
    const taskSaved = await newTask.save();
    res.json(taskSaved);
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

export const deleteTasks = async (req, res) => { 
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask)
          return res.status(404).json({ message: "Task not found" });
    
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    
};

export const upadateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new: true});
    res.json({
        message: "Task updated"
    });
};

