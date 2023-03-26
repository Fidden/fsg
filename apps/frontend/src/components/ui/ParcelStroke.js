export default function ParcelStroke({ name, data }) {
  return (
    <>
      <tr className="">
        <td className="px-4 py-3 text-primary-60">{name}</td>
        <td className="px-4 py-3 font-medium">{data}</td>
      </tr>
    </>
  );
}
