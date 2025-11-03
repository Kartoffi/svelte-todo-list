<script lang="ts">
    import TaskItem from "$lib/todos/TaskItem.svelte";
    let { tasks, removeTask, toggleTask } = $props();
</script>

<ul>
    {#each tasks as task}
        <TaskItem {task} {removeTask} onToggle={toggleTask} />
    {/each}
</ul>