import { Link } from "react-router";

export default function CreateAnAccountPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
      <h1 className="text-4xl text-center mb-4">Create an account</h1>
      <form className="max-w-lg mx-auto">
        <input type="text" placeholder="Name"/>
        <input type="email" placeholder={"you@email.com"}/>
        <input type="password" placeholder={"password"}/>
        <button className="primary text-xl">Register</button>
        <div className="text-center py-2 text-gray-700">
          Already have an account? <Link className="font-bold underline" to="/login">Login</Link>
        </div>
      </form>
      </div>
    </div>
  )
}