<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
</script>

<button type="submit" name={key} class="nfk-fieldset__field-button" disabled={field.disabled}>
	{#if field.icon}
		<Icon icon={field.icon} class="nfk-fieldset__field-button-icon" />
	{/if}
	{field.label}
</button>
