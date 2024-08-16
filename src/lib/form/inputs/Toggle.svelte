<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
</script>

{#if field.before}
	{@html field.before}
{/if}
<label for={key} class="nfk-fieldset__field-label"
	>{field.label}
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span
		>{/if}</label
>
<div class={`nfk-fieldset__field-toggle`}>
	<input
		type="checkbox"
		id={key}
		name={key}
		class={`nfk-fieldset__field-toggle__input`}
		placeholder={field.placeholder}
		value={field.defaultValue}
		aria-invalid={error ? 'true' : 'false'}
	/>
	<label for={key} class={`nfk-fieldset__field-toggle__label`}>
		<span class={`nfk-fieldset__field-toggle__label-switch`}></span>
	</label>
</div>
{#if error}
	<p id={`${key}-error`} class="nfk-fieldset__field-error">
		{error}
	</p>
{/if}
{#if field.after}
	{@html field.after}
{/if}
