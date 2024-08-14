import type { FormConfig } from '$lib/form/form.config.js';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { validate } from '$lib/validate.server.js';

const formConfig = {
	method: 'post',
	fields: {
		username: {
			type: 'text',
			label: 'Username',
			placeholder: 'Enter your username...',
			width: 5,
			validate: {
				required: true,
				minLength: 3,
				maxLength: 20
			}
		},
		email: {
			type: 'text',
			variant: 'email',
			label: 'Email',
			placeholder: 'Enter your email...',
			width: 7,
			validate: {
				required: true,
				isEmail: true
			}
		},
		referer: {
			type: 'select',
			label: 'Referer',
			placeholder: 'Select an option...',
			width: 4,
			options: [
				{ label: 'Google', value: 'google' },
				{ label: 'Friend', value: 'friend' },
				{ label: 'Other', value: 'other' }
			],
			validate: {
				required: true
			}
		},
		accountType: {
			type: 'radio',
			label: 'Account Type',
			width: 8,
			options: [
				{ label: 'Personal', value: 'personal' },
				{ label: 'Business', value: 'business' }
			],
			validate: {
				required: true
			}
		},
		password: {
			type: 'text',
			variant: 'password',
			label: 'Password',
			placeholder: 'Enter your password...',
			width: 6,
			validate: {
				required: true,
				minLength: 8,
				badPasswordCheck: true
			}
		},
		confirmPassword: {
			type: 'text',
			variant: 'password',
			label: 'Confirm Password',
			placeholder: 'Confirm your password...',
			width: 6,
			validate: {
				required: true,
				matches: 'password'
			}
		},
		newsletter: {
			type: 'toggle',
			label: 'Subscribe to newsletter',
			defaultChecked: true
		},
		submit: {
			type: 'submit',
			label: 'Submit'
		}
	}
} satisfies FormConfig;

export const load: PageServerLoad = async () => {
	return { formConfig };
};

export const actions = {
	default: async ({ request }) => {
		const { errors, hasErrors, values } = await validate(request, formConfig);

		if (hasErrors) {
			return fail(400, { errors });
		}

		console.log('values', values);
	}
} satisfies Actions;
