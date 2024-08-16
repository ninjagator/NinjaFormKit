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
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span>
	{/if}</label
>
<textarea
	id={key}
	name={key}
	class={`nfk-fieldset__field-input nfk-fieldset__field-input--textarea${field.disabled ? ' last: nfk-fieldset__field-input--diabled' : ''}`}
	aria-invalid={error ? 'true' : 'false'}
	disabled={field.disabled}
	placeholder={field.placeholder}>{field.defaultValue ? field.defaultValue : ''}</textarea
>
{#if error}
	<p id={`${key}-error`} class="nfk-fieldset__field-error">
		{error}
	</p>
{/if}
{#if field.after}
	{@html field.after}
{/if}
