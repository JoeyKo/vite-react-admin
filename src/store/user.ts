import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type IRole = 'user' | 'admin';

interface UserState {
  role: IRole;
  setRole: (role: IRole) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        role: "user",
        setRole: (role: IRole) => set((state) => ({ role: state.role = role })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)

export default useUserStore;
