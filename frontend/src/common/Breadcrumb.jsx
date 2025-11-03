import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  if (pathnames.length === 0) return null;

  const role = pathnames[0];
  const allSegments = pathnames.slice(1);
  const isUUID = (segment) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(segment);

  return (
    <div className="mt-4 pl-5 mb-5 text-sm text-gray-600 top-0 z-20 pb-4">
      <ul className="flex px-3 py-1 rounded-4xl gap-2 fixed z-10 bg-stone-100 border-1 border-stone-200 shadow-sm hover:bg-zinc-200">
        <li>
          <Link to={`/${role}`} className="text-gray-800 hover:text-blue-500 hover:underline cursor-pointer">Home</Link>
        </li>
        {allSegments.filter(segment => !isUUID(segment)).map((name, index) => {
          const actualIndex = allSegments.indexOf(name);
          const routeTo = `/${role}/` + allSegments.slice(0, actualIndex + 1).join("/");
          const isLast = actualIndex === allSegments.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-800 capitalize cursor-default">
                  {name.replace(/-/g, " ")}
                </span>
                ) : (
                <Link to={routeTo} className="text-gray-800 hover:text-blue-500 hover:underline capitalize">
                  {name.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}