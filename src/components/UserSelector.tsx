import { useRouter } from "next/router";
import { Author } from "@/lib/types";

export default function UserSelector() {
  const router = useRouter();

  const selectUser = (user: Author) => {
    localStorage.setItem("oshaberi-san-user", user);
    router.push("/input");
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto">
      <button
        onClick={() => selectUser("こーき")}
        className="group relative w-full py-5 rounded-3xl bg-gradient-to-r from-sky-300 to-blue-400 text-white text-xl font-black shadow-lg shadow-sky-300/40 hover:shadow-xl hover:shadow-sky-300/50 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        <span className="relative z-10">🧑 こーき</span>
      </button>
      <button
        onClick={() => selectUser("みずき")}
        className="group relative w-full py-5 rounded-3xl bg-gradient-to-r from-pink-300 to-rose-400 text-white text-xl font-black shadow-lg shadow-pink-300/40 hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
        <span className="relative z-10">👩 みずき</span>
      </button>
    </div>
  );
}
