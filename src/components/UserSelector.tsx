import { useRouter } from "next/router";
import { Author } from "@/lib/types";

export default function UserSelector() {
  const router = useRouter();

  const selectUser = (user: Author) => {
    sessionStorage.setItem("oshaberi-san-user", user);
    router.push("/input");
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <button
        onClick={() => selectUser("こーき")}
        className="group relative w-full py-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
        <span className="relative z-10">🧑 こーき</span>
      </button>
      <button
        onClick={() => selectUser("みずき")}
        className="group relative w-full py-5 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white text-xl font-bold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
        <span className="relative z-10">👩 みずき</span>
      </button>
    </div>
  );
}
