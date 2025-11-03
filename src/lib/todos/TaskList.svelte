
<script lang="ts">
    import TaskItem from "$lib/todos/TaskItem.svelte";
    let { tasks, removeTask, toggleTask } = $props();
</script>

<ul>
    {#each tasks as task}
        <TaskItem {task} {removeTask} onToggle={toggleTask} />
    {/each}
</ul>

<style>
    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0;
        overflow-y: auto;
        scrollbar-gutter: stable;
        padding-right: 15px;
    }
</style>