<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
</script>

<div class="flex justify-start">
	<button
		type="submit"
		name={key}
		class="py-2 px-6 inline-flex bg-ninjaFormKit-default dark:bg-ninjaFormKit-defaultDark rounded text-ninjaFormKit-buttonText dark:text-ninjaFormKit-buttonTextDark items-center transiton-bg duration-75 hover:bg-primary-dark justify-center"
		disabled={field.disabled}
	>
		{#if field.icon}
			<Icon icon={field.icon} class="mr-2" />
		{/if}
		{field.label}
	</button>
</div>
