<script lang="ts">
    import Tasks from '$lib/todos/Tasks.svelte';
</script>


<div class="page-container">
    <Tasks />
</div>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        height: 100vh;
        min-height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
    :global(body > #svelte) {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .page-container {
        margin: 50px;
        width: calc(100vw - 100px);
        height: calc(100vh - 100px);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }
</style>