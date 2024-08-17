<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let variant = field.variant || 'text';
	let passwordReveal = false;

	const togglePassword = () => {
		const input = document.getElementById(key) as HTMLInputElement;
		if (input.type === 'password') {
			input.type = 'text';
			passwordReveal = true;
		} else {
			input.type = 'password';
			passwordReveal = false;
		}
	};
</script>

{#if field.before}
	{@html field.before}
{/if}
<label for={key} class="nfk-fieldset__field-label"
	>{field.label}
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span
		>{/if}</label
>

{#if field.icon}
	<Icon icon={field.icon} class="nfk-fieldset__field-input__icon-left" />
{/if}
<input
	type={variant}
	id={key}
	name={key}
	class={`nfk-fieldset__field-input ${variant === 'password' ? 'nfk-fieldset__field-input--icon-right' : ''} ${field.disabled ? 'cursor-not-allowed' : 'cursor-text'}`}
	placeholder={field.placeholder}
	value={field.defaultValue ?? ''}
	aria-invalid={error ? 'true' : 'false'}
	disabled={field.disabled}
/>
{#if field.variant === 'password'}
	<button on:click={togglePassword} type="button" class="nfk-fieldset__field-input__icon-right">
		<Icon icon={passwordReveal ? 'mdi:eye' : 'mdi:eye-off'} />
	</button>
{/if}

{#if error}
	<p aria-errormessage={error} id={`${key}-error`} class="nfk-fieldset__field-error">
		{error}
	</p>
{/if}
{#if field.after}
	{@html field.after}
{/if}
