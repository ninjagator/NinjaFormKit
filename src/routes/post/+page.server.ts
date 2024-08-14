import type { FormConfig } from '$lib/form/form.config.js';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { validate } from '$lib/validate.server.js';

const formConfig = {
	method: 'post',
	encType: 'multipart/form-data',
	fields: {
		title: {
			type: 'text',
			placeholder: 'Enter your post title...',
			label: 'Title',
			validate: {
				required: true,
				maxLength: 64,
				minLength: 12
			}
		},
		image: {
			type: 'file',
			placeholder: 'Upload an image',
			label: 'Post Image',
			validate: {
				required: true,
				mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
				maxSize: 320000
			}
		},
		body: {
			type: 'textarea',
			label: 'Body',
			placeholder: 'Enter post body...',
			validate: {
				required: true,
				maxLength: 1200
			}
		},
		publish: {
			type: 'checkbox',
			label: 'Published'
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
