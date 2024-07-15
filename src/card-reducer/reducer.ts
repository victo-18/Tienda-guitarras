import { db } from "../data/db"
import { Guitar } from "../types"
import { CartItem } from "../types"
/**
 * type que define las acciones del proyecto funciones 
 */
export type CartActions =
{type:'add-toCard',payload:{item: Guitar}}|
{type:'remove-From-Cart',payload:{id:Guitar['id']}}|
{type:'decrease-Quantity',payload:{id:Guitar['id']}}|
{type:'increase-Quantity',payload:{id:Guitar['id']}}|
{type:'clear-Cart'}
/**
 * Define el estado de la aplicacion
 */
export type CartState={
    data: Guitar[],
    cart: CartItem[],
}
/**
 * Definicion de donde probienen los datos
 */
const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}
export const initialstate:CartState={
    data:db,
    cart: initialCart(),
}
/**
 * 
 * @param state Permite al auto completado 
 * @param actions 
 */
const MIN_ITEMS = 1
    const MAX_ITEMS = 5
export const cartReducer =(
    state: CartState =initialstate,
    actions: CartActions,
)=>{
    let updatedCart: CartItem[]=[]
 if(actions.type==='add-toCard'){
    const itemExists = state.cart.find(guitar => guitar.id ===actions.payload.item.id)
        if(itemExists) { // existe en el carrito
            updatedCart= state.cart.map((item)=>{
             if(item.id=== actions.payload.item.id){
                if(item.quantity <MAX_ITEMS){
                    return{
                        ...item, quantity:item.quantity+1
                    }
                    }else{
                        return item
                    }
                }else{
                    return item
                }
             }
            )
            //setCart(updatedCart)
        } else {
            const newItem : CartItem = {...actions.payload.item, quantity : 1}
            updatedCart=([...state.cart, newItem])
        }
    return{
        ...state,
        cart:updatedCart
    }
 }
 if(actions.type ==='remove-From-Cart'){
    const updatedCart = (state.cart.filter(guitar => guitar.id !==actions.payload.id))

    return{
        ...state,
        cart:updatedCart
    }
 }
 if(actions.type==="increase-Quantity"){
    const updatedCart = state.cart.map( item => {
        if(item.id === actions.payload.id && item.quantity < MAX_ITEMS) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
   
    return{
        ...state,
        cart: updatedCart
    }
 }
 if(actions.type==='decrease-Quantity'){
    const updatedCart = state.cart.map( item => {
        if(item.id === actions.payload.id && item.quantity > MIN_ITEMS) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
 
    return{
        ...state,
        cart:  updatedCart
    }
 }
 if(actions.type==="clear-Cart"){
    return{
        ...state,
        cart:[]
    }
 }
 return state
}