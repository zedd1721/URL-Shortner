import { redirect } from "@tanstack/react-router"; // redirect karne ke liye
import { getUser } from "../api/user.api"; // current user ka data API se lene ke liye
import { login } from "../store/slice/authSlice"; // Redux ke authSlice me login action

// Auth check karne wali function (routes ke liye use hoti hai)
export const checkAuth = async ({ context }) => {
    try {
        // context se queryClient (React Query) aur store (Redux) nikal rahe hain
        const { queryClient, store } = context;

        // React Query se user ka data fetch kar rahe hain ya cache se le rahe hain
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"], // ye ek unique key hai user data ke liye
            queryFn: getUser, // ye function API call karta hai
        });

        // agar user nahi mila to false return karo (unauthorized)
        if (!user) return false;

        // Redux store me user ko login karwa rahe hain
        store.dispatch(login(user));

        // Redux store se auth state check kar rahe hain
        const { isAuthenticated } = store.getState().auth;

        // agar auth state me authenticated nahi hai to bhi false return karo
        if (!isAuthenticated) return false;

        // sab sahi hai to true return karo (authorized)
        return true;
    } catch (error) {

        // agar koi error aaye (jaise token expire ho gaya), to signin page pe redirect karo
        return redirect({ to: "/signin" });
    }
};
