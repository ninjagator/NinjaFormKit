<script lang="ts">
	import Form from '$lib/form/Form.svelte';
	export let data;
</script>

<div class="container mx-auto mt-24 p-3">
	<h1 class="text-4xl text-black dark:text-white font-extrabold mb-3">Register</h1>
	<p class="mb-4 text-black dark:text-white">
		Please fill out the form below to register for an account.
	</p>
	<Form config={data.formConfig} />
</div>
