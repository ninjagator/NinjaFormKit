<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;

	if (!field.options) {
		throw new Error('Select field must have options');
	}

	let selectedValue = field.defaultValue || '';
</script>

<div class="flex flex-col">
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}{#if field.validate !== undefined}<span class="text-red-500">*</span>{/if}</label
	>
	<select
		id={key}
		name={key}
		class={`border ${error ? 'border-ninjaFormKit-error  dark:border-ninjaFormKit-errorDark' : 'border-ninjaFormKit-border'} rounded-md p-2.5 outline-ninjaFormKit-default w-full bg-ninjaFormKit-inputBg dark:bg-ninjaFormKit-inputBgDark text-ninjaFormKit-text dark:text-ninjaFormKit-textDark`}
		value={selectedValue}
		multiple={field.multiple}
	>
		<option value="" disabled selected={!selectedValue}>{field.placeholder}</option>
		{#each field.options || [] as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	{#if error}
		<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
			{error}
		</p>
	{/if}
</div>
