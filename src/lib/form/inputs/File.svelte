<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let files: FileList;
</script>

{#if field.before}
	{@html field.before}
{/if}
<label for={key} class="nfk-fieldset__field-label"
	>{field.label}
	{#if field.validate !== undefined}<span class="nfk-fieldset__field-label__required">*</span
		>{/if}</label
>
<input
	type="file"
	name={key}
	id={key}
	class="nfk-fieldset__field-file"
	accept={field.validate?.mimeTypes ? field.validate?.mimeTypes.join(',') : '*'}
	multiple={field.multiple}
	bind:files
/>
<label for={key} class={`nfk-fieldset__field-dropzone`}>
	<Icon icon="material-symbols:upload" class="nfk-fieldset__field-dropzone__icon" />
	<p>{field.placeholder}</p>
	{#if files && files.length}
		{#each files as file}
			<p>{file.name}</p>
		{/each}
	{/if}
</label>
{#if error}
	<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
		{error}
	</p>
{/if}
