
<script lang="ts">
	import '../app.scss';
	import favicon from '$lib/assets/favicon.svg';
	import { colorSchemeStore } from '$lib/stores/colorscheme-store';

let { children } = $props();

$effect(() => {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.toggle('dark-mode', $colorSchemeStore === 'dark');
	}
});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
