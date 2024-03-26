import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import httpClient from "../utils/httpClient";
import ReactPullToRefresh from "react-pull-to-refresh";
import { formatNumber } from "../utils/formatData";

const Category = () => {
  const [result, setResult] = useState<any>([]);
  const [navItem, setNavItem] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "Seasonal menu",
  );

  const fetchMenu = async () => {
    try {
      const res = await httpClient({
        method: "post",
        endpoint: "/api/menu",
        payload: JSON.stringify({
          show_all: 1,
        }),
      });
      const categories = res.result.categories || [];
      setResult(categories);
      const categoryNames = categories.map(
        (category: any) => category.category_name,
      );
      setNavItem(categoryNames);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]");
    let closestSectionId = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSectionId = section.id;
      }
    });

    setActiveCategory(closestSectionId);
  };

  useEffect(() => {
    fetchMenu();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ReactPullToRefresh onRefresh={fetchMenu}>
      <Layout>
        <div className="fixed left-0 top-0 z-10 w-full">
          <header className="flex items-center justify-center bg-white py-5">
            <h3 className="text-xl font-bold sm:text-4xl">Menu</h3>
          </header>
          <nav className="w-full overflow-x-auto bg-white">
            <ul className="flex">
              {navItem.map((item: string, index: number) => (
                <li
                  key={index}
                  className={`w-full py-4 text-center transition-all duration-300 ease-in-out ${
                    activeCategory === item
                      ? "border-b-4 border-gray-900 text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  <a
                    href={`#${item}`}
                    className="inline-block w-[150px] text-base font-semibold sm:text-lg"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section className="pt-32 sm:pt-36">
          {result.map((item: any, index: number) => (
            <section key={index} id={item.category_name} className={`w-full`}>
              <div className="w-full bg-gray-100 p-4">
                <h3 className="text-xl font-bold sm:text-3xl ">
                  {item.category_name}
                </h3>
              </div>
              <div>
                {item.menu &&
                  item.menu.map((product: any, index: number) => (
                    <div
                      key={index}
                      className="flex w-full items-center gap-4 bg-white p-4 sm:gap-8 "
                    >
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="size-16 sm:size-36"
                      />
                      <div>
                        <h4 className="line-clamp-1 text-sm font-semibold sm:line-clamp-none sm:text-2xl">
                          {product.name}
                        </h4>
                        <p className="line-clamp-2 text-xs sm:line-clamp-none sm:text-base">
                          {product.description}
                        </p>
                      </div>
                      <p className="ms-auto text-xs font-bold sm:text-lg">
                        {formatNumber(product.price)}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </section>
        <section className="min-h-[150px] w-full bg-gray-100"></section>
      </Layout>
    </ReactPullToRefresh>
  );
};

export default Category;
