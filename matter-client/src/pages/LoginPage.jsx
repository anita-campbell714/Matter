import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
      <h1 className="text-4xl text-center mb-4">Log in to your account</h1>
      <form className="max-w-lg mx-auto">
        <input type="email" placeholder={"you@email.com"}/>
        <input type="password" placeholder={"password"}/>
        <button className="primary text-xl">Login</button>
        <div className="text-center py-2 text-gray-700">
          Don't have an account? <Link className="font-bold underline" to="/create-an-account">Click here to create one</Link>
        </div>
      </form>
      </div>
    </div>
  )
}