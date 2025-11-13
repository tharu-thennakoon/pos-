import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-primary-800 text-white p-4 flex justify-between items-center">
      <div />
      <div className="flex items-center gap-3">
        <span className="text-sm capitalize">{user?.role.toLowerCase()} User</span>
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 font-bold">
          {user?.email[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
}