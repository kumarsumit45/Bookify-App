import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {base_url} from "../constants/api"

// const base_url ="https://bookstore-backend-5xrt.onrender.com";

export const useAuthStore = create((set)=>({
    user:null,
    token:null,
    loading:false,

    register : async(username,email,password)=>{

        set({loading:true})
        try {
            const response = await fetch(`${base_url}/api/auth/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data =await response.json();

            if(!response.ok) throw new Error(data.message || "something went wrong");

            await AsyncStorage.setItem("user",JSON.stringify(data));
            await AsyncStorage.setItem("token",JSON.stringify(data.token));

            set({token: data.token, user:data.user, loading:false});

            return { success: true }

        } catch (error) {
            set({loading : false});
            return { success : false, error: error.message}
        }
    },

    login : async(email,password)=>{
        set({loading:true})

        try {
            const response = await fetch(`${base_url}/api/auth/login`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json();

            if(!response.ok) throw new Error(data.message || "Something went wrong.")

            await AsyncStorage.setItem("user",JSON.stringify(data.user));
            await AsyncStorage.setItem("token",JSON.stringify(data.token));

            set({token: data.token, user:data.user, loading:false});

            return{ success : true};
        } catch (error) {
            set({loading : false});
            return { success : false, error: error.message}
        }
    },

    checkAuth: async()=>{
        try {
            const tokenJson = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");

            const token = tokenJson ? JSON.parse(tokenJson) : null;
            const user = userJson ? JSON.parse(userJson) : null;

            if (token && user) {
                set({token, user, loading: false});
                console.log("Auth restored successfully");
                return {success: true};
            }
        } catch (error) {
            console.log("Auth check failed", error);
            set({loading: false});
        }
    },

    logout : async()=>{
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        set({token:null, user: null})
    },
    
}))