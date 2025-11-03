<script lang="ts">
    import AddTask from "$lib/todos/AddTask.svelte";
	import ClearCompletedTasks from "$lib/todos/ClearCompletedTasks.svelte";
    import TaskFilter from "$lib/todos/TaskFilter.svelte";
    import TaskList from "$lib/todos/TaskList.svelte";
    import { taskStore, addTask, removeTask, toggleTask, clearCompleted } from '$lib/stores/task-store';

    let tasks: { id: string; text: string; done: boolean }[] = $state([]);

    if ($taskStore.length > 0) {
        tasks = $taskStore;
    }

    let filterSelected = $state('all');
    let remaining = $derived(remainingTasks());
    let filteredTasks = $derived(filterTasks(filterSelected));

    function add(input: string) {
        if (input.trim() === '') return;

        const id = crypto.randomUUID();
        
        tasks.push({
            id,
            text: input,
            done: false
        });

        addTask({
            id,
            text: input,
            done: false
        })
    }

    function remove(id: string) {
        tasks = tasks.filter(task => task.id !== id);

        removeTask(id);
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

        clearCompleted();
    }

    function setFilter(value: string) {
        filterSelected = value;
    }

    function toggle(id: string) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        );

        toggleTask(id);
    }
</script>

<div class="tasks">
    <h1> Your To-Dos</h1>
    <AddTask {add} disabled={tasks.length === 20}/>
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
    <TaskList tasks={filteredTasks} {remove} toggleTask={toggle} />
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