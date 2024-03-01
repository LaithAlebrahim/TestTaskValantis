import React, { useState, useEffect } from 'react';
import { getIds, getItems, filterProducts } from '../api/ApiClient';
import ProductItem from './ProductItem';
import FilterForm from './FilterForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const limit = 50;

    useEffect(() => {
        // Call fetchAllProducts initially and whenever offset changes
        fetchAllProducts();
    }, [offset]);

    useEffect(() => {
        // Call fetchFilteredProducts only when filters change and are not empty
        if (Object.keys(filters).length && filters[Object.keys(filters)[0]]) {
            fetchFilteredProducts();
        }
    }, [filters]);

    const fetchAllProducts = async () => {
        setIsLoading(true);
        try {
            const ids = await getIds(offset, limit);
            const uniqueIds = [...new Set(ids)];
            const productDetails = await getItems(uniqueIds);
            setProducts(productDetails);
        } catch (error) {
            console.error('Failed to fetch all products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFilteredProducts = async () => {
        setIsLoading(true);
        try {
            const ids = await filterProducts(filters);
            const uniqueIds = [...new Set(ids)];
            const productDetails = await getItems(uniqueIds);
            setProducts(productDetails);
        } catch (error) {
            console.error('Failed to fetch filtered products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilter = ({ type, value }) => {
        setOffset(0); // Always reset the offset when applying filters
        if (type==='All') {
            setFilters({});
            fetchFilteredProducts() // Clear filters to ensure useEffect triggers fetchAllProducts
        } else {
            const newFilters = {};
            if (type && value) {
              newFilters[type] = type === 'price' ? parseFloat(value) : value;
            }
            setFilters(newFilters);
        }
    };

    return (
        <div>
            <FilterForm onFilter={handleFilter} />
            {isLoading ? (
                <div>Loading...</div>
            ) : products.length > 0 ? (
                products.map(product => <ProductItem key={product.id} product={product} />)
            ) : (
                <div>No Product</div> // Display this when there are no products
            )}
            <div className='pagination'>
                <button onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0 || isLoading}>
                    Previous
                    </button>
                <button onClick={() => setOffset(offset + limit)} disabled={isLoading || products.length < limit}>
                    Next
                </button>
            </div>
        </div>
    );
    
};

export default ProductList;
