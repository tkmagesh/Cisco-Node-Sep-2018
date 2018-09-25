var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	newTaskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	taskList.push(newTaskData);
	res.status(201).json(newTaskData);
});

router.put('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var taskToRemove = taskList.filter(function(task){
		return task.id === taskId;
	});
	if (taskToRemove){
		var taskToUpdate = req.body;
		taskList = taskList.map(function(task){
			return task.id === taskId ? taskToUpdate : task;
		});
		res.status(200).json(taskToUpdate);
	} else {
		res.status(404);
	}
});

module.exports = router;