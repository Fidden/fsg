export default function OutlinedButton({children, className, onClick, type = "submit", ...props}) {
    return (
        <button
            className={`rounded-xl text-center text-brand-100 outline-none cursor-pointer border-brand-100 border font-medium h-10 px-4 items-center text-md ${className}`}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
