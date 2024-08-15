<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
</script>

<div class="flex flex-col">
	{#if field.before}
		{@html field.before}
	{/if}
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}{#if field.validate !== undefined}<span class="text-red-500">*</span>
		{/if}</label
	>
	<textarea
		id={key}
		name={key}
		class={`border ${error ? 'border-ninjaFormKit-error dark:border-ninjaFormKit-errorDark' : 'border-ninjaFormKit-border'} bg-ninjaFormKit-inputBg dark:bg-ninjaFormKit-inputBgDark text-ninjaFormKit-text dark:text-ninjaFormKit-textDark rounded-md p-2 outline-primary-900 w-full min-h-32 ${field.disabled ? 'cursor-not-allowed' : 'cursor-text'}`}
		aria-invalid={error ? 'true' : 'false'}
		disabled={field.disabled}
		placeholder={field.placeholder}>{field.defaultValue ? field.defaultValue : ''}</textarea
	>
	{#if error}
		<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
			{error}
		</p>
	{/if}
	{#if field.after}
		{@html field.after}
	{/if}
</div>
