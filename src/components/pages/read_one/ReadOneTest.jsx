import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getReadOne, remuveReadOne } from '../../../redux/reducers/product_reducer'
import Categories from '../../web_components_kit/categories/Categories'
import GoBackNext from '../../web_components_kit/goBack/GoBackNext'
import PageTitle from '../../web_components_kit/page_title/PageTitle'
import Placeholder from '../../../images/plaseholder_image.png'
import { setCart } from '../../../redux/reducers/cart_reducer'

function ReadOneTest() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [state, setState] = useState()


    useEffect(()=>{

        setState(true)
        dispatch(getReadOne(id))

        return ()=> {
            setState(false);
        dispatch(remuveReadOne())}
    }, [id])

    const { read_one } = useSelector( state => state.products )
    const { cart } = useSelector( state => state.carts )

    const onClickCart = () => {
        dispatch( setCart([...cart, { id: read_one.id, name: read_one.name, category_id: read_one.category_id , category_name: read_one.category_name}]) )
    }

    useEffect(() => {
        console.log(read_one)
    }, [read_one])

    const URL = "http://xn--k1acecair0j.xn--p1ai/"

    const [stateImg, setImgState] = useState([0, 1])
    const [ heightChar, setHeightChar ] = useState(true)

    return (
        <>
            <div>
                <PageTitle  title={"Каталог"} />
                <div className="__container">
                    <div style={{ float:'left', marginRight:'25px'}}>
                            <Categories />
                    </div>
                    <div className="read_one-product">
                        {
                            read_one && !!state && state !== null && read_one !== undefined ? 
                            <div style={{ width:'100%' }}>
                                <div style={{ display:'flex', marginBottom:'30px' }}>
                                    <div style={{ marginRight:'20px', marginRight:'150px' }}>
                                        <div style={{ fontSize:'34px', fontWeight:'bold', marginBottom:'40px' }}>
                                            {
                                                read_one.name
                                            } 
                                        </div>

                                        { 
                                            read_one.imgsArr && read_one.imgsArr[stateImg[0]] && read_one.imgsArr[stateImg[0]] !== undefined && read_one.imgsArr !== null?
                                            <div className="photo_block-read_one">
                                                <div className="photo_block-small_image" style={{ background:`url('${URL}/${read_one.imgsArr[stateImg[0]].url}')`}} >
                                              
                                                </div>
                                                
                                                <div style={{ display:'flex', minWidth:'50px', maxWidth:'350px', justifyContent:'space-between' }}>
                                                    {
                                                        read_one.imgsArr.map((item, index)=> <div key={item.id}>
                                                           
                                                            <div onClick={ () => setImgState([index, item.id]) } style={{ background:`url('${URL}/${item.url}')`, backgroundSize:'cover', backgroundPosition:"center", backgroundRepeat:'no-repeat' , width:'50px', height:'50px', marginRight:'15px', cursor:'pointer' }}></div>
                                                        </div> )
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <>
                                            <div style={{ width:'350px', height:'350px', background:`url('${Placeholder}')`, backgroundSize:'contain', backgroundRepeat:'no-repeat'}} >

                                            </div>
                                            </>
                                        }
                                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <div className={"title_p__all"}> { read_one.price && <div> <p > Цена: </p> <div> {read_one.price} Р</div> </div>} </div>
                                            <div onClick={ onClickCart } className="read_one-addInCart" > 
                                                В корзину 
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        {/* characteristics */}
                                        <div style={{ height: heightChar ? '590px' : '100%', overflow:'hidden' , display:'flex', flexDirection:'column' }}>
                                            <p style={{ fontWeight:'bold', fontSize:'34px', marginBottom:'20px' }}>Характеристики</p>

                                             {/* brand */}
                                            <div className={"title_p__all"}> 
                                              <div> 
                                                  <p style={{ marginBottom:'10px' }}>  Производитель: </p> 
                                                    <div>
                                                        {
                                                            read_one.brand && read_one.brand !== undefined && <div style={{ background: '#4682b42b' }}>
                                                                {read_one.brand}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className={"title_p__all"}> { item.Производитель && <div> <p style={{ marginBottom:'10px' }}> Производитель: </p> <div> {item.Производитель} </div> </div>} </div> */}
                                            {
                                                Array.isArray(read_one.char) && read_one.char.length > 0 ? <>
                                                    { read_one.char.map((item, index)=><div key={index}>
                
                                                        <div className={"title_p__all"}> { item.name && <div> <p style={{ marginBottom:'10px' }}>  {item.name}:   </p> <div style={{ background: '#4682b42b' }}> {item.value } </div> </div>} </div>

                                                    </div>)}
                                                </>
                                                : <>
                                                    <div className={"title_p__all"}> 
                                                        Нет информации
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {
                                         Array.isArray(read_one.char)  && read_one.char.length > 0 && <div style={{cursor:'pointer', marginTop: !heightChar && '-15px'}} onClick={()=>{setHeightChar(!heightChar)}} >
                                            { !heightChar ? "Скрыть" :"Показать все характеристики"}
                                        </div>
                                        }
                                        {/* last_receipts */}
                                        <div></div>
                                    </div> 
                                </div>
                                 {/* description */}
                                <div className="shadow_box-block">
                                    <div className={"title_p__all"}> { read_one.characteristics &&  <div> <p style={{ marginBottom:'10px' }}>  Описание   </p> <div> {read_one.description } </div> </div> } </div>
                                </div> 
                            </div>
                            : 
                            <div>
                                Loading...
                            </div>
                        }
                    </div>  
                </div>
                <GoBackNext/>
            </div>
        </>
    )
}

export default ReadOneTest
