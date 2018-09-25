/*var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];
*/
var taskDb = require('./taskDb');

function getAll(callback){
	taskDb.get(function(err,tasks){
		callback(err, tasks);
	});
}

function save(taskData, id, callback){
	taskDb.get(function(err, tasks){
		if (err){
			return callback(err, null);
		}
		if (!id){
			taskData.id = tasks.reduce(function(result, task){
				return result > task.id ? result : task.id;
			}, 0) + 1;
			tasks.push(taskData);
			taskDb.save(tasks, callback);
		} else {
			var taskToRemove = tasks.filter(function(task){
				return task.id === id;
			});
			if (taskToRemove){
				var taskToUpdate = taskData;
				tasks = tasks.map(function(task){
					return task.id === id ? taskToUpdate : task;
				});
				taskDb.save(tasks, callback);
			} else {
				var notFoundError = new Error();
				notFoundError['type'] = 'NOT_FOUND';
				callback(notFoundError, null);
			}
		}
	})
}

function remove(id, callback){
	taskDb.get(function(err, tasks){
		if (err){
			return callback(err, null);
		}
		var taskToRemove = tasks.filter(function(task){
			return task.id === id;
		});
		if (taskToRemove){
			tasks = tasks.filter(function(task){
				return task.id !== id;
			});
			taskDb.save(tasks, callback);
		} else {
			var notFoundError = new Error();
			notFoundError['type'] = 'NOT_FOUND';
			callback(notFoundError, null);
		}
	});
}

module.exports = { getAll, save, remove };
