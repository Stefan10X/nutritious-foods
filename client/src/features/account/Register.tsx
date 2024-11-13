/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <div className="mx-auto mt-28 flex flex-col items-center px-6 py-8 md:h-screen lg:py-0 ">
      <div className="w-full rounded-lg bg-white shadow xl:w-[45%] xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit((data) =>
              agent.Account.register(data)
                .then(() => {
                  toast.success("Registration successful - you can now login");
                  navigate("/login");
                })
                .catch((error) => handleApiErrors(error)),
            )}
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Your username
              </label>
              <input
                type="username"
                id="username"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <span className="text-red-500">
                  {errors?.username?.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                placeholder="email"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w.=-]+@[\w.-]+\.[\w]{2,3}$/,
                    message: "Not a valid email adress",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors?.email?.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message:
                      "Password needs at least 1 small-case letter, 1 capital letter, 1 digit, 1 special character and the length should be between 6-20 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors?.password?.message as string}
                </span>
              )}
            </div>

            <button
              disabled={!isValid}
              type="submit"
              className="focus:ring-primary-300 text-md h-12 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 disabled:bg-gray-500"
            >
              {isSubmitting ? <Spinner size="md" /> : "Create an account"}
            </button>
            <p className="text-md font-normal">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 font-medium text-blue-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
