import { create } from 'zustand'

interface ConfigState {}

export const useConfigStore = create<ConfigState>()((set) => ({}))
