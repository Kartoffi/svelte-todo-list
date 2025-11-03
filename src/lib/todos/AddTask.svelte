<script lang="ts">
    let { add, disabled } = $props();
    let input = $state('');

    function onsubmit(e: Event) {
        e.preventDefault();

        if (input.trim().length > 100) {
            return;
        }

        add(input.trim());
        input = '';
    }
</script>

<form {onsubmit}>
    <input type="text" placeholder={disabled ? 'Task limit of 20 reached' : 'Add new task'} bind:value={input} disabled={disabled} />
    <div class={{ "warning": true, "warning--show": input.trim().length > 100 }}>
        <button class="button-warning" aria-label="Warning Button"></button>
        <span>Task cannot exceed 100 characters.</span>
    </div>
</form>


<style lang="scss">
    form {
        position: relative;
        margin-bottom: 5px;
    }

    input {
        padding: 0.5rem;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid var(--color-border);
        background: none;
    }

    input:focus {
        outline: none;
        border-bottom: 1px solid var(--color-border-focus);
    }

    .warning {
        opacity: 0;
        color: var(--color-warning-button);
        font-size: 0.8rem;
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 5px;

        &--show {
            opacity: 100;
        }
    }

    .button-warning {
        width: var(--warning-button-size);
        height: var(--warning-button-size);
        background: var(--color-warning-button);
        -webkit-mask: url('/src/lib/assets/warning.svg') no-repeat center;
        mask: url('/src/lib/assets/warning.svg') no-repeat center;
        mask-size: contain;
        -webkit-mask-size: contain;
        border: none;
        cursor: pointer;
        padding: 0;
        display: inline-block;

        &:hover {
            opacity: 0.7;
        }
    }
</style>