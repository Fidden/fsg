export default function Page({children, active, ...rest}) {
    return (
        <button
            {...rest}
            className="w-8 h-8 rounded-xl bg-primary-4 hover:bg-primary-8 text-primary-60 text-sm justify-center flex items-center"
            style={{
                background: active ? '#FF6534' : 'rgba(22, 22, 26, 0.04)',
                color: active ? 'white' : 'rgba(22, 22, 26, 0.6)'
            }}
        >
            {children}
        </button>
    );
}
