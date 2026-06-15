interface Props {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-xl border border-dashed bg-white p-10 text-center">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
}