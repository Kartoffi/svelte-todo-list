
<script>
    let { task, removeTask, onToggle } = $props();
</script>

<input type="checkbox" checked={task.done} onchange={() => onToggle(task.id)}>
<li class:done={task?.done}>{task?.text}</li>
<button onclick={() => removeTask(task?.id)}>remove task from list</button>

<style>
    .done {
        text-decoration: line-through;
    }
</style>