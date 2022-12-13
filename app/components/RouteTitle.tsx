import { useLocation } from '@remix-run/react';
import { links } from '~/constants';

export default function RouteTitle() {
  const { pathname } = useLocation();
  const link = links.find(({ link }) => link === pathname);

  if (!link?.title) {
    return null;
  }

  return <h1 className="route-title">{link?.title}</h1>;
}
