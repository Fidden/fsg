export default function AddressStroke({name, children}) {
    return (
        <>
            <tr className="hover:bg-primary-2">
                <td className="px-4 py-3 text-primary-60">{name}</td>
                <td className="px-4 py-3 font-medium">{children}</td>
            </tr>
        </>
    );
}
