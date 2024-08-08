import React,  { useState } from "react";
import { useInput } from '../../../../hooks/useInput';
import Tabel1 from "../../../tabel/tabel1";

export default function PPshareMember({ dmember, dmSelect, resVal }){
    const [search, setSearch] = useInput(''); 
    const [dviewer, _dviewer] = useState();
    const [dselected, _dselected] = useState([]);
    const [count, _count] = useState(0);
    const persiapanData=()=>{
        return dmember.map((v,i)=>{
            find = dmSelect.findIndex(v1=>v1.kdAnggota == (v.saya?  v.idAdded:  v.idAdd)); 
            if(find>=0){
                return {
                    ...v, i,
                    selected:true,
                    ada:true,
                }
            }
            return {
                ...v, i,
                selected:false,
                ada:false
            }
        })
    }

    if(dviewer == undefined){
        if(dmember.length == 0){
            return "Anda belum memiliki teman";
        }
        _dselected([]);
        _dviewer(persiapanData());
        return "";
    }
    function selectDataTerpilih({ selectedCount, selectedRows }) { 
        _dselected(selectedRows);  
    }
    const rowSelectCritera=(v)=>{
        _count((count+1));  
        return v.selected;
    } 
    const col = [ 
        {
          name: 'No',
          selector: (row,i) =>(i+1),
          width : '90px'
        },{
            name: 'Nama',
            selector: row =>row.name,
            // width : '450px',
        } ,{
            name: 'Email',
            selector: row =>row.email,
            // width : '450px',
        } 
    ];  
    return (
        <div class="FM1"> 
            <div class="body blight" style={{width:"unset"}}><br/>  
                {(
                    dselected.length>0 &&
                    <div className="flexR jcSE">
                        <label className="tbold fzXl">{dselected.length} Anggota Terpilih</label>
                        <button className="btn bwarning" onClick={()=>resVal(dselected)}>Perbarui Data</button>
                    </div>
                )}
                <hr/>
                <div>
                    <Tabel1
                        search={search}
                        oncSearch={setSearch}
                        columns={col} 
                        rowSelectCritera={(count<dmember.length ? rowSelectCritera: false)} 
                        checkboxSelection={selectDataTerpilih}
                        data={dviewer.filter((item) => {
                                if (search === "") {
                                    return item;
                                } else if (
                                    item.judul.toLowerCase().includes(search.toLowerCase()) || item.ringkasan.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return item;
                                }
                            })}
                        // dbtn={[
                        //     {label:"Terima",value:"bsuccess"},
                        //     // {label:"Form Upload",value:"bprimary"},
                        //     // {label:"Form Entri",value:"binfo"},
                        //     // {label:"Perbarui",value:"bwarning"},
                        //     {label:"Batalkan",value:"bdanger"}
                        // ]}
                    ></Tabel1> 
                </div>
            </div>
        </div>  
    )
}