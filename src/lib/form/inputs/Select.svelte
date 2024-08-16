<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;

	if (!field.options) {
		throw new Error('Select field must have options');
	}

	let selectedValue = field.defaultValue || '';
</script>

<label for={key} class="nfk-fieldset__field-label"
	>{field.label}
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span
		>{/if}</label
>

<select
	id={key}
	name={key}
	class={`nfk-fieldset__field-input nfk-fieldset__field-input--select`}
	value={selectedValue}
	multiple={field.multiple}
	disabled={field.disabled}
	aria-invalid={error ? 'true' : 'false'}
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
