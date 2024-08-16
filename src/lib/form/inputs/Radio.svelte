<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;

	if (!field.options) {
		throw new Error('Radio field must have options');
	}
</script>

<label for={key} class="nfk-fieldset__field-label"
	>{field.label}
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span
		>{/if}</label
>
<div class={`nfk-fieldset__field-radio`}>
	{#each field.options || [] as option, i}
		<div class={`flex items-center`}>
			<input
				type="radio"
				id={key + (i + 1)}
				name={key}
				class="nfk-fieldset__field-radio__input"
				placeholder={field.placeholder}
				value={option.value}
				disabled={field.disabled}
			/>
			<label for={key + (i + 1)} class="nfk-fieldset__field-radio__label">
				{option.label}
			</label>
		</div>
	{/each}
</div>
{#if error}
	<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
		{error}
	</p>
{/if}
