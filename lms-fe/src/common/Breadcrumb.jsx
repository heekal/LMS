import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  const role = pathnames[0];
  const filtered = pathnames.slice(1); // buang prefix role

  return (
    <nav className="sticky mt-5 pl-5 text-sm text-gray-600 top-0 z-20 pb-4">
      <ul className="flex gap-2">
        <li>
          <Link to={`/${role}`} className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>

        {filtered.map((name, index) => {
          const routeTo = `/${role}/` + filtered.slice(0, index + 1).join("/");
          const isLast = index === filtered.length - 1;

          return (
            <li key={name} className="flex items-center gap-2">
              <span>{">"}</span>
              {isLast ? (
                <span className="font-semibold text-gray-800 capitalize">
                  {name}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-blue-500 hover:underline capitalize"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
