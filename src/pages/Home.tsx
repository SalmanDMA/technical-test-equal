import Layout from "../components/Layout";
import logo from "../assets/logo technopartner.png";
import httpClient from "../utils/httpClient";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Carousel from "../components/Carousel";
import ReactPullToRefresh from "react-pull-to-refresh";
import { IoCloseSharp } from "react-icons/io5";
import { formatIdr, formatNumber } from "../utils/formatData";

const Home = () => {
  const [result, setResult] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchHome = async () => {
    try {
      const res = await httpClient({
        method: "get",
        endpoint: "/api/home",
      });
      const result = res.result;
      setResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "unset";
    setOpenModal(false);
  };

  return (
    <ReactPullToRefresh onRefresh={fetchHome}>
      <Layout>
        <header className="fixed top-0 z-10 w-full bg-white px-5">
          <img
            src={logo}
            alt="Logo Technopartner"
            className="h-auto w-[200px]"
          />
        </header>
        <section className=" bg-gray-300 pt-28">
          <section className="p-4 sm:p-8">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white px-6 py-4">
              <p className="text-base sm:text-2xl">{result?.greeting},</p>
              <h3 className="text-lg font-bold sm:text-4xl">{result?.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-20 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-4 shadow-lg shadow-gray-300 sm:size-40"
                    onClick={handleOpenModal}
                  >
                    <QRCode
                      value={result?.qrcode || ""}
                      size={100}
                      className="size-[70%] bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-base sm:text-xl">Saldo</p>
                    <p className="text-base sm:text-xl">Points</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-end text-base font-bold sm:text-xl">
                    {formatIdr(result?.saldo || 0)}
                  </p>
                  <p className="text-end text-base font-semibold text-cyan-400 sm:text-xl">
                    {formatNumber(result?.point || 0)}
                  </p>
                </div>
              </div>
            </div>
          </section>
          {result?.banner && (
            <div className="min-h-[300px]  min-w-full pb-40 pt-6 sm:min-h-[400px]">
              <Carousel result={result} />
            </div>
          )}
          {openModal && (
            <div className="absolute bottom-0 left-0 z-[20] flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden bg-white">
              <p className="text-center text-base font-semibold sm:text-xl">
                Show the QR Code below to the cashier
              </p>
              <QRCode value={result?.qrcode || ""} size={200} />
              <IoCloseSharp
                className="absolute right-5 top-5 cursor-pointer"
                size={30}
                onClick={handleCloseModal}
              />
            </div>
          )}
        </section>
      </Layout>
    </ReactPullToRefresh>
  );
};

export default Home;
