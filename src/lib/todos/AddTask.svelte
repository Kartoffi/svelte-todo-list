<script lang="ts">
    let { addTask } = $props();
    let input = $state('');

    function onsubmit(e: Event) {
        e.preventDefault();
        addTask(input);
        input = '';
    }
</script>

<form {onsubmit}>
    <input type="text" placeholder="Add task" bind:value={input}>
</form>