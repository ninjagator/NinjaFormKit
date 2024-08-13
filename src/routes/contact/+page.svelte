<script>
	import Form from '$lib/form/Form.svelte';
	export let data;
</script>

<div class="w-full mx-auto max-w-96 mt-24">
	<h1 class="text-4xl text-black dark:text-white font-extrabold mb-3">Contact Us</h1>
	<p class="mb-4 text-black dark:text-white">
		Please fill out the form below and we will get back to you as soon as possible.
	</p>
	<Form config={data.formConfig} />
</div>
