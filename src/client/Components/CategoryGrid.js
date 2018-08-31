import React from 'react';
import CategoryCard from './CategoryCard';
import './styles/CategoryGrid.css';

// categories is array of objects { category: string, items: [] }
const CategoryGrid = ({ categories }) => {
  console.log(categories)
  return (
    <div className="category-grid">
      { categories.map((category) => <CategoryCard key={ category.category } category={ category.category } items={ category.items }/>)}
    </div>
  )
};

export default CategoryGrid;