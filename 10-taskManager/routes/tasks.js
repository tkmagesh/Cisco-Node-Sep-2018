var express = require('express');
var router = express.Router();

var taskService = require('../services/taskService');


router.get('/', function(req, res, next){
	taskService.getAll(function(err, tasks){
		if (err){
			res.status(500);
		} else {
			res.json(tasks);
		}
	});

});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	taskService.save(newTaskData, null, function(err, newTask){
		if (err){
			return res.status(500);
		}
		res.status(201).json(newTaskData);
	});
	
});

router.put('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var taskToUpdate = req.body;
	taskService.save(taskToUpdate, taskId, function(err, updatedTask){
		if (err){
			if (err.type === 'NOT_FOUND'){
				return res.status(404);
			} else {
				res.status(500);
			}
		} else {
			res.status(200).json(updatedTask);
		}
	});
});

router.delete('/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	if (taskService.remove(taskId)){
		res.status(200).json({});
	} else {
		res.status(404);
	}
});

module.exports = router;