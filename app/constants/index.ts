export const links = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'SVG Drawing',
    link: '/svg-drawing',
  },
  {
    title: 'Web animation API',
    link: '/web-animation-api',
  },
  {
    title: 'Buttons',
    link: '/buttons',
  },
  {
    title: 'Page Transition',
    link: '/page-transition',
  },
  {
    title: 'Book Scroll',
    link: '/book-scroll',
  },
  {
    title: 'Dialog Element ✅',
    link: '/dialog-element',
  },
  {
    title: 'Game Menu',
    link: '/game-menu',
  },
  {
    title: 'Mouse Mask',
    link: '/mouse-mask',
  },
  {
    title: 'Theme toggle',
    link: '/theme-toggle',
  },
].sort((itemA, itemB) => {
  const linkA = itemA.link.toUpperCase();
  const linkB = itemB.link.toUpperCase();

  if (linkA === linkB) {
    return 0;
  }

  return linkA < linkB ? -1 : 1;
});
