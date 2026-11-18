import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items, dark = false }) {
  const linkClass = dark
    ? 'transition-colors hover:text-white'
    : 'transition-colors hover:text-neutral-900';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest ${dark ? 'text-neutral-400' : 'text-neutral-400'}`}
    >
      {items.map((item, index) => (
        <span key={`${item.url || item.name}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.url && index < items.length - 1 ? (
            <Link to={item.url} className={linkClass}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
