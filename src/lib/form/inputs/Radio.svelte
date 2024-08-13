<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;

	if (!field.options) {
		throw new Error('Radio field must have options');
	}
</script>

<div class="flex flex-col">
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}
		{#if field.validate !== undefined}<span class="text-red-500">*</span>{/if}</label
	>
	<div class={`flex gap-2 items-center`}>
		{#each field.options || [] as option, i}
			<div class={`flex items-center`}>
				<input
					type="radio"
					id={key + (i + 1)}
					name={key}
					class="mr-1 accent-ninjaFormKit-default dark:accent-ninjaFormKit-defaultDark"
					placeholder={field.placeholder}
					value={option.value}
					disabled={field.disabled}
				/>
				<label
					for={key + (i + 1)}
					class="text-ninjaFormKit-text dark:text-ninjaFormKit-textDark cursor-pointer"
				>
					{option.label}
				</label>
			</div>
		{/each}
	</div>
	{#if error}
		<p class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">{error}</p>
	{/if}
</div>
