<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let variant = field.variant || 'text';
</script>

<div class="nfk-fieldset__field-checkbox">
	<input
		type="checkbox"
		id={key}
		name={key}
		class={`nfk-fieldset__field-checkbox__input`}
		placeholder={field.placeholder}
		checked={field.defaultChecked || false}
		disabled={field.disabled}
	/>
	<label for={key} class="nfk-fieldset__field-checkbox__label">{field.label}</label>
</div>
{#if error}
	<p id={`${key}-error`} class="nfk-fieldset__field-error">
		{error}
	</p>
{/if}
