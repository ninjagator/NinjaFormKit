<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let variant = field.variant || 'text';
</script>

<div class="flex flex-col">
	<div class="flex items-center">
		<input
			type="checkbox"
			id={key}
			name={key}
			class={`${error ? 'border-ninjaFormKit-error  dark:border-ninjaFormKit-errorDark' : 'border-ninjaFormKit-border'} rounded-md p-2 mr-2 w-4 h-4 accent-ninjaFormKit-default dark:accent-ninjaFormKit-defaultDark`}
			placeholder={field.placeholder}
			checked={field.defaultChecked || false}
			disabled={field.disabled}
		/>
		<label for={key} class="text-ninjaFormKit-text dark:text-ninjaFormKit-textDark cursor-pointer"
			>{field.label}</label
		>
	</div>
	{#if error}
		<p class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">{error}</p>
	{/if}
</div>
