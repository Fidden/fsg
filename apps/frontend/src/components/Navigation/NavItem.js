import React from 'react';
import Link from "next/link";

const NavItem = (props) => (
  <Link {...props} className="py-1 px-3 text-primary-60 text-prebase font-medium"></Link>
);

export default NavItem;
