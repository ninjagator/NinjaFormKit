# Ninja Form Kit

Ninja Form Kit is a SvelteKit-based form library designed to simplify form creation and validation in your SvelteKit applications. Created with tailwind.js

## Table of Contents

- [Ninja Form Kit](#ninja-form-kit)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [FormField Options](#formfield-options)
  - [Validation](#validation)
    - [Validation Options](#validation-options)

## Installation

To install Ninja Form Kit, use npm or yarn:

```sh
npm install ninjaformkit
# or
yarn add ninjaformkit

```

## Usage

In your `+page.server.ts`, create a `formConfig` object to configure your form. You can set various options such as the form method, action, fields, and validation rules. To ensure type safety make sure your `formConfig` satisfies `FormConfig`

```ts

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

```

The `formConfig` object allows you to configure various aspects of your form. Below is a table explaining each option:

| Option      | Type                                                                 | Description                                                                                   |
|-------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `action`    | `string`                                                             | The URL to which the form data will be submitted. Optional.                                   |
| `encType`   | `'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain'` | The encoding type for the form. Optional.                                                     |
| `method`    | `'get' \| 'post'`                                                    | The HTTP method to use when submitting the form. Required.                                    |
| `fields`    | `Record<string, FormField>`                                          | An object where each key is a field name and the value is a `FormField` object. Required.     |
| `runLoader` | `boolean` | Denotes weather to run sveltekits `invalidateAll` hook

### FormField Options

Each field in the `fields` object is a `FormField` with the following options:

| Option          | Type                                                                 | Description                                                                                   |
|-----------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `type`          | `'text' \| 'textarea' \| 'submit' \| 'checkbox' \| 'radio' \| 'toggle' \| 'faketoggle' \| 'hidden' \| 'select' \| 'file' \| 'html' \| 'datetime'` | The type of the form field. Required.                                                         |
| `label`         | `string`                                                             | The label for the form field. Required.                                                       |
| `defaultValue`  | `string \| number \| null`                                           | The default value for the form field. Optional.                                               |
| `defaultChecked`| `boolean`                                                            | The default checked state for checkbox, radio, or toggle fields. Optional.                    |
| `centre`        | `boolean`                                                            | Whether to center the field. Optional.                                                        |
| `center`        | `boolean`                                                            | Alias for `centre`. Optional.                                                                 |
| `width`         | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12`         | The width of the form field, typically used for grid layouts. Optional.                       |
| `variant`       | `'password' \| 'email' \| 'text' \| 'color' \| 'number'`             | The variant of the form field, specifying a more specific type. Optional.                     |
| `placeholder`   | `string`                                                             | The placeholder text for the form field. Optional.                                            |
| `multiple`      | `boolean`                                                            | Whether the field allows multiple values (e.g., for file inputs). Optional.                   |
| `break`         | `boolean`                                                            | Whether to insert a line break after the field. Optional.                                     |
| `icon`          | `string`                                                             | An icon to display with the form field. Optional.                                             |
| `options`       | `{ value: string \| number; label: string; }[]`                      | An array of options for select fields. Each option has a `value` and a `label`. Optional.     |
| `disabled`      | `boolean`                                                            | Whether the form field is disabled. Optional.                                                 |
| `before`        | `string`                                                             | Content to display before the form field. Optional.                                           |
| `after`         | `string`                                                             | Content to display after the form field. Optional.                                            |
| `validate`      | `object`                                                             | Validation rules for the form field. Optional.          

## Validation                                      

Ninja Form Kit has a plethra of validate options

### Validation Options

The `validate` object allows you to specify validation rules for the form field. Below is a table explaining each option:

| Option            | Type          | Description                                                                                   |
|-------------------|---------------|-----------------------------------------------------------------------------------------------|
| `required`        | `boolean`     | Whether the field is required.                                                                |
| `minLength`       | `number`      | The minimum length of the field value.                                                        |
| `maxLength`       | `number`      | The maximum length of the field value.                                                        |
| `min`             | `number`      | The minimum value for numeric fields.                                                         |
| `max`             | `number`      | The maximum value for numeric fields.                                                         |
| `isEmail`         | `boolean`     | Whether the field value should be a valid email address.                                      |
| `isUrl`           | `boolean`     | Whether the field value should be a valid URL.                                                |
| `isNumber`        | `boolean`     | Whether the field value should be a valid number.                                             |
| `isInteger`       | `boolean`     | Whether the field value should be a valid integer.                                            |
| `isFloat`         | `boolean`     | Whether the field value should be a valid float.                                              |
| `isAlpha`         | `boolean`     | Whether the field value should contain only alphabetic characters.                            |
| `isAlphanumeric`  | `boolean`     | Whether the field value should contain only alphanumeric characters.                          |
| `isDate`          | `boolean`     | Whether the field value should be a valid date.                                               |
| `isTime`          | `boolean`     | Whether the field value should be a valid time.                                               |
| `isDateTime`      | `boolean`     | Whether the field value should be a valid date-time.                                          |
| `mimeTypes`       | `Array<string>`| An array of acceptable MIME types for file inputs.                                            |
| `maxSize`         | `number`      | The maximum file size for file inputs, in bytes.                                              |
| `matches`         | `string`      | A regex pattern that the field value should match.                                            |
| `badPasswordCheck`| `boolean`     | Whether to check the field value against a list of common bad passwords.                      |