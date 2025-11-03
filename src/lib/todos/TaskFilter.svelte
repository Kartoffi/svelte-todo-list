<script lang="ts">
    let { filterSelected, setFilter, remaining } = $props();
</script>

<p>{remaining} {remaining === 1 ? 'task' : 'tasks'} left to do</p>
<select bind:value={filterSelected} onchange={(e) => setFilter((e.target as HTMLSelectElement)?.value)} placeholder="filter by completion">
    <option value="all">All</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
</select>
