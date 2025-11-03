<script>
    let { task, remove, onToggle } = $props();
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
    <button class="button-remove" onclick={(e) => { e.stopPropagation(); remove(task?.id); }} aria-label="Delete task"></button>
</div>

<style lang="scss">
    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border: 1px solid var(--color-border);
        padding: 0px 15px;
        cursor: pointer;

        &-name {
            display: flex;
            align-items: center;
            gap: 10px;
            user-select: none;
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
        border-color: var(--color-border-done);
        
        & li {
            text-decoration: line-through;
            opacity: 0.7;
        }
    }

    .button-remove {
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
        background: var(--color-x);
        -webkit-mask: url('/src/lib/assets/remove.svg') no-repeat center;
        mask: url('/src/lib/assets/remove.svg') no-repeat center;
        mask-size: contain;
        -webkit-mask-size: contain;
        border: none;
        cursor: pointer;
        padding: 0;
        display: inline-block;
        flex-shrink: 0;
        flex-grow: 0;

        &:hover {
            opacity: 0.7;
        }
    }
</style>