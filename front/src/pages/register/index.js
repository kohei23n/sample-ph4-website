import { useState } from "react";
import { useRouter } from "next/router";
import myAxios from "../../utils/axios";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setPasswordConf] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // CSRFトークンを取得するためのGETリクエスト
      await myAxios.get("/sanctum/csrf-cookie");

      // ユーザー登録のPOSTリクエスト
      const registrationResponse = await myAxios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: conf_password,
      });

      console.log("Registration successful:", registrationResponse);
      router.push("/login"); 
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4 max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          名前:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          メール:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-bold">
          パスワード:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="conf_password" className="block text-sm font-bold mb-2">
          パスワード確認:
        </label>
        <input
          type="password"
          id="conf_password"
          value={conf_password}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setPasswordConf(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          新規登録
        </button>
      </div>
    </form>
  );
}
