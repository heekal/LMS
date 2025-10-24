import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  const role = pathnames[0];
  const filtered = pathnames.slice(1);

  const isAssigment = (name) => {
    return name ==="assignment";
  };

  return (
    <div className="mt-4 pl-5 mb-5 text-sm text-gray-600 top-0 z-20 pb-4">
      <ul className="flex px-3 py-1 rounded-4xl gap-2 fixed z-10 bg-stone-100 border-1 border-stone-200 shadow-sm hover:bg-zinc-200">
        <li>
          <Link to={`/${role}`} className="text-gray-800 hover:text-blue-500 hover:underline cursor-pointer">
            Home
          </Link>
        </li>

        {filtered.map((name, index) => {
          const routeTo = `/${role}/` + filtered.slice(0, index + 1).join("/");
          const isLast = index === filtered.length - 1;
      
          return (
            <li key={name} className={`flex items-center gap-2 `}>
              <span>{"/"}</span>
              {isLast ? (
                <span className="text-gray-800 hover:text-blue-500 capitalize hover:underline cursor-pointer">
                  {name}
                </span>
              ) : (
                <Link
                  to={isAssigment(name) ? isLast : routeTo}
                  className={`text-gray-800 hover:text-blue-500 hover:underline capitalize`}
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
