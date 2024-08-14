<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let files: FileList;
</script>

<div class="flex flex-col">
	{#if field.before}
		{@html field.before}
	{/if}
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}
		{#if field.validate !== undefined}<span class="text-red-500">*</span>{/if}</label
	>
	<input
		type="file"
		name={key}
		id={key}
		class="sr-only"
		accept={field.validate?.mimeTypes ? field.validate?.mimeTypes.join(',') : '*'}
		multiple={field.multiple}
		bind:files
	/>
	<label
		for={key}
		class={`w-full border ${error ? 'border-ninjaFormKit-error  dark:border-ninjaFormKit-errorDark' : 'border-ninjaFormKit-border dark:border-ninjaFormKit-borderDark'} rounded h-32 flex flex-col justify-center items-center cursor-pointer bg-ninjaFormKit-inputBg dark:bg-ninjaFormKit-inputBgDark text-ninjaFormKit-placeholder dark:text-ninjaFormKit-placeholderDark`}
	>
		<Icon icon="material-symbols:upload" class=" w-12 h-12" />
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
</div>
