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
        <div className="boxShadow flexC w90p radius-10 pwrap__2p mwrap__2p mauto_"> 
            <div className="flexR ">
                <button className="btn bdark">
                    <span className="mdi mdi-star-crescent cwarning fzXl"></span>
                </button>
                <div className="flexC">
                    <h2 className="  pm0 cdark aiE fBebasNeue">Pengaturan Jenis Form {`( ${dt.nameJudul} )`}</h2> 
                </div> 
            </div> 
            <hr/>
            <div className="flexC jcSB pwrap_5p bwhite"> 
                <div className="flexC jcSB borderForm pwrap-10">
                    <FEinput
                        plac="Pertanyaan"
                        type="text"
                        resVal={getPertanyaan}
                        valuex={dt.pertanyaan}
                        dt={{...dt, star:true}}
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
                <br/>
                {
                    (dfOption.length>0?
                        <div className="flexC jcSB borderForm pwrap-10"> 
                            <div className="flexR "> 
                                <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">3.2</span>{` ]`} </label>
                                <label className="aiC fzL">Data Option</label>
                            </div>
                            <hr/>
                            <div className="flexC jcSB borderForm pwrap-10"> 
                                <div className="flexR "> 
                                    <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">3.2.1</span>{` ]`} </label>
                                    <label className="aiC fzL">Form Import {`(JSON)`}</label>
                                </div>
                                <hr/>
                                <FormOptionJson saveImportOptionJson={saveImportOptionJson}></FormOptionJson> 
                            </div>
                            <br/>
                            <div className="borderForm pwrap-10">
                                <div className="flexR jcSB">
                                    <div className="flexR">
                                        <label className="aiC pwrap_10 cwarning tbold fzL3">{`[ `}<span className="fzXl cdark">3.2.2</span>{` ]`} </label>
                                        <label className="aiC fzL">Data Option</label>
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
                        </div> :''
                    )
                } 
                <br/> 
                <hr/>
                <div className="flexR jcSB">
                    <label>#.jangan lupa untuk menyimpan hasil entrian </label>
                    <button className="btn bprimary" onClick={()=>finisingSettingForm()}> Saved</button>
                </div>
            </div> 
        </div> 
    )    
}
export default FEatribut;