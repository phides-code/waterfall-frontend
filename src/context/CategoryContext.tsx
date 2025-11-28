import React, { createContext } from 'react';

export enum Category {
    Culture = 'culture',
    Department = 'department',
    Classification = 'classification',
}

export interface CategoryState {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const CategoryContext = createContext<CategoryState>({
    category: Category.Culture,
    setCategory: () => {
        /* empty */
    },
});

interface CategoryProviderProps {
    children: React.ReactNode;
}

const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const [category, setCategory] = React.useState<Category>(Category.Culture);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export { CategoryContext, CategoryProvider };
