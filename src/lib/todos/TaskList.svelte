
<script lang="ts">
    import TaskItem from "$lib/todos/TaskItem.svelte";
    import { onMount } from 'svelte';
    let { tasks, removeTask, toggleTask } = $props();
    let ul: HTMLUListElement;
    let hasScrollbar = $state(false);

    function checkScrollbar() {
        if (ul) {
            hasScrollbar = ul.scrollHeight > ul.clientHeight;
        }
    }

    onMount(checkScrollbar);
    $effect(() => {
        checkScrollbar();
    });
</script>

<ul bind:this={ul} class:scrollbar={hasScrollbar}>
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
    }
    ul.scrollbar {
        padding-right: 15px;
    }
</style>