<script lang="ts">
    import AddTask from "$lib/todos/AddTask.svelte";
	import ClearCompletedTasks from "$lib/todos/ClearCompletedTasks.svelte";
    import TaskFilter from "$lib/todos/TaskFilter.svelte";
    import TaskList from "$lib/todos/TaskList.svelte";

    let tasks: { id: string; text: string; done: boolean }[] = $state([]);
    let filterSelected = $state('all');
    let remaining = $derived(remainingTasks());
    let filteredTasks = $derived(filterTasks(filterSelected));

    function addTask(input: string) {
        if (input.trim() === '') return;
        
        tasks.push({
            id: crypto.randomUUID(),
            text: input,
            done: false
        });
    }

    function removeTask(id: string) {
        tasks = tasks.filter(task => task.id !== id);
    }

    function remainingTasks() {
        return tasks.filter(task => !task.done).length;
    }

    function filterTasks(criteria: string) {
        
        if (criteria === 'active') {
            return tasks.filter(task => !task.done);
        }
        
        if (criteria === 'completed') {
            return tasks.filter(task => task.done);
        }

        return tasks;
    }

    function clearDoneTasks() {
        tasks = tasks.filter(task => !task.done);
    }

    function setFilter(value: string) {
        filterSelected = value;
    }

    function toggleTask(id: string) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        );
    }
</script>

<h1> Your To-Dos:</h1>
<AddTask {addTask}/>
<TaskFilter {filterSelected} {remaining} setFilter={setFilter} />
<ClearCompletedTasks {clearDoneTasks} />

<TaskList tasks={filteredTasks} {removeTask} toggleTask={toggleTask} />



<style>
    h1 {
        font-family: Arial, sans-serif;
    }
</style>