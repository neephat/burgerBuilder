import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap'
import { INGRIDENT_PRICES } from '../../../redux/reducer'

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},

]

const BuildControl = (props) =>{
    
    return (
        <div className='d-flex'>
            <div className='me-auto ml-5' style={{fontWeight: 700, fontSize: '1.2rem'}}>{props.label} ({INGRIDENT_PRICES[props.type]} BDT)</div>
            <button className='btn btn-danger btn-sm m-1' onClick={props.remove}>&#8722;</button>
            <button className='btn btn-success btn-sm m-1' onClick={props.added}>&#43;</button>
        </div>
    )
}

const Controls = (props) => {

  return (
    <div className='container ml-md-5' style={{textAlign: "center"}}>
        <Card className='mt-3' style={{marginTop: '30px', marginBottom: '30px', textAlign: 'center'}}>
            <CardHeader style={{
                background: '#D70F64',
                color: 'white'
            }}><h4>Add Ingredients</h4></CardHeader>
            <CardBody>
                {controls.map((item)=>{
                    return <BuildControl label={item.label}
                    type={item.type} added={()=>props.addIngredientHandle(item.type)} 
                    remove={()=>props.removeIngredientHandle(item.type)}key={Math.random()}/>
                    
                })}
                
            </CardBody>
            
            <CardFooter>
                <h5>Price: {props.price} BDT</h5>
            </CardFooter>
            <Button disabled={!props.purchasable} onClick={props.toggleModal} style={{background: '#D70F64', borderColor: 'white'}}>Order Now</Button>
        </Card>
    </div>
  )
}

export default Controls