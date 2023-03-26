import Link from 'next/link';

export default function Banner({ href = '', img }) {
  return (
    <Link href={href} className="w-full hover:scale-[1.02] border-1 border-primary-8 duration-100 rounded-2xl transition ease-in">
      <img className="object-cover" src={img}></img>
    </Link>
  );
}
