export default function PrimaryButton({children, className, onClick, type = "submit", ...props}) {
    return (
        <button
            className={`rounded-xl text-center outline-none cursor-pointer text-white font-medium bg-brand-100 h-10 px-4 items-center text-md ${className}`}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
