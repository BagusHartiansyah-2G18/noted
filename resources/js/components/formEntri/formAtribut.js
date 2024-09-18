import React, {useState} from "react"; 
import FEinputLoop from "./inputLoop";
import FEinput from "./input";
import FaOption from "./faOption";
import { __listItemForAttrOps  } from "../../utils/dataFormEntri"; 
import FormOptionJson from "../../components/pages/formEntriData/formOptionJson"; 


function FEatribut({ dt, indS, addNewAttrOption, sendBackData,delAttrOption, finisingSettingForm, setModal, saveImportOptionJson }){ // indS selected
    const getPertanyaan=(v)=>{ 
        dt.pertanyaan = v.value;
        if(!v.dt.star || v.dt.star == undefined){
            sendBackData(dt);
        }
    }
    const getInputAttr=(v)=>{ 
        dt.valueAttr[parseInt(v.dt.ind)]=v.value;  
    }
    const getInputOption=(v)=>{ 
        const fdt = v.dt;
        dt.valueOption[fdt.i][fdt.ind]=v.value;
    } 
    const {indF,indO}= dt;   
    const {dfAttr,dfOption} = __listItemForAttrOps({ indF,indO,actAttr:getInputAttr,actOption:getInputOption, dt}); 
    const addNewAttrOptionSub =()=>{ 
        const fdt = [...dt.valueOption];
        fdt[fdt.length]=dt.valueOption[dt.valueOption.length-1].map(element =>"" );
        addNewAttrOption({ newDT : {...dt, valueOption:[...fdt]}}); 
    } 
    return (
        <div className="boxShadow blight cwhite flexC w90p radius-10 " style={{margin:"10px auto 10px auto"}}>
            <div className="flexR binfo jcSB pwrap__10 radius__10 ">
                <div className="flexR aiC" >
                    <button className="btn bdark">
                        <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                    </button>
                    <div className="flexC aiC">
                        <h2 className="  pm0  aiE fBebasNeue">Pengaturan Jenis Form {`( ${dt.nameJudul} )`} </h2> 
                    </div> 
                </div> 
                {
                    (dfOption.length>0 &&
                        <button className="btn bprimary" onClick={()=>finisingSettingForm()}> Saved</button>
                    )
                }
            </div> 
            <div className={`Mcontainer2Form bgForm body aiS`} style={{
                ...(dfOption.length==0 ? {justifyContent:"center"}:{})
            }}>
                {
                    (dfOption.length>0?
                        <div className="left">
                            <div class="FM1">
                                <div class="header bwhite">
                                    <div class="cdark flexR">
                                        <button className="btn bdark">
                                            <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                                        </button>
                                        <h2 className="  pl0 aiE fBebasNeue">
                                            <b>Atribut Option</b> 
                                        </h2>
                                    </div> 
                                </div>
                                <div class="body bdark pwrap-5" style={{width:"unset" }}> 
                                
                                        <div className="flexC jcSB borderForm pwrap-10 clight"> 
                                            {/* <div className="flexR "> 
                                                <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl ">3.2</span>{` ]`} </label>
                                                <label className="aiC fzL">Data Option</label>
                                            </div>
                                            <hr/> */}
                                            <div className="flexC jcSB  pwrap-10 bsolid1 cinfo"> 
                                                <div className="flexR "> 
                                                    <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl ">Form Import {`(JSON)`}</span>{` ]`} </label>
                                                    {/* <label className="aiC fzL"></label> */}
                                                </div>
                                                <hr/>
                                                <FormOptionJson saveImportOptionJson={saveImportOptionJson}></FormOptionJson> 
                                            </div>
                                            <br/>
                                            <div className="borderForm pwrap-10 bsolid1 cinfo">
                                                <div className="flexR jcSB">
                                                    <div className="flexR">
                                                        <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl ">Data Option</span>{` ]`} </label>
                                                        <label className="aiC fzL"></label>
                                                    </div>
                                                    <div>
                                                        {/* <button className="btn bprimary" onClick={()=>setModal({ key:"importOptionJson" })}> Import JSON</button> */}
                                                        <button className="btn bprimary" onClick={()=>addNewAttrOptionSub()}> Add New Option</button>
                                                    </div> 
                                                </div>
                                                <hr/> 
                                                <FaOption dt={dt} form={dfOption} 
                                                    delAttrOption={delAttrOption} 
                                                ></FaOption>
                                            </div> 
                                        </div>
                                </div>
                            </div>
                        </div> 
                        :''
                    )
                } 
                <div className="right" > 
                    <div class="FM1">
                        <div class="header bwhite">
                            <div class="cdark flexR">
                                <button className="btn bdark">
                                    <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                                </button>
                                <h2 className="  pl0 aiE fBebasNeue">
                                    <b>Atribut Form</b> 
                                </h2>
                            </div> 
                        </div>
                        <div class="body bdark" style={{width:"unset" }}> 
                            <div className="flexC jcSB borderForm pwrap-10">
                                <FEinput
                                    plac="Pertanyaan"
                                    type="text"
                                    resVal={getPertanyaan}
                                    valuex={dt.pertanyaan}
                                    dt={{...dt, star:true}}
                                    runSwitch={false}
                                ></FEinput>
                            </div>
                            <br/>
                            <div className="flexC jcSB borderForm pwrap-10"> 
                                <div className="flexR">
                                    <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">3.1</span>{` ]`} </label>
                                    <label className="aiC fzL">Atribut Jenis Form {dt.label}</label>
                                </div>
                                <hr/>  
                                {
                                    (dfAttr.length == 2 ?
                                        <div className="flexR jcSB">
                                            <FEinputLoop dt={dfAttr}></FEinputLoop>
                                        </div>:
                                        <FEinputLoop dt={dfAttr}></FEinputLoop>
                                    )
                                } 
                            </div> 
                            {
                                (dfOption.length==0 &&
                                    <div className="flexC jcSB pwrap_5p ">    
                                        <hr/>
                                        <div className="flexR jcSB">
                                            <label>#.jangan lupa untuk menyimpan hasil entrian </label>
                                            <button className="btn bprimary" onClick={()=>finisingSettingForm()}> Saved</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div> 
                </div>  
            </div> 
        </div>
        
    )    
}
export default FEatribut;