import React,  { useEffect,useRef   }  from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { __formWithKey, _valueForm,updValueForm, delValueForm, __KdDF} from '../../states/formEntri/action';
import { userMenuS } from "../../states/sf/html/action";   
import { __listItemForView } from "../../utils/dataFormEntri";  

import FPentri from "../../components/pages/formPreview/FPentri";
import FPtabelData from "../../components/pages/formPreview/FPtabelData";

import sfHtml from "../../components/mfc/sfHtml";
import { htmlS, modalClose } from '../../states/sf/html/action';
import ModalM from '../../components/Modal/modal'; 
import { toast } from "react-toastify";

function FormPreview() {
    const { dnote, dfEntri0 } = useSelector((state) => state);
    const dispatch = useDispatch(); 

    const { value } = useParams();
    const {kdMember,kdNote,tingkat, kdForm} = JSON.parse(atob(value)); 
    const [dview,_dview]=useState([]);
    const [indV,_indV]= useState(-1);
    const kdDF = __KdDF({
        kdMember,
        kdNote,
        tingkat,
        kdForm
    });
    const [modalC, _modalC] = useState('');  


    useEffect(() => {
        // dispatch(noteSubFileUpload({
        //     tingkat,
        //     kdJudul,
        //     kdMember
        // })); 
        dispatch(userMenuS({v:46,sub:2, isi:''}));
        dispatch(__formWithKey({
            tingkat,
            kdNote,
            kdMember,
            kd:kdForm
         })); 
    }, [dispatch]);
    if(Object.keys(dfEntri0).length==0){
        return '';
    }  
    const { form,value:valuex, user } = dfEntri0; 
    const saveNewData=({dnew})=>{  
        const find = dnew.findIndex(v=>{
            try {
                return v.label==undefined
            } catch (error) {
                return v==undefined
            }
        });  
        if(find>=0){
            return toast.error(form.data[find].pertanyaan+", belum Terisi !!!");
        }
        const kd = valuex.length+1;
        try { // karena proses update dilakukan dengan data lokal, kadang error
            dispatch(
                _valueForm({
                    kd,
                    kdDF,
                    data:[...dnew],
                })
            )
        } catch (error) {
            dispatch(
                _valueForm({
                    kd,
                    kdDF,
                    data:[...dnew],
                })
            )
        }
        _dview([]);
    }
    const updData=({dnew})=>{ 
        try {
            dispatch(
                updValueForm({
                    ...valuex[indV], 
                    data:[...dnew], 
                    iv:indV
                })
            )
        } catch (error) {
            dispatch(
                updValueForm({
                    ...valuex[indV], 
                    data:[...dnew], 
                    iv:indV
                })
            )
        }
        _dview([]);
    }
    const _dataUpdata=(find)=>{ 
        _indV(find); 
        _dview(valuex[find].data);
    }
    const delData=(find)=>{  
        _modalC(
            sfHtml.modalForm({
                label : "Konfirmasi Penghapusan data",
                mclose,
                clsH: " bdanger",
                children : (
                    <p>apa benar ingin menghapus data ini ?</p>
                ),
                footer : (
                    sfHtml.modalBtn({
                        mclose,
                        xdeled:()=>delDataed(find)
                    })
                )
            })
        );
        dispatch(
            htmlS({
                modal : true,
            })
        );
    }
    const delDataed=(find)=>{ 
        mclose();
        dispatch(
            delValueForm({
                ...valuex[find],
                iv:find
            })
        )
        
    }
    function mclose(){ 
        dispatch(modalClose());
    }
    if(!user && dview.length==0 && valuex.length>0){
        _dview(valuex[0].data);
        _indV(0);
    }  
    const pertanyaan = form.data.map(v=>v.pertanyaan);  

    const batalkan=()=>{
        _dview([]);
    }
    return (
        <>
            <div className="Mcontainer bgForm aiS jcC"> 
                <div className="bodyFlexRow800  flexR pwrap-5p" style={{width:"100%"}}>
                    <FPentri
                        dtf={form}
                        saveNewData={saveNewData}
                        dvalue={dview}
                        updData={updData}
                        batalkan={batalkan}
                    ></FPentri> 
                </div> 
            </div>
            <div className="Mcontainer bgForm aiS jcC"> 
                <div className="bodyFlexRow800  flexR pwrap_5p" style={{width:"100%"}}>
                    { (user?
                        <>
                        <FPtabelData
                            dt={valuex.map(v=>{ return [...v.data,v.name]})}
                            pertanyaan={pertanyaan}  
                            user={user}
                            updData={_dataUpdata}
                            delData={delData}
                            tujuan={form.tujuan}
                            kdDF={kdDF}
                        ></FPtabelData>
                        </>:''
                    )
                }
                </div> 
            </div>
            
            {
                (modalC!='' ?
                    <ModalM
                        children ={modalC} 
                    ></ModalM>:
                    ""
                )
            }
        </>
    )
    
}
export default FormPreview;