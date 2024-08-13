export type FormConfig = {
	action?: string;
	encType?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
	method: 'get' | 'post';
	fields: Record<string, FormField>;
	runLoader?: boolean;
};

export type FormField = {
	type:
		| 'text'
		| 'textarea'
		| 'submit'
		| 'checkbox'
		| 'radio'
		| 'toggle'
		| 'faketoggle'
		| 'hidden'
		| 'select'
		| 'file'
		| 'html'
		| 'datetime';
	label: string;
	defaultValue?: string | number | null;
	defaultChecked?: boolean;
	centre?: boolean;
	center?: boolean;
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	variant?: 'password' | 'email' | 'text' | 'color' | 'number';
	placeholder?: string;
	multiple?: boolean;
	break?: boolean;
	icon?: string;
	options?: {
		value: string | number;
		label: string;
	}[];
	disabled?: boolean;
	before?: string;
	after?: string;
	validate?: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
		isEmail?: boolean;
		isUrl?: boolean;
		isNumber?: boolean;
		isInteger?: boolean;
		isFloat?: boolean;
		isAlpha?: boolean;
		isAlphanumeric?: boolean;
		isDate?: boolean;
		isTime?: boolean;
		isDateTime?: boolean;
		mimeTypes?: Array<string>;
		maxSize?: number;
		matches?: string;
		badPasswordCheck?: boolean;
	};
};
