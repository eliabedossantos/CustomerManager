
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CustomerContext } from "../contexts/CustomerContext";
import { StatsContext } from "../contexts/StatsContext";

export const useAuth = () => useContext(AuthContext);
export const useCustomer = () => useContext(CustomerContext)
export const useStats = () => useContext(StatsContext)