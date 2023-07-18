type Props = {
	type: string;
	placeholder?: string;
	register: any;
};
export default function InputConstant({ type, placeholder, register }: Props) {
	return (
		<div className="p-1">
			<input
				className="p-1 border rounded-md border-gray-300 w-1/2"
				type={type}
				{...register}
				placeholder={placeholder}
			/>
		</div>
	);
}
