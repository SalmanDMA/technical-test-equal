import { toast } from "react-toastify";
import logo from "../assets/logo technopartner.png";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { encryptedData } from "../utils/encryptedData";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const client_id = import.meta.env.VITE_CLIENT_ID;
      const client_secret = import.meta.env.VITE_CLIENT_SECRET;

      const formData = new FormData();
      formData.append("grant_type", "password");
      formData.append("client_id", client_id);
      formData.append("client_secret", client_secret);
      formData.append("username", values.email);
      formData.append("password", values.password);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/oauth/token`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        if (data.access_token) {
          const encrypted = await encryptedData(JSON.stringify(data));
          Cookies.set("access", encrypted, { expires: data.expires_in });
          toast.success("Login success", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetForm();
          setTimeout(() => navigate("/"), 2000);
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        toast.error("Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Layout>
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center gap-14 bg-gray-100 px-10 pb-10">
        <img
          src={logo}
          alt="Logo Technopartner"
          className="h-auto w-[500px] "
        />
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-[70%] max-w-[244px] flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-center text-lg font-semibold text-gray-400 sm:text-xl"
            >
              Email
            </label>
            <input
              type="text"
              className="rounded-xl px-4 py-2 shadow-sm shadow-gray-300 focus:outline-none focus:ring-0"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-start text-sm text-red-500">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-center text-lg font-semibold text-gray-400 sm:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              className="rounded-xl px-4 py-2 shadow-sm shadow-gray-300 focus:outline-none focus:ring-0"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-start text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="mx-auto w-[80%]">
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-white px-4 py-2 text-lg font-semibold text-gray-900 shadow-sm shadow-gray-300 sm:text-xl"
            >
              {formik.isSubmitting ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
