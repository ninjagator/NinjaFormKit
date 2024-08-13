import type { FormConfig } from '$lib/form/form.config.js';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { validate } from '$lib/validate.server.js';

const formConfig = {
	method: 'post',
	fields: {
		email: {
			type: 'text',
			variant: 'email',
			placeholder: 'Enter your email...',
			label: 'Email',
			validate: {
				required: true,
				isEmail: true
			}
		},
		message: {
			type: 'textarea',
			placeholder: 'Enter your message...',
			label: 'Message',
			validate: {
				required: true,
				minLength: 10,
				maxLength: 500
			}
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

		console.log(values);
	}
} satisfies Actions;
