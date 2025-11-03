<script lang="ts">
    let { filterSelected, setFilter } = $props();
</script>

<select bind:value={filterSelected} onchange={(e) => setFilter((e.target as HTMLSelectElement)?.value)} placeholder="filter by completion">
    <option value="all">All</option>
    <option value="active">In Progress</option>
    <option value="completed">Completed</option>
</select>

<style>
    select {
        margin: 10px 0;
        padding: 5px;
        font-size: 16px;
    }
</style>