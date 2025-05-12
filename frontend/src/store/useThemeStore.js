import { create } from "zustand";

// export const useThemeStore = create((set)=>({
//     theme: localStorage.getItem("chat-theme") || "dark",
//     setTheme:(theme)=>{
//         localStorage.setItem("chat-theme",theme);
//         document.documentElement.setAttribute("data-theme", theme); 
//         set({theme});
//     }
// }));

export const useThemeStore = create((set) => {
    let storedTheme = "light";
    if (typeof window !== "undefined") {
      storedTheme = localStorage.getItem("chat-theme") || "light";
      document.documentElement.setAttribute("data-theme", storedTheme); // set it immediately
    }
  
    return {
      theme: storedTheme,
      setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
        set({ theme });
      },
    };
  });