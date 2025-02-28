// Packages
import { useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";

// Components
import ShopProduct from './ShopProduct'

// Style
import CSS from './Shop.module.scss'


export default function Inventory({ products, blok }: {
    products: Array<any>,
    blok: any,
}) {

    const [showMaxAmount, setShowMaxAmount] = useState(9);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [show, setShow] = useState(null);
    const [sorting, setSorting] = useState(null);

    const [model, setModel] = useState(null);
    const [make, setMake] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    let allMakes = []
    let allModels = []
    let mostExpensiveProduct = 0;
    products?.forEach(item => {
        if (item?.make && item?.make !== 'Winding Road Motorcars' && !allMakes.includes(item?.make)) {
            allMakes.push(item?.make);
        }
        if (item?.model && !allModels.some(e => e.model === item.model)) {
            allModels.push({'model': item.model, 'make': item.make});
        }
        if (item.price > mostExpensiveProduct) {
            mostExpensiveProduct = Number(item.price);
        }
    })

    let shownAmount = 0;

    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (model || make || minPrice || maxPrice) {
            let newfilteredProducts = [];
            products?.forEach(loop => {
                if (
                    (loop.make === make || !make) &&
                    (loop.model === model || !model) &&
                    (loop.price >= minPrice || !minPrice) &&
                    (loop.price <= maxPrice || !maxPrice)
                ) {
                    newfilteredProducts.push(loop)
                }
            })
            setFilteredProducts(newfilteredProducts)
        }

        if (sorting === 'aToZ') { 
            const sortThis = [...filteredProducts]
            sortThis.sort((a, b) => {
                const nameA = a.title.toUpperCase();
                const nameB = b.title.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0
                }
            })
            setFilteredProducts(sortThis)
        } else if (sorting === 'zToA') { 
            const sortThis = [...filteredProducts]
            sortThis.sort((a, b) => {
                const nameA = a.title.toUpperCase();
                const nameB = b.title.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                } else if (nameA < nameB) {
                    return 1;
                } else {
                    return 0
                }
            })
            setFilteredProducts(sortThis)
        } else if (sorting === 'priceLowestFirst') {
            const sortThis = [...filteredProducts]
            sortThis.sort((a, b) => {
                if (Number(a.price) < Number(b.price)) {
                    return -1;
                } else if (Number(a.price) > Number(b.price)) {
                    return 1;
                } else {
                    return 0
                }
            })
            setFilteredProducts(sortThis)
        } else if (sorting === 'priceHighestFirst') {
            const sortThis = [...filteredProducts]
            sortThis.sort((a, b) => {
                if (Number(a.price) > Number(b.price)) {
                    return -1;
                } else if (Number(a.price) < Number(b.price)) {
                    return 1;
                } else {
                    return 0
                }
            })
            setFilteredProducts(sortThis)
        }

    }, [model, make, minPrice, maxPrice, sorting])

    useEffect(() => {
        setShow(null)
    }, [model, make])


    return (
        <section {...storyblokEditable(blok)} className={CSS.section}>
            <div className="wrapper">

                <div className={CSS.filtersAndReset}>
                    <button className={CSS.mobileMenuToggle} onClick={() => mobileMenuOpen ? setMobileMenuOpen(false) : setMobileMenuOpen(true)}>
                        Filters
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6667 2.5H1.33337L6.66671 8.80667V13.1667L9.33337 14.5V8.80667L14.6667 2.5Z" stroke="#429A9B" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div className={`${CSS.filters} ${mobileMenuOpen ? CSS.filtersOpen : ''}`}>

                        <div className={show === 'make' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'make' ? setShow(null) : setShow('make')}>{make || 'Make'}</button>
                            <div>
                                <ul>
                                    {allMakes.map((loop, i) => (
                                        <li key={i}><button onClick={() => setMake(loop)}>{loop}</button></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={show === 'model' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'model' ? setShow(null) : setShow('model')}>{model || 'Model'}</button>
                            <div>
                                <ul>
                                    {allModels.map((loop, i) => (
                                        (!make || loop.make === make) &&
                                        <li key={i}><button onClick={() => setModel(loop.model)}>{loop.model}</button></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={show === 'price' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'price' ? setShow(null) : setShow('price')}>Price</button>
                            <div className={CSS.inputs}>
                                <input type="text" placeholder="0" onChange={(e) => setMinPrice(Number((e.target as HTMLInputElement).value))} />
                                <span>-</span>
                                <input type="text" placeholder={mostExpensiveProduct.toString()} onChange={(e) => setMaxPrice(Number((e.target as HTMLInputElement).value))} />
                            </div>
                        </div>

                    </div>

                    <div className={CSS.resetAndSortBy}>
                        {(model || make || minPrice || maxPrice || sorting) &&
                            <button className={CSS.reset} onClick={() => { setFilteredProducts(products); setSorting(null); setMobileMenuOpen(false); setShow(null); setModel(null); setMake(null); setMinPrice(null); setMaxPrice(null)}}>Reset all filters <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3.5L3.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/><path d="M3.5 3.5L10.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/></svg></button>
                        }
                        <fieldset className={`${CSS.sortBy} ${CSS.sortByDesktop}`}>
                            <label>Sort by</label>
                            <select>
                                <option onClick={() => { setSorting(null) }}>Default</option>
                                <option onClick={() => { setSorting('aToZ') }}>Product name: A to Z</option>
                                <option onClick={() => { setSorting('zToA') }}>Product name: Z to A</option>
                                <option onClick={() => { setSorting('priceLowestFirst') }}>Price: lowest first</option>
                                <option onClick={() => { setSorting('priceHighestFirst') }}>Price: highest first</option>
                            </select>
                        </fieldset>
                    </div>
                </div>

                <ul className={CSS.products}>
                    {filteredProducts?.map((loop, i) => {
                        if (shownAmount < showMaxAmount) {
                            shownAmount = shownAmount + 1;
                            return (
                                <ShopProduct key={i} data={loop} />
                            )
                        }
                    })}

                    {(!filteredProducts || filteredProducts?.length === 0) && <p style={{paddingBottom: '5em'}}>No inventory that matches your search. <button className={CSS.reset} style={{borderBottom: 'unset'}} onClick={() => { setFilteredProducts(products); setShow(null); setSorting(null); setModel(null); setMake(null); setMinPrice(null); setMaxPrice(null)}}>Reset all filters <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3.5L3.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/><path d="M3.5 3.5L10.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/></svg></button></p> }
                </ul>

                <div className={CSS.showMore}>
                    <p>{shownAmount < filteredProducts?.length ? shownAmount : filteredProducts?.length} out of {filteredProducts?.length} items seen</p>
                    {showMaxAmount < filteredProducts?.length &&
                        <button className="button" onClick={() => setShowMaxAmount(showMaxAmount + 9)}>Show more</button>
                    }
                </div>

            </div>
        </section>
    )
}