export default function InputError({messages = [], className = ''}) {
    return (
        <>
            {!!messages.length &&
                messages.map((message, index) => (
                    <p className={`${className} text-sm text-accent_3-100`} key={index}>
                        {message}
                    </p>
                ))}
        </>
    );
}
