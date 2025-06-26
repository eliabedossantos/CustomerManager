
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CustomerContext } from "../contexts/CustomerContext";

export const useAuth = () => useContext(AuthContext);
export const useCustomer = () => useContext(CustomerContext)