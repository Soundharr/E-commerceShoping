import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";


const TodoApp = ({user}) => {

    let [items,setItems]=useState([
        {id:1,lable:"HTML & CSS",checked:true},
        {id:2,lable:"JAVASCRIPT",checked:true},
        {id:3,lable:"REACT JS",checked:false},
    ])


    let [newItem, setNewItem]=useState("")
    let handleChecked = (id) => {
    let newListItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newListItems);


};
    let [isEditing,setisediting]=useState(false)

    let handleUpdate=(id)=>{
        let listItem=items.find(item=> item.id===id)
        console.log(listItem)
        setNewItem(listItem.lable)
        setisediting(true)
        setcurrentEleId(id)

    }
    let handleDelete=(id)=>{
    let deleteItem=items
        .filter((item) =>item.id !==id)
        .map((item,index) =>{
        return {...item, id :index+1};
    })
    setItems(deleteItem)
    }
    let[currentEleId,setcurrentEleId]=useState(null)
    let handleaddorsaveItem=()=>{
        if(isEditing){
            let newlist=items.map((item)=>{
                return item.id===currentEleId ?{...item, lable : newItem} :item
            }) 
            setItems(newlist)
            setcurrentEleId(null)
            setNewItem("")
            setisediting(false)
        }
        else{
            setItems([...items,{id:items.length+1, lable : newItem,checked : false}])
            setNewItem("")
        }
    }

   return (
    <main>
        <div>
            <input type='text'
                    value={newItem}
                    placeholder="Add a new item"
                    onChange={ (e)=>{setNewItem(e.target.value)} }
            />
            <button onClick={handleaddorsaveItem}>{isEditing ? <IoIosAddCircle />
 : <IoPersonAdd />
}</button>
        </div>
        <ul>
            {
                items.map((item)=>{
                    return(
                        <li key={item.id } className="main">
                            <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleChecked(item.id)}
                        />
                            <label >{item.lable}</label>
                            <FaEdit role="button" tabIndex={0} onClick={()=> handleUpdate(item.id)} />
                            <MdDeleteForever role='button' tabIndex={0}
                            onClick={()=> handleDelete (item.id)}
                            />
                        </li>
                    )

                })
            }    
        </ul>
    </main>
  )
}


export default TodoApp



