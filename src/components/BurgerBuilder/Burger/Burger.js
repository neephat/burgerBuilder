import React from 'react';
import './Burger.css'
import Ingredient from '../Ingredient/Ingredient';

const Burger = props => {
    let ingredientArray = props.ingredients.map((item) =>{
        let amountArray = [...Array(item.amount).keys()];
        return amountArray.map(_ =>{
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
    .reduce((arr, element) => {
        return arr.concat(element);
    }, []);
    // eslint-disable-next-line
    if(ingredientArray == 0){
        ingredientArray = <p>Please add some ingredients!</p>
    }

    return (
        <div className='Burger'>
            <Ingredient type="bread-top" />
                {ingredientArray}
            <Ingredient type="bread-bottom" />
        </div>
    )
}

export default Burger;