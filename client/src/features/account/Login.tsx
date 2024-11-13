/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || "/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto mt-28 flex flex-col items-center px-6 py-8  lg:h-screen lg:py-0 ">
      <div className="w-full rounded-lg bg-white shadow  lg:mt-0 xl:w-[45%] xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-4 lg:space-y-6"
            action="#"
          >
            <div>
              <div className="mb-2 block text-sm font-medium text-gray-900 ">
                Your Username
              </div>
              <input
                type="username"
                placeholder="username"
                autoComplete="on"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="text-red-500">
                  {errors?.username?.message as string}
                </span>
              )}
            </div>

            <div>
              <div className="mb-2 block text-sm font-medium text-gray-900">
                Password
              </div>
              <input
                type="password"
                placeholder="password"
                autoComplete="on"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                {...register("password", { required: "Password is required" })}
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
              {isSubmitting ? <Spinner size="md" /> : "Sign in"}
            </button>
            <p className="text-md font-normal">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-primary-600 font-medium text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
