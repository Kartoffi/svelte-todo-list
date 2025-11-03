
<script>
    import remove from '$lib/assets/remove.svg';
    let { task, removeTask, onToggle } = $props();
</script>

<div
    class="task {task?.done ? 'done' : ''}"
    role="button"
    tabindex="0"
    onclick={() => onToggle(task.id)}
    onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); onToggle(task.id);
        }
    }}
>
    <div class="task-name">
        <input class="checkbox" type="checkbox" checked={task.done} onchange={() => onToggle(task.id)} onclick={(e) => e.stopPropagation()}>
        <li class:done={task?.done}>{task?.text}</li>
    </div>
    <button class="button-remove"  onclick={(e) => { e.stopPropagation(); removeTask(task?.id); }}>
        <img src={remove} alt="Delete task" width="16" height="16"/>
    </button>
</div>

<style lang="scss">
    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #e4378d;
        padding: 0px 15px;

        &-name {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }

    li {
        list-style: none;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: normal;
        font-size: 0.8rem;
        padding: 15px 0;
    }

    .checkbox {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .done {
        border-color: #ccc;
        
        & li {
            text-decoration: line-through;
            opacity: 0.7;
        }
    }

    .button-remove {
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }
</style>