import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./index"; // Import RootState and AppDispatch from index

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;