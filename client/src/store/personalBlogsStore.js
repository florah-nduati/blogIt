import { create } from "zustand";

function personalBlogsStore(set) {
    return{
        blogs: [],

        setBlogs: (blogs) => {
            set((state) =>{
                return { blogs: blogs};
            });
        },
    };
}

const usePersonalBlogsStore = create (personalBlogsStore);
export default usePersonalBlogsStore;