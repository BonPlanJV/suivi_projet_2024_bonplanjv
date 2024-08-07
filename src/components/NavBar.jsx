import { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import banner from "../assets/Banner.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  const location = useState();
  const [userId, setUserId] = useState(undefined);
  const { y } = useWindowScroll();
  const headerActive =
    y > 10
      ? "backdrop-blur-xl backdrop-brightness-50 backdrop-contrast-125"
      : "bg-transparent";
  const active = (path) =>
    path == location.pathname
      ? "border-neutral-200"
      : "border-transparent hover:border-orange-600";

  useEffect(() => {
    setUserId(sessionStorage.getItem("userID"));
    document.addEventListener("auth", ({ detail }) => {
      detail.loggedIn
        ? setUserId(sessionStorage.getItem("userID"))
        : setUserId(undefined);
    });
  }, []);

  return (
    <header className="w-full sticky z-10 top-0">
      <nav className={`absolute w-full ${headerActive}`}>
        <ul className="flex w-full items-center p-7 text-gray-200">
          <Link to={"/"}>
            <img src={banner} className="absolute top-5 left-5 h-12" />
          </Link>
          <div className="flex w-full justify-center">
            <li className={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
              <Link to={"/"}>Trending</Link>
            </li>
            <li className={`border-b-2 ${active("/news")} mx-1.5 sm:mx-6`}>
              <Link to={"/news"}>News</Link>
            </li>
            <li className={`border-b-2 ${active("/comments")} mx-1.5 sm:mx-6`}>
              <Link to={"/comments"}>Commented</Link>
            </li>
            <li className={`border-b-2 ${active("/favorites")} mx-1.5 sm:mx-6`}>
              <Link to={"/favorites"}>Favorites</Link>
            </li>
          </div>
          <div className="flex absolute right-0">
            {userId ? (
              <>
                <li
                  className={`border-b-2 font-bold ${active("/profile")} mx-1.5 sm:mx-6`}
                >
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li
                  className={`border-b-2 text-red-500 font-bold ${active("/logout")} mx-1.5 sm:mx-6`}
                >
                  <Link to={"/logout"}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li
                  className={`border-b-2 ${active("/register")} mx-1.5 sm:mx-6`}
                >
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
