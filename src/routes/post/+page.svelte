<script lang="ts">
	import Form from '$lib/form/Form.svelte';
	export let data;
</script>

<div class="container mx-auto p-32">
	<h1 class="text-4xl text-black dark:text-white font-extrabold mb-3">Create Post</h1>

	<Form config={data.formConfig} />
</div>
