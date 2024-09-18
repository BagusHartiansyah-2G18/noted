import React,  { useEffect,useRef   } from "react";
import { noteSubFileUpload, actUFSubNote, baseUrl,noteSub } from "../../states/noted/action";
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ModalM from '../../components/Modal/modal';

import { toast } from "react-toastify";
import { userMenuS } from "../../states/sf/html/action"
import sfHtml from "../../components/mfc/sfHtml";

import { htmlS, modalClose } from '../../states/sf/html/action';

import {  __cbForm, __opsForm, __selectform, __infoListTerpilih } from "../../utils/dataFormEntri";
import { __form,_form,updForm, _newOption,_typeForm, delTypeFormSelected, updSelectForm,finisingSettingForm } from '../../states/formEntri/action';
 
import FEatribut from "../../components/formEntri/formAtribut"; 
import ListInformasiNote from '../../components/pages/listInformasiNote';
import FEDnewData from '../../components/pages/formEntriData/newData';
import FEDjenisForm from '../../components/pages/formEntriData/jenisForm'; 
import FormOptionJson from "../../components/pages/formEntriData/formOptionJson"; 

function FormEntri() {
    const { dnote,  dfEntri0 } = useSelector((state) => state);
    const dispatch = useDispatch(); 

   
    const { value } = useParams();
    const {kdMember,kdJudul,tingkat} = JSON.parse(atob(value)); 
    const keyDB=()=>{
        return {
            kdMember,
            kdNote:kdJudul,
            tingkat,
        }
    } 

    const [modalC, _modalC] = useState('');  

    let tamDtProses = {} // karena pertanyaan nda ke detek update datanya 
    const [settingV, _settingV] = useState({});   

    // FEDnewData
    const pilihTypeForm=(find)=>{
        _indS(find);
    }
    const buatFormBaru=({ tujuan })=>{
        if(tujuan.length<15){
            return toast("mohon tambahkan sedikit lagi keterangan tujuannya ya, minimal 15 huruf.");
        }
        dispatch(_form({
            ...keyDB(),
            kd:(dfEntri0.length+1),
            tujuan,
        }))
    }
    const formPerbaruiTujuan=({ tujuan, indU })=>{
        if(tujuan.length<15){
            return toast("mohon tambahkan sedikit lagi keterangan tujuannya ya, minimal 15 huruf.");
        }
        dispatch(updForm({
            ...keyDB(),
            kd:(dfEntri0[indU].kd),
            tujuan,
            indU
        }))
    }

    // FEDjenisForm
    const[indS,_indS]  = useState(-1);
    const PilihJenisForm = ({indF, indO}) =>{  
        dispatch(_typeForm({ data:[...dfEntri0[indS].data], indS ,indF, indO, keydb:{...keyDB(), kd:dfEntri0[indS].kd} }));
    }
    const delTypeFormSelectedx=(indTS)=>{  
        dispatch(delTypeFormSelected({
            data:dfEntri0[indS].data.filter((v,i)=>i!=indTS),
            indS,...keyDB(),kd:dfEntri0[indS].kd})
        );
        _settingV({});
    } 
    const aturSettingV=(v)=>{  
        if(Object.keys(settingV).length>0 && Object.keys(tamDtProses).length>0 ){ 
            dispatch(updSelectForm({
                data:dfEntri0[indS].data.map((v,i)=>{
                    if(i==settingV.i){
                        return tamDtProses;
                    }
                    return v;
                }),
                indTS:settingV.i,
                ...keyDB(),
                indS,
                kd:dfEntri0[indS].kd 
            }));
        } 
        _settingV((
            v.i == settingV.i && Object.keys(tamDtProses).length>0  ? 
            {v:tamDtProses, i:v.i}
            :v
        ));
        if(v.dalamProses == undefined){
            tamDtProses={};
        }
    }
    const addNewAttrOption=({ newDT })=>{    
        try {
            dispatch(updSelectForm({
                data:dfEntri0[indS].data.map((v,i)=>{
                    if(i==settingV.i){
                        return newDT;
                    }
                    return v;
                }),
                indTS:settingV.i,
                ...keyDB(),
                indS,
                kd:dfEntri0[indS].kd 
            }));
        } catch (error) {
            dispatch(updSelectForm({
                data:dfEntri0[indS].data.map((v,i)=>{
                    if(i==settingV.i){
                        return newDT;
                    }
                    return v;
                }),
                indTS:settingV.i,
                ...keyDB(),
                indS,
                kd:dfEntri0[indS].kd 
            }));
        }
        _settingV({...settingV,v:newDT});
    }
    const delAttrOption=({indO})=>{ 
        const newDT = dfEntri0[indS].data.map((v,i)=>{
            if(i==settingV.i){
                return {
                    ...v,
                    valueOption:v.valueOption.filter((v1,i1)=>i1!=indO)
                };
            }
            return v;
        });
        dispatch(updSelectForm({
            data:newDT,
            indTS:settingV.i,
            ...keyDB(),
            indS,
            kd:dfEntri0[indS].kd 
        }));  
        _settingV({...settingV,v:newDT[settingV.i]});   
    }
    const finisingSettingForm1=()=>{
        try {
            dispatch(finisingSettingForm({
                data:dfEntri0[indS].data.map((v,i)=>{
                    if(i==settingV.i){
                        return (Object.keys(tamDtProses).length==0? v:tamDtProses);
                    }
                    return v;
                }),
                indTS:settingV.i,
                ...keyDB(),
                indS,
                kd:dfEntri0[indS].kd 
            }));
        } catch (error) {
            dispatch(finisingSettingForm({
                data:dfEntri0[indS].data.map((v,i)=>{
                    if(i==settingV.i){
                        return (Object.keys(tamDtProses).length==0? v:tamDtProses);
                    }
                    return v;
                }),
                indTS:settingV.i,
                ...keyDB(),
                indS,
                kd:dfEntri0[indS].kd 
            }));
        }
        _settingV({});
    }
    const __backData=(fdt)=>{
        tamDtProses=fdt; 
    }
    

    useEffect(() => {
        dispatch(noteSubFileUpload({
            tingkat,
            kdJudul,
            kdMember
        }));
        dispatch(userMenuS({v:41,sub:1}));
        dispatch(__form({
            tingkat,
            kdNote:kdJudul,
            kdMember
         })); 
         
    }, [dispatch]);
    
    
    if(dnote.induk==undefined){
        return '';
    } 
    const inode = dnote.induk.length-1;
    const {  keyAkses  } = dnote;  
    
    function mclose(){
        // console.log(dnote);
        dispatch(modalClose());
    }   
    
    const changeSub=({tingkat, kdMember, kdJudul})=>{
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
    }
    
    const setModal=({ key })=>{ 
        switch (key) {
            case "importOptionJson":
                importOptionJson();
            break;
        }
    }

    // batas -> set Modal
    const importOptionJson=()=>{
        aturSettingV({...settingV,dalamProses:false});
        _modalC(
            sfHtml.modalForm({
                label : "Form Import Option",
                mclose,
                clsH: " bprimary",
                children : <FormOptionJson saveImportOptionJson={saveImportOptionJson}></FormOptionJson>,
                // footer : (
                //     sfHtml.modalBtn({
                //         mclose,
                //         xdeled:()=>delDataed(find)
                //     })
                // )
            })
        );
        dispatch(
            htmlS({
                modal : true,
            })
        );
    }
    const saveImportOptionJson=({col, val, select})=>{  
        if(select.length ==0 ){
            return toast.error("Mohon untuk menambahkan file JSON");
        }
        const dstar = (Object.keys(tamDtProses).length>0?tamDtProses:settingV.v); 
        addNewAttrOption({
            newDT:{
                ...dstar,
                valueOption:[
                    ...dstar.valueOption,
                    ...val.map((v,i)=>[v[select[0]], v[select[1]],v])  
                ]
            }
        });
        mclose();
    }  
 
     
    // if(dfEntri0.length>0  && indS<0){
    //     _indS(0);
    //     _settingV({
    //         "v": {
    //             "indF": 0,
    //             "indO": 0,
    //             "pertanyaan": "Nama Pekerja ?",
    //             "valueAttr": [
    //                 "nmP",
    //                 "nmP"
    //             ],
    //             "valueOption": [],
    //             "nameJudul": "Input",
    //             "name": "text",
    //             "alt": "bidang input teks satu baris",
    //             "attr": [
    //                 0,
    //                 1
    //             ]
    //         },
    //         "i": 0
    //     });
    // } 
    return (
        <>
            <div className="Mcontainer2Form bgForm body aiS"> 
                <div className="right">
                    <div class="FM1">
                        <div class="header bwhite">
                            <div class="cdark flexR">
                                <button className="btn bdark">
                                    <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                                </button>
                                <h2 className="  pl0 aiE fBebasNeue">
                                    <b>List Noted Selected</b> 
                                </h2>
                            </div> 
                        </div>
                        <div class="body bdark" style={{width:"unset" }}> 
                            {
                                (
                                    dnote.induk.length>0 &&
                                    <ListInformasiNote dinduk={dnote.induk} changeSub={changeSub} key={1}></ListInformasiNote>
                                )
                            }  
                        </div>
                    </div>
                </div>
                <div className="left" > 
                    {
                        <FEDnewData 
                            buatFormBaru={buatFormBaru} 
                            dbForm={dfEntri0}
                            pilihTypeForm={pilihTypeForm}
                            keyDB={keyDB}
                            formPerbaruiTujuan={formPerbaruiTujuan}
                            keyAkses={keyAkses}
                        ></FEDnewData>
                    } 
                </div>
            </div>
            
            {
                (indS>=0 && 
                    <div className="boxShadow blight cwhite flexC w90p radius-10" style={{margin:"10px auto 10px auto"}}>
                        <div className="flexR binfo pwrap__10 radius__10 ">
                            <button className="btn bdark">
                                <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                            </button>
                            <div className="flexC">
                                <h2 className="  pm0  aiE fBebasNeue">Pengaturan Form
                                </h2>
                                <p className="pm0">{dfEntri0[indS].tujuan}</p>
                            </div> 
                        </div> 
                        <div className="Mcontainer2Form bgForm body aiS">
                            <FEDjenisForm
                                indS={indS}
                                PilihJenisForm={PilihJenisForm}
                                deData={dfEntri0[indS].data}
                                delTypeFormSelected={delTypeFormSelectedx}
                                aturSettingV={aturSettingV} 
                            ></FEDjenisForm>    
                        </div>
                        
                </div>
            ) }
            
            
            {
                (
                    Object.keys(settingV).length != 0 &&
                    <FEatribut
                        dt={{...settingV.v}} 
                        addNewAttrOption={addNewAttrOption}
                        indS={settingV.i}
                        sendBackData={__backData}
                        finisingSettingForm={finisingSettingForm1}
                        delAttrOption={delAttrOption}
                        setModal={setModal}
                        saveImportOptionJson={saveImportOptionJson}
                    ></FEatribut> 
                )
            } 
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
export default FormEntri;