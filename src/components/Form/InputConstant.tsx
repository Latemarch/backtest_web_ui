type Props = {
	name: string;
	placeholder?: string;
	register: any;
};
export default function InputConstant({ name, placeholder, register }: Props) {
	return (
		<div className="p-1">
			{name}
			<input
				className="p-1 border rounded-md border-gray-300 w-full"
				{...register}
				placeholder={placeholder}
			/>
		</div>
	);
}
