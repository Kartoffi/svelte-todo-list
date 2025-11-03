<script lang="ts">
    import Tasks from '$lib/todos/Tasks.svelte';
    import { browser } from '$app/environment';
    import { colorSchemeStore, toggleScheme } from '$lib/stores/colorscheme-store';
    import { onMount } from 'svelte';

    let initialized = false;
    $: currentScheme = $colorSchemeStore;

    onMount(() => {
        initialized = true;
    });
</script>

<div class="page-container">
    {#if browser && initialized}
        <button class="{`button-color-scheme-${currentScheme}`}" aria-label="{`Switch to ${currentScheme} Mode`}" on:click={toggleScheme}></button>
    {/if}
    <Tasks />
</div>

<style>
    button {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }
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

    .button-color-scheme-dark {
        width: var(--color-scheme-button-size);
        height: var(--color-scheme-button-size);
        background: var(--color-x);
        -webkit-mask: url('/src/lib/assets/moon.svg') no-repeat center;
        mask: url('/src/lib/assets/moon.svg') no-repeat center;
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

    .button-color-scheme-light {
        width: var(--color-scheme-button-size);
        height: var(--color-scheme-button-size);
        background: var(--color-color-scheme-button);
        -webkit-mask: url('/src/lib/assets/sun.svg') no-repeat center;
        mask: url('/src/lib/assets/sun.svg') no-repeat center;
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