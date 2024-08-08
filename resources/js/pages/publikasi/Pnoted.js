import React,  { useEffect,useRef,useState    }  from "react";
import { useDispatch,useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { userMenuS } from "../../states/sf/html/action"  

import CNmcd from "../../components/Cnav/CNmcd";
import Plist from "../../components/pages/publikasi/Plist";
import { noteSub,baseUrl } from "../../states/noted/action";
 
function Pnoted({  }) {
    const { dnote,  pubN } = useSelector((state) => state); 
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

    useEffect(() => { 
        dispatch(noteSub({
            tingkat,
            kdJudul,
            kdMember
        })) 
        dispatch(userMenuS({v:3,sub:2, isi:''})); 

         
    }, [dispatch]);
    if(Object.keys(dnote).length==0 || dnote.length>0){
        return '';
    } 
    const { induk, sub, file, form } = dnote;  
    const pindahNote=(find)=>{ 
        dispatch(noteSub({
            tingkat:induk[find].tingkat,
            kdJudul:induk[find].kdJudul,
            kdMember:induk[find].kdMember
        })) 
    }
    const pindahNoteSub=(find)=>{ 
        dispatch(noteSub({
            tingkat:sub[find].tingkat,
            kdJudul:sub[find].kdJudul,
            kdMember:sub[find].kdMember
        })) 
    }
     
    return (
        <div className="Mcontainer bgForm aiS jcC"> 
        {/* flexR pwrap_5p bwhite */}
            <div className="bodyFlexRow800  flexR pwrap_5p" style={{width:"100%"}}>
                <CNmcd
                    dt={[
                        ...induk.map((v,i)=>{
                            return {
                                name:v.judul,
                                ket:v.ringkasan,
                                url:'',
                                click:()=>pindahNote(i),
                                aktif:(i==induk.length-1)
                            }
                        }),
                        ...sub.map((v,i)=>{
                            return {
                                name:v.judul,
                                ket:v.ringkasan,
                                url:'',
                                click:()=>pindahNoteSub(i),
                                aktif:0
                            }
                        })
                    ]}
                ></CNmcd>
                {/* + mh700 */}
                <Plist
                    dt={[
                        {
                            ...induk[induk.length-1],
                            file, form
                        },
                        ...sub,
                    ]}
                    url={baseUrl}
                    start={{start:1}}
                ></Plist> 
            </div>  
        </div> 
    )
}
export default Pnoted;