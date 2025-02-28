// Packages
import { useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";

// Components
import Car from './Car'

// Style
import CSS from './Inventory.module.scss'


export default function Inventory({ cars, blok }: {
    cars: Array<any>,
    blok: any,
}) {

    const [showMaxAmount, setShowMaxAmount] = useState(20);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [show, setShow] = useState(null);

    const [model, setModel] = useState(null);
    const [make, setMake] = useState(null);
    const [minYear, setMinYear] = useState(null);
    const [maxYear, setMaxYear] = useState(null);
    const [fuelType, setFuelType] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    let allMakes = []
    let allModels = []
    let mostExpensiveCar = 0;
    cars.forEach(item => {
        if (item?.make && !allMakes.includes(item?.make)) {
            allMakes.push(item?.make);
        }
        if (item?.model && !allModels.some(e => e.model === item.model)) {
            allModels.push({'model': item.model, 'make': item.make});
        }
        if (item.price > mostExpensiveCar) {
            mostExpensiveCar = Number(item.price);
        }
    })

    let shownAmount = 0;

    const [filteredCars, setFilteredCars] = useState(cars);

    useEffect(() => {
        if (model || make || minYear || maxYear || fuelType || minPrice || maxPrice) {
            let newFilteredCars = [];
            cars.forEach(loop => {
                if (
                    (loop.make === make || !make) &&
                    (loop.model === model || !model) &&
                    (loop.year >= minYear || !minYear) &&
                    (loop.year <= maxYear || !maxYear) &&
                    (loop.fuelType === fuelType || !fuelType) &&
                    (loop.price >= minPrice || !minPrice) &&
                    (loop.price <= maxPrice || !maxPrice)
                ) {
                    newFilteredCars.push(loop)
                }
            })
            setFilteredCars(newFilteredCars)
        }
    }, [model, make, minPrice, maxPrice, minYear, maxYear, fuelType])

    useEffect(() => {
        setShow(null)
    }, [model, make, fuelType])

    // Set session storage for max amount
    useEffect(() => {
        if (showMaxAmount !== 20) {
            sessionStorage.setItem("currentMaxInventoryShownAmount", `${showMaxAmount}`);
        }
    }, [showMaxAmount]);

    // Get session storage for max amount
    useEffect(() => {
        const session = sessionStorage.getItem("currentMaxInventoryShownAmount");
        if (session) {
            setShowMaxAmount(Number(session));
        }
    }, []);

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

                        <div className={show === 'year' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'year' ? setShow(null) : setShow('year')}>Year</button>
                            <div className={CSS.inputs}>
                                <input type="text" placeholder="1900" onChange={(e) => setMinYear(Number((e.target as HTMLInputElement).value))} />
                                <span>-</span>
                                <input type="text" placeholder="2024" onChange={(e) => setMaxYear(Number((e.target as HTMLInputElement).value))} />
                            </div>
                        </div>

                        <div className={show === 'fuelType' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'fuelType' ? setShow(fuelType) : setShow('fuelType')}>{fuelType || 'Fuel Type'}</button>
                            <div>
                                <ul>
                                    <li><button onClick={() => setFuelType('Gasoline')}>Gasoline</button></li>
                                    <li><button onClick={() => setFuelType('Diesel')}>Diesel</button></li>
                                    <li><button onClick={() => setFuelType('Electric')}>Electric</button></li>
                                </ul>
                            </div>
                        </div>

                        <div className={show === 'price' ? CSS.active : ''}>
                            <button className={CSS.toggle} onClick={() => show === 'price' ? setShow(null) : setShow('price')}>Price</button>
                            <div className={CSS.inputs}>
                                <input type="text" placeholder="0" onChange={(e) => setMinPrice(Number((e.target as HTMLInputElement).value))} />
                                <span>-</span>
                                <input type="text" placeholder={mostExpensiveCar.toString()} onChange={(e) => setMaxPrice(Number((e.target as HTMLInputElement).value))} />
                            </div>
                        </div>

                    </div>
                    {(model || make || minYear || maxYear || fuelType || minPrice || maxPrice) &&
                        <button className={CSS.reset} onClick={() => { setFilteredCars(cars); setMobileMenuOpen(false); setShow(null); setModel(null); setMake(null); setMinYear(null); setMaxYear(null); setFuelType(null); setMinPrice(null); setMaxPrice(null)}}>
                            Reset all filters
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3.5L3.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/><path d="M3.5 3.5L10.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/></svg>
                        </button>
                    }
                </div>

                <ul className={CSS.cars}>
                    {filteredCars.map((loop, i) => {
                        if (shownAmount < showMaxAmount) {
                            shownAmount = shownAmount + 1;
                            return (
                                <Car key={i} data={loop} />
                            )
                        }
                    })}

                    {(!filteredCars || filteredCars.length === 0) && 
                        <p style={{paddingBottom: '5em'}}>
                            No inventory that matches your search.
                            <button className={CSS.reset} style={{borderBottom: 'unset'}} onClick={() => { setFilteredCars(cars); setShow(null); setModel(null); setMake(null); setMinYear(null); setMaxYear(null); setFuelType(null); setMinPrice(null); setMaxPrice(null)}}>
                                Reset all filters
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3.5L3.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/><path d="M3.5 3.5L10.5 10.5" stroke="black" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/></svg>
                            </button>
                        </p>
                    }
                </ul>

                <div className={CSS.showMore}>
                    <p>{shownAmount < filteredCars.length ? shownAmount : filteredCars.length} out of {filteredCars.length} items seen</p>
                    {showMaxAmount < filteredCars.length &&
                        <button className="button" onClick={() => setShowMaxAmount(showMaxAmount + 20)}>Show more</button>
                    }
                </div>

            </div>
        </section>
    )
}