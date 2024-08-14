<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let checked = field.defaultChecked || false;
</script>

<div class={`flex flex-col`}>
	{#if field.before}
		{@html field.before}
	{/if}
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}</label
	>
	<div class={`flex items-center`}>
		<input
			type="checkbox"
			id={key}
			name={key}
			class={`sr-only`}
			bind:checked
			placeholder={field.placeholder}
			value={field.defaultValue}
		/>
		<label
			for={key}
			class={`flex items w-12 h-6 border border-ninjaFormKit-border dark:border-ninjaFormKit-borderDark  ${checked ? ' bg-green-400 dark:bg-green-500' : 'bg-ninjaFormKit-inputBg dark:bg-ninjaFormKit-inputBgDark'} rounded-full p-1 duration-200 ease-in-out cursor-pointer`}
		>
			<span
				class={`bg-ninjaFormKit-default dark:bg-ninjaFormKit-defaultDark w-4 h-4 rounded-full shadow-md relative bottom-0.5 transform duration-200 ease-in-out${checked ? ' translate-x-6' : ''}`}
			></span>
		</label>
	</div>
	{#if error}
		<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
			{error}
		</p>
	{/if}
	{#if field.after}
		{@html field.after}
	{/if}
</div>
