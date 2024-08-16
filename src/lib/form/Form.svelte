<script lang="ts">
	import { type FormConfig } from '$lib/form/form.config.js';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Text from './inputs/Text.svelte';
	import Textarea from './inputs/Textarea.svelte';
	import Submit from './inputs/Submit.svelte';
	import Checkbox from './inputs/Checkbox.svelte';
	import Radio from './inputs/Radio.svelte';
	import Select from './inputs/Select.svelte';
	import Toggle from './inputs/Toggle.svelte';
	import File from './inputs/File.svelte';

	// Define the submitting variable
	let submitting = false;

	// Define the errors object
	let errors: { [key in keyof typeof config.fields]: string } = {};

	export let config: FormConfig;

	// Denotes if to run invalidateAll
	export let runLoader = false;
	export let data: Record<string, unknown> | undefined = {};

	$: if (data && 'errors' in data) {
		errors = data.errors as { [x: string]: string };
	}
</script>

<form
	class="nkf"
	action={config.action}
	method={config.method}
	novalidate
	encType={config.encType ?? 'application/x-www-form-urlencoded'}
	use:enhance={({ formElement }) => {
		submitting = true;

		return async ({ result }) => {
			if (result.type === 'failure') {
				submitting = false;
				data = result.data;
			} else if (result.type === 'success') {
				submitting = false;
				data = result.data;
				formElement.reset();
			}

			submitting = false;

			if (runLoader) {
				await invalidateAll();
			}

			await applyAction(result);
		};
	}}
>
	<fieldset disabled={submitting} class="nfk-fieldset">
		{#each Object.keys(config.fields) as field, i}
			<div
				class={`${config.fields[field].width ? 'nfk-fieldset__field ' + 'nfk-fieldset__field--' + config.fields[field].width : 'nfk-fieldset__field'}`}
			>
				{#if config.fields[field].type === 'text'}
					<Text field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'textarea'}
					<Textarea field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'submit'}
					<Submit field={config.fields[field]} key={field} />
				{:else if config.fields[field].type === 'checkbox'}
					<Checkbox field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'toggle'}
					<Toggle field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'radio'}
					<Radio field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'select'}
					<Select field={config.fields[field]} key={field} error={errors[field]} />
				{:else if config.fields[field].type === 'file'}
					<File field={config.fields[field]} key={field} error={errors[field]} />
				{/if}
			</div>
		{/each}
	</fieldset>
</form>
