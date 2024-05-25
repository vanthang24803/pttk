import { Profile } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  token: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLogin: boolean;
  profile: Profile | null;
  getProfile: () => void;
};

const useAuth = create(
  persist<Store>(
    (set, get) => ({
      isLogin: false,
      token: "",
      profile: null,
      login: async (email, password) => {
        try {
          const res = await _http.post(`/api/auth/login`, {
            email,
            password,
          });

          if (res.status === 200) {
            console.log(res.data);
            set({
              isLogin: true,
              token: res.data.token,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      logout() {
        set({ profile: null, token: "", isLogin: false });
        localStorage.removeItem("pttk_auth");
      },
      getProfile: async () => {
        try {
          const res = await _http.get(`/api/auth/profile`);

          if (res.status === 200) {
            set({
              profile: res.data.profile,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "pttk_auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
