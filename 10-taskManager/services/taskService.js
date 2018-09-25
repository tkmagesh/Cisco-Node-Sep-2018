/*var taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Bangalore', isCompleted : true}
];
*/

function getAll(){
	return taskList;
}

function save(taskData, id){
	if (!id){
		taskData.id = taskList.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1;
		taskList.push(taskData);
		return taskData;
	} else {
		var taskToRemove = taskList.filter(function(task){
			return task.id === id;
		});
		if (taskToRemove){
			var taskToUpdate = taskData;
			taskList = taskList.map(function(task){
				return task.id === id ? taskToUpdate : task;
			});
			return taskData;
		} else {
			return false;
		}
	}
}

function remove(id){
	var taskToRemove = taskList.filter(function(task){
		return task.id === id;
	});
	if (taskToRemove){
		taskList = taskList.filter(function(task){
			return task.id !== id;
		});
		return true;
	} else {
		return false;
	}
}

module.exports = { getAll, save, remove };
