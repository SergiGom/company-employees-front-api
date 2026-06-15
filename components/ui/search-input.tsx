interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
    />
  );
}