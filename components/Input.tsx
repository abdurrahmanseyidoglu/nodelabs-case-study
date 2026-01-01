import InputProps from "@/types/InputProps";

export default function Input({ label, isRequired, ...rest }: InputProps) {
  return (
    <>
      {label && (
        <label
          className="text-sm text-dark-1 font-medium mb-2.5"
          htmlFor={rest.id}
        >
          {label} {isRequired && <span>*</span>}
        </label>
      )}
      {/* Allow react-hook-form to pass any necessary props so it can control
      the input */}
      <input
        {...rest}
        className="mb-3.5 px-5 py-3 border border-gray-5 rounded-primary focus:outline-0 focus:border-gray-400"
      />
    </>
  );
}
