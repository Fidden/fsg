import Load from '../icons/Load';

export default function Loading({ children, className }) {
  return (
    <div className={`h-96 flex gap-3 justify-center items-center flex-col rounded-xl border-1 border-primary-8 ${className}`}>
      <div className="animate-spin svg_32">
        <Load />
      </div>
      <h2 className="text-primary-100 font-medium text-lg">{children}</h2>
    </div>
  );
}
