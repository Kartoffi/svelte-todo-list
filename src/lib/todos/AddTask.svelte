<script lang="ts">
    let { addTask, disabled } = $props();
    let input = $state('');

    function onsubmit(e: Event) {
        e.preventDefault();

        if (input.trim().length > 100) {
            return;
        }

        addTask(input.trim());
        input = '';
    }
</script>

<form {onsubmit}>
    <input type="text" placeholder={disabled ? 'Task limit of 20 reached' : 'Add new task'} bind:value={input} disabled={disabled} />
</form>

{#if input.trim().length > 100}
    <p style="color: red; font-size: 0.8rem;">Task cannot exceed 100 characters.</p>
{/if}

<style>
    input {
        padding: 0.5rem;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid black
    }

    input:focus {
        outline: none;
        border-bottom: 1px solid rgb(192, 21, 101);
    }
</style>