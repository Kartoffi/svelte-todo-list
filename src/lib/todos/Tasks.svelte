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

<div class="tasks">
    <h1> Your To-Dos</h1>
    <AddTask {addTask} disabled={tasks.length === 20}/>
    {#if tasks.length === 0}
    <p>No tasks yet. Add a task to get started!</p>
    {:else}
    <p>{tasks.length} task{tasks.length === 1 ? '' : 's'} total, {remaining} task{remaining === 1 ? '' : 's'} left to do</p>
    {/if}
    {#if tasks.length > 0}
        <div class="inline">
            <TaskFilter {filterSelected} setFilter={setFilter} />
            <ClearCompletedTasks {clearDoneTasks} />
        </div>
    {/if}
    <TaskList tasks={filteredTasks} {removeTask} toggleTask={toggleTask} />
</div>

<style>
    .tasks {
        display: flex;
        flex-direction: column;
    }

    .inline {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    :global(select, button) {
        margin: 10px 0;
        height: 32px;
        font-size: 16px;
        background: none;
        border: 1px solid var(--color-border);
        color: var(--color-text);
        border-radius: 4px;
    }
</style>