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

	// Define the submitting variable
	let submitting = false;

	// Define the widthMap
	const widthMap = {
		1: 'col-span-12 @md:col-span-1',
		2: 'col-span-12 @md:col-span-2',
		3: 'col-span-12 @md:col-span-3',
		4: 'col-span-12 @md:col-span-4',
		5: 'col-span-12 @md:col-span-5',
		6: 'col-span-12 @md:col-span-6',
		7: 'col-span-12 @md:col-span-7',
		8: 'col-span-12 @md:col-span-8',
		9: 'col-span-12 @md:col-span-9',
		10: 'col-span-12 @md:col-span-10',
		11: 'col-span-12 @md:col-span-11',
		12: 'col-span-12'
	};

	// Define the breakMap offset the input based on the width for width: 1 offset would be 11
	const breakMap = {
		1: 'hidden md:block @md:col-span-11',
		2: 'hidden md:block @md:col-span-10',
		3: 'hidden md:block @md:col-span-9',
		4: 'hidden md:block @md:col-span-8',
		5: 'hidden md:block @md:col-span-7',
		6: 'hidden md:block @md:col-span-6',
		7: 'hidden md:block @md:col-span-5',
		8: 'hidden md:block @md:col-span-4',
		9: 'hidden md:block @md:col-span-3',
		10: 'hidden md:block @md:col-span-2',
		11: 'hidden md:block @md:col-span-1',
		12: 'hidden'
	};

	// Define the errors object
	let errors: { [key in keyof typeof config.fields]: string } = {};

	export let config: FormConfig;
	export let runLoader = false;
	export let data: Record<string, unknown> | undefined = {};

	$: if (data && 'errors' in data) {
		errors = data.errors as { [x: string]: string };
	}
</script>

<form
	class="w-full"
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
	<fieldset disabled={submitting} class="grid grid-cols-12 gap-x-3 gap-y-5 @container">
		{#each Object.keys(config.fields) as field, i}
			<div
				class={`${config.fields[field].width ? widthMap[config.fields[field].width] : 'col-span-12'}`}
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
				{/if}
			</div>
			{#if config.fields[field].break && config.fields[field].width}
				<span class={breakMap[config.fields[field].width]}></span>
			{/if}
		{/each}
	</fieldset>
</form>
