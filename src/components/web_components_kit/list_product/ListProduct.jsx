import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { category } from '../../../redux/reducers/category_reducer';
import { deleteProduct, products, updateProduct } from '../../../redux/reducers/product_reducer';
import newId from '../../../utils/newId';


function ModalUpdateList({ dispatch, deleteProduct, selectState, item , hidden, onHiddenClick}) {

    const [modalOpen, setModalOpen] = useState(true)
    const [update, setUpdate] = useState(false)
    const [updateObj, setUpdateObj] = useState({ ...item })
    const [charListProd, setCharListProd] = useState([])
    const [selectedChar, setSelectedChar] = useState("")

    console.log(updateObj)
    console.log(selectState)

    const [objImg, setObjImg] = useState({sendimage: {} });
    
    const { categoryArr } = useSelector( state => state.categorys )
    const { def_char } = useSelector( state => state.def_char )

    useEffect(()=>{
        let arr = []
        if(def_char && def_char !== null ){
          def_char.forEach((item)=>item.category_id === updateObj.category_id && arr.push(item) )
          setCharListProd(arr)
        }
        console.log(arr)
    },[def_char])

    console.log(def_char)

    const handlePhotoInputChange = (e) => {
        let countId = Object.keys(objImg.sendimage).length;
        let newObjImg = {...objImg, sendimage:{...objImg.sendimage}};
        
        for(let i = 0; i < e.currentTarget.files.length; i++ ){
            newObjImg = {...newObjImg, sendimage: {...newObjImg.sendimage, [i+countId]: e.currentTarget.files[i] }}
        }
        console.log(newObjImg)
        setObjImg(newObjImg)
    }

    const deleteImageArray = (index) => {
        console.log(index)
        let newArrImgs = [...updateObj.imgsArr];
        newArrImgs.splice(index, 1)
        setUpdateObj({...updateObj, imgsArr: newArrImgs})
    }

    const deleteImage = (item) => {
        let deleteImageObj = {...objImg, sendimage: { ...objImg.sendimage}}
        delete deleteImageObj.sendimage[item]
        setObjImg(deleteImageObj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let arrOldImg = []
        updateObj.imgsArr.map((item)=>arrOldImg.push(Number(item.id)))
        dispatch(updateProduct(updateObj, selectState, objImg, arrOldImg))
        setUpdate(false)
    }

    const URL_ADDRESS = "http://xn--k1acecair0j.xn--p1ai/"

    return (
        <>
            <div className='button-modal_open' onClick={() => setModalOpen(false)}>
               <button type='button' className='form_button-submit'>
                    Развернуть
                </button>
            </div>


            {!modalOpen && <div className='modal_container'>
                <div className='modal_container-background' onClick={() => setModalOpen(true)} ></div>
                <div className='modal_container-border'>
                    <div className='modal_container-close_modal'>
                        <div onClick={()=>{ setUpdate(!update) }} className='modal_container-edit_button'>
                            { 
                                update ? "Выкл. редактирование" :  "Вкл. редактирование" 
                            }
                        </div>
                        <div onClick={() => {
                            setModalOpen(true);
                            onHiddenClick();
                        }} className='modal_container-close_modal_container'>
                            x
                        </div>
                    </div>
                    
                    <div className='modal_contaner-content'>
                        <div className='content_title-modal_container'>
                            {item.name}
                        </div>
                        <div className='content_info-modal_container'>
                            {/* <ProductionListElement dispatch={dispatch} deleteProduct={deleteProduct} selectState={selectState} item={item}/> */}
                            {
                                <form className='info_update_block-element_product' onSubmit={handleSubmit}>

                                    <div className='info_update_block-container'>
                                        {/* <label>Сведения о товаре:</label> */}
                                        <div className='block_input-element_list'>
                                            <div className='input_update_block-container_element'>
                                                <label>Сведения о товаре:</label>
                                                <div className="input_container-element_product">
                                                    <label>Название</label>
                                                    <input value={updateObj.name} onChange={(e) => setUpdateObj({ ...updateObj, name: e.target.value })} type="text" disabled={!update} />
                                                </div>
                                                <div className="input_container-element_product">
                                                    <label>Производитель</label>
                                                    <input value={updateObj.brand} onChange={(e) => setUpdateObj({ ...updateObj, brand: e.target.value })} type="text" disabled={!update} />
                                                </div>
                                                <div className="input_container-element_product">
                                                    <label>Цена</label>
                                                    <input value={updateObj.price} onChange={(e) => setUpdateObj({ ...updateObj, price: e.target.value })} type="text" disabled={!update} />
                                                </div>
                                                <div className="input_container-element_product">
                                                    <label>Описание</label>
                                                    <textarea value={updateObj.description} onChange={(e) => setUpdateObj({ ...updateObj, description: e.target.value })} type="text" disabled={!update} />
                                                </div>
                                            </div>
                                            <div className='input_update_block-container_element'>
                                            <label>Характеристики:</label>
                                                {
                                                    updateObj && updateObj.char.length !== 0 ?
                                                        updateObj.char.map((item, index) => <div key={item.id} className="input_container-element_product">
                                                            <div>
                                                                 <label>{item.name}
                                                                 {update && <span className='delete_button' onClick={()=>{
                                                                    let arr = [...updateObj.char]
                                                                    arr.splice(index, 1)
                                                                    setUpdateObj({ ...updateObj, char:arr})}
                                                                    }>X</span>
                                                                    }
                                                                </label>
                                                            </div>
                                                           
                                                            <input value={updateObj.char[index]["value"]} onChange={(e) => {
                                                                let obj = { ...updateObj };
                                                                obj.char[index] = { ...obj.char[index], ["value"]: e.target.value }
                                                                debugger
                                                                setUpdateObj(obj)
                                                            }
                                                            } type="text" disabled={!update} />
                                                           
                                                        </div>)
                                                        :
                                                        <div>
                                                            Нет характеристик
                                                        </div>
                                                }
                                                {
                                                    update && <>
                                                        <select name="char" id="char" value={selectedChar} onChange={(e)=>{
                                                            console.log(e.target.value)
                                                            setSelectedChar(e.target.value)}
                                                            }>
                                                        <option value=""></option>
                                                            {
                                                                
                                                                charListProd && charListProd !== null && charListProd.map((item)=><option value={item.id} key={item.id}>
                                                                    {item.name}
                                                                </option>)
                                                            }
                                                        </select>
                                                        <button disabled={selectedChar === "" ? true : false} type='button' onClick={()=> setUpdateObj({ ...updateObj, char:[...updateObj.char].concat([charListProd.find((item)=> item.id === selectedChar)]) }) } className='form_button-submit'>
                                                            Добавить характеристику
                                                        </button>
                                                    
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <label>Photo</label>
                                        <div className='block_photo-element_list'>

                                            <div className='input_update_block-container_element'>
                                                <div className="input_container-element_product photo_element-list_container">
                                                    {/* <label>Photo</label> */}
                                                    {/* <input value={updateObj.name} onChange={(e)=> setUpdateObj({...updateObj, name: e.target.value})} type="text" disabled={!update}/> */}
                                                    {
                                                        updateObj && updateObj.imgsArr !== null && updateObj.imgsArr.length !== 0 &&
                                                                updateObj.imgsArr.map((item, index) => <div className="obramlenie_udalenie" key={item.id} >
                                                                    <img src={`${URL_ADDRESS}/${item.url}`} style={{ width: '250px', height: '250px' }}></img>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', width: '250px', marginTop: '10px' }}>
                                                                    {
                                                                        update &&  <button onClick={()=>deleteImageArray(index)} type='button' style={{ width: '250px' }} className='form_button-submit'>
                                                                            Удалить 
                                                                        </button>
                                                                    }
                                                                    </div>
                                                                </div>
                                                                )
                                                    }
                                                    {
                                                        objImg.sendimage && objImg.sendimage !== null && objImg.sendimage.length !== 0 &&
                                                                <>
                                                                    {
                                                                        Object.keys(objImg.sendimage).map((item)=>  <div className="obramlenie_udalenie" key={newId()} >
                                                                            <img style={{ width: '250px', height: '250px' }} src={objImg.sendimage ? URL.createObjectURL(objImg.sendimage[item]) : null} alt="" />
                                                                            <br />
                                                                           {update && <button onClick={()=> deleteImage(item)} type='button' className='form_button-submit'>
                                                                                Удалить 
                                                                            </button>}
                                                                        </div>)
                                                                    } 
                                                                        
                                                                </>  
                                                    }      
                                                     <div style={{ padding:'10px' }}>
                                                        {/* <p>Добавить изображение</p> */}
                                                        <label htmlFor="photo_new" className='new_poto-list_element-list obramlenie_udalenie' >+</label>
                                                        <input name='photo_new' id='photo_new' multiple type="file" style={{ display: "none" }} disabled={!update} onChange={handlePhotoInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className='input_update_block-container_element'> */}

                                                {/* <p>Добавить изображение</p> */}
                                                {/* <label htmlFor="photo_new" className='new_poto-list_element-list obramlenie_udalenie'>+</label> */}
                                                {/* <input name='photo_new' id='photo_new' multiple type="file" style={{ display: "none" }} onChange={handlePhotoInputChange} /> */}
                                            {/* </div> */}
                                        </div>


                                    </div>
                                    <button className='form_button-submit' disabled={!update} type='submit'>Обновить товар</button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

function Search({ item, setDataSearchState }) {

    const [search, setSearch] = useState("");

    const dataSearch = (e) => {
        setSearch(e)
        const value = e.toLowerCase();
        const filter = item.filter(product => {
            return product.name.toLowerCase().includes(value);
        });
        setDataSearchState(filter)
        // update({ data: filter, active: 0, term: value }); 
    }

    return (
        <>
            <div className='search_conainer'>
                {/* <div className='title_search'>
                    Поиск
                </div> */}
                <div>
                    <input placeholder='Введите название товара для поиска...' style={{ width: '100%', height: '50px', fontSize: '30px' }} type="text" value={search} onChange={(e) => dataSearch(e.target.value)} />
                </div>
            </div>
        </>
    )
}

function ProductionListElement({ dispatch, deleteProduct, selectState, item }) {

    const [hidden, setHidden] = useState(false)

    const onHiddenClick = () => {
        setHidden(!hidden)
    }
 
    const URL = "http://xn--k1acecair0j.xn--p1ai/"

    return (

        <div key={item.id} className='element_products-list_element' >

            <div className='element_products-list_element__container'>
                <div>
                    <div>{item.name}</div>
                    <div>
                        {
                            item.brand && <div>
                                Производитель:
                                {item.brand}
                            </div>

                        }
                    </div>
                </div>
                <div className='element-list_button'>
                    <div className='element-list_button-hidden'>
                        {
                            <ModalUpdateList hidden={hidden} onHiddenClick={onHiddenClick} dispatch={dispatch} deleteProduct={deleteProduct} selectState={selectState} item={item} />
                        }
                    </div   >
                    <div>
                        <div onClick={() => dispatch(deleteProduct(item.id, selectState))}>
                            <button type='button' className='form_button-submit'>
                                Удалить
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ListElement({ products_category_id, dispatch, deleteProduct, selectState }) {

    const [dataSearchState, setDataSearchState] = useState(null);

    useEffect(() => {
        products_category_id &&
            products_category_id !== null &&
            setDataSearchState(products_category_id)
    }, [products_category_id])

    return (
        <>
            <div>
                {
                    dataSearchState &&
                    dataSearchState !== null &&
                    <Search item={products_category_id} setDataSearchState={setDataSearchState} />
                }
            </div>


            <div className="list_element">
                {
                    dataSearchState &&
                        dataSearchState !== null ?
                        <>

                            {
                                dataSearchState.map((item) => <ProductionListElement key={item.id} dispatch={dispatch} deleteProduct={deleteProduct} selectState={selectState} item={item} />
                               
                                )
                            }

                        </>
                        :
                        <div>Нет товара</div>
                }
            </div>
        </>
    )
}


function ListProduct() {

    const { products_category_id } = useSelector(state => state.products)
    const { categoryArr } = useSelector(state => state.categorys)

    const [selectState, setSelectState] = useState("")
    const [flag, setFlag] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        if (selectState === "") {
            setFlag(false)
        } else {
            setFlag(true)
            console.log(products_category_id)
            dispatch(products(selectState))
        }

    }, [selectState])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="create_product-container bottom_margin">
                <div className="create_product-form" >
                    <div className="title_element">
                        <p>Список товаров</p>
                    </div>

                    <div className='select_container-listElement' >
                        {
                            categoryArr &&
                            categoryArr !== null && <select className='select_category-element' value={selectState} onChange={(e) => setSelectState(e.target.value)}>
                                <option value=""></option>

                                {
                                    categoryArr.map((item) => <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }

                            </select>
                        }
                    </div>
                    {
                        flag && <ListElement products_category_id={products_category_id} dispatch={dispatch} deleteProduct={deleteProduct} selectState={selectState} />

                    }

                </div>

            </div>
        </>

    )
}

export default ListProduct;
