import sfLib from '../components/mfc/sfLib';
import FEinput from "../components/formEntri/input";
import FEselect from '../components/formEntri/select';
import FEtextarea from '../components/formEntri/textarea';

const dfEntri = [
    {
        "name":"Input",
        "alt":"Formulir HTML digunakan untuk mengumpulkan masukan pengguna", 
        "ops":[{
                "name":"text",
                "alt":"bidang input teks satu baris",
                "attr":[0,1]
            },{
                "name":"email",
                "alt":"harus berisi alamat email",
                "attr":[0,1]
            },{
                "name":"password",
                "alt":"bidang kata sandi",
                "attr":[0,1]
            },{
                "name":"number",
                "alt":"input numerik",
                "attr":[0,1,10,11,14]
            },{
                "name":"file",
                "alt":"pemilihan file dan tombol Jelajahi untuk mengunggah file",
                "attr":[0,1] 
            },{
                "name":"checkbox",
                "alt":"Kotak centang memungkinkan pengguna memilih opsi NOL atau LEBIH BANYAK dari sejumlah pilihan terbatas",
                "attr":[0,1],
                "option":[1,2], 
            },{
                "name":"radio",
                "alt":"memilih HANYA SATU dari sejumlah pilihan",
                "attr":[0,1],
                "option":[1,2], 
            },{
                "name":"range",
                "alt":"memasukkan angka yang bernilai pasti",
                "attr":[0,1,10,11,14]
            },{
                "name":"tel",
                "alt":"harus berisi nomor telepon",
                "attr":[0,1],
                "pattern":"[0-9]{3}-[0-9]{2}-[0-9]{3}"
            },{
                "name":"url",
                "alt":"harus berisi alamat URL",
                "attr":[0,1]
            },{
                "name":"datetime-local",
                "alt":"menentukan kolom input tanggal dan waktu, tanpa zona waktu",
                "attr":[0,1]
            },{
                "name":"date",
                "alt":"input yang harus berisi tanggal",
                "attr":[0,1],
                "max":"1979-12-31",
                "min":"2000-01-02"
            }, {
                "name":"month",
                "attr":[0,1]
            },{
                "name":"week",
                "alt":"untuk memilih minggu dan tahunnya",
                "attr":[0,1]
            },{
                "name":"time",
                "alt":"untuk memilih waktu",
                "attr":[0,1]
            },{
                "name":"color",
                "alt":"input yang harus berisi warna",
                "attr":[0,1] 
            }
        ], "attrAll":[
            {"id":"text"},
            {"name":"text"},
            {"value":"text"},
            {"readonly":"checkbox"},
            {"disabled":"checkbox"}, //4

            {"size":"text"},
            {"maxlength":"number"},
            {"pattern":"text"},
            {"placeholder":"text"},
            {"required":"checkbox"}, //9

            {"max":"text"},
            {"min":"text"},
            {"autocomplete":"select", "option":["on","off"]},
            {"autofocus":"checkbox"},
            {"step":"text"}, //14

            {"multiple":"checkbox"},
            {"pattern":"text"},
            {"src":"text"},
            {"alt":"text"},
            {"width":"text"},

            {"height":"text"}
        ] 
    },{
        "name":"textarea",
        "alt":"mendefinisikan bidang input multi-baris",
        "ops":[{
            "name":"textarea",
            "attr":[0,1]
        }],
        "attrAll":[
            {"rows":"number"},
            {"cols":"number"},
            {"value":"text"},
        ]
    },{
        "name":"select",
        "alt":"Mendefinisikan daftar drop-down",
        "ops":[{
            "name":"select",
            "attr":[0,1],
            "option":[1,2], 
        }],
        "attrAll":[
            {"id":"text"},
            {"name":"text"},
            {"value":"text"}, 
        ]
    } 
];

function __cbForm() {
    return sfLib.coptionSelect({
        dt:dfEntri,
        row:{label:'name',value:'name'},
        // xind:true
    })
}
function __selectform({ data }) {
    const ind = dfEntri.findIndex((val)=>val.name == data.label); 
    return { ind, dfObj : dfEntri[ind]}; 
}
function __opsForm({ data }) {
    const form = __selectform({data});
    return form.ops[0]; 
}
function __infoListTerpilih(data){  
    return data.map((v,i)=>{  
        return {
            ...v,
            nameJudul:dfEntri[v.indF].name,
            ...dfEntri[v.indF].ops[v.indO]
        }
    })
}
function __listItemForAttrOps({ indF,indO, actAttr, actOption, dt}){
    const fentri= dfEntri[indF].ops[indO]; 
    let ind =0, resp={dfAttr:[],dfOption:[]};  
    fentri.attr.forEach((v,i)=>{ 
        resp.dfAttr.push(__formSelected({indF,indAttrAll:v, ind:i, func:actAttr, value:dt.valueAttr[i]}))
    });   
    if(fentri.option!=undefined){
        fentri.option.forEach((v,i)=>{
            resp.dfOption.push(__formSelected({indF,indAttrAll:v, ind:i, func:actOption}));
        });  
    }  
    return resp; 
}
function __listItemForView({ act,  dt, dvalue}){
    return dt.map((v,i)=>{
        return <>
            {
                __formView({
                    v:{...v, value:(dvalue!= undefined && dvalue.length>0 && dvalue[i] != undefined? dvalue[i]:'')}, 
                    ind:i, 
                    act
                })
            }
            <hr/>
        </>;
    });  
}
function __formView({  ind, v, act}){    
    switch (v.nameJudul) {
        case "Input":
            return <FEinput
                dt={{...v,star:true, indQ:ind}}
                plac={(ind+1)+". "+v.pertanyaan}
                resVal={(dt)=>act(dt)}
                valuex={(v.value == undefined ?'':v.value.label)}
                clsSpan='mdi mdi-lead-pencil'
                key={ind}
                placd=''
                types={v.name}
            ></FEinput> 
        case "select":
            return <FEselect 
                option={sfLib.coptionSelect({ 
                    dt:v.valueOption,
                    xind:true,
                    row:{label:0,value:1}
                })} 
                plac={(ind+1)+". "+v.pertanyaan}
                clsDiv='iconInput ptb10px jcSB' 
                getVal={(v.value!= undefined? v.value:{label:v.valueOption[0][0].label, value:v.valueOption[0][1]})}
                resVal={act} 
                dt={{...v,star:true, indQ:ind}}
            ></FEselect>
        case "textarea":
            return <FEtextarea 
                dt={{...v,star:true, indQ:ind}}
                plac={(ind+1)+". "+v.pertanyaan}
                resVal={(dt)=>act(dt)}
                valuex={(v.value == undefined ?'':v.value.label)} 
                key={ind}  
            ></FEtextarea> 
            
        default:
        break;
    }
}
function __formSelected({ indF, indAttrAll, ind, func, value='' }){
    const attrAll = dfEntri[indF].attrAll[indAttrAll];
    const key = Object.keys(attrAll);
    return {
        plac:(ind+1)+". "+key[0],
        type:attrAll[key[0]],
        func:(dt)=>func(dt),
        clsSpan:'mdi mdi-lead-pencil',
        valuex:value,
        ind,
        star:true
    }
}
function __tahapan(key) {
    switch (key) {
        case 2: return "mengatur Atribut Form";
        case 3: return "";
        case 4: return "";
        case 5: return "";
        case 6: return "";
        default: return "memilih Jenis Form";
    }
}
export {
    dfEntri,
    __selectform,
    __cbForm,
    __opsForm,
    __infoListTerpilih,
    __listItemForAttrOps,
    __listItemForView,
    __tahapan
}

const dfEntriReal = [
    {
        "name":"Form",
        "alt":"Formulir HTML digunakan untuk mengumpulkan masukan pengguna",
        "ops":[
            {
                "name":"button",
                "attr":[0,1,2]
            },{
                "name":"checkbox",
                "alt":"Kotak centang memungkinkan pengguna memilih opsi NOL atau LEBIH BANYAK dari sejumlah pilihan terbatas",
                "attr":[0,1]
            },{
                "name":"datetime-local",
                "alt":"menentukan kolom input tanggal dan waktu, tanpa zona waktu",
                "attr":[0,1]
            },{
                "name":"email",
                "alt":"harus berisi alamat email",
                "attr":[0,1]
            },{
                "name":"file",
                "alt":"pemilihan file dan tombol Jelajahi untuk mengunggah file",
                "attr":[0,1]
            },{
                "name":"color",
                "alt":"input yang harus berisi warna",
                "attr":[0,1]
            },{
                "name":"hidden",
                "alt":"mendefinisikan bidang input tersembunyi",
                "attr":[0,1]
            },{
                "name":"date",
                "alt":"input yang harus berisi tanggal",
                "attr":[0,1],
                "max":"1979-12-31",
                "min":"2000-01-02"
            },{
                "name":"image",
                "attr":{
    
                }
            },{
                "name":"month",
                "attr":[0,1]
            },{
                "name":"number",
                "alt":"input numerik",
                "attr":[0,1,10,11,14]
            },{
                "name":"password",
                "alt":"bidang kata sandi",
                "attr":[0,1]
            },{
                "name":"radio",
                "alt":"memilih HANYA SATU dari sejumlah pilihan",
                "attr":[0,1]
            },{
                "name":"range",
                "alt":"memasukkan angka yang bernilai pasti",
                "attr":[0,1,10,11,14]
            },{
                "name":"reset",
                "alt":"dapat mengatur ulang semua nilai formulir ke nilai defaultnya",
                "attr":[0,1]
            },{
                "name":"search",
                "alt":"untuk bidang pencarian",
                "attr":[0,1]
            },{
                "name":"submit",
                "alt":"tombol untuk mengirimkan data formulir ke penangan formulir",
                "attr":[2]
            },{
                "name":"tel",
                "alt":"harus berisi nomor telepon",
                "attr":[0,1],
                "pattern":"[0-9]{3}-[0-9]{2}-[0-9]{3}"
            },{
                "name":"text",
                "alt":"bidang input teks satu baris",
                "attr":[0,1]
            },{
                "name":"time",
                "alt":"untuk memilih waktu",
                "attr":[0,1]
            },{
                "name":"url",
                "alt":"harus berisi alamat URL",
                "attr":[0,1]
            },{
                "name":"week",
                "alt":"untuk memilih minggu dan tahunnya",
                "attr":[0,1]
            }
        ], "attrAll":[
            {"id":"text"},
            {"name":"text"},
            {"value":"text"},
            {"readonly":"checkbox"},
            {"disabled":"checkbox"}, //4

            {"size":"text"},
            {"maxlength":"number"},
            {"pattern":"text"},
            {"placeholder":"text"},
            {"required":"checkbox"}, //9

            {"max":"text"},
            {"min":"text"},
            {"autocomplete":"select", "option":["on","off"]},
            {"autofocus":"checkbox"},
            {"step":"text"}, //14

            {"multiple":"checkbox"},
            {"pattern":"text"},
            {"src":"text"},
            {"alt":"text"},
            {"width":"text"},

            {"height":"text"}
        ]
    },{
        "name":"button",
        "ops":[{
            "name":"button",
            "attr":{

            }
        }],
        "attrAll":{}
    },{
        "name":"label",
        "alt":"mendefinisikan label / keterangan untuk beberapa elemen formulir",
        "ops":[{
            "name":"Headings",
            "attr":{

            }
        },{
            "name":"link",
            "attr":{

            }
        },{
            "name":"Paragraphs",
            "attr":{

            }
        },{
            "name":"Label",
            "attr":{

            }
        },{
            "name":"Span",
            "attr":{

            }
        },{
            "name":"Headings",
            "attr":{

            }
        },{
            "name":"Headings",
            "attr":{

            }
        }],
        "attrAll":{}
    },{
        "name":"textarea",
        "alt":"mendefinisikan bidang input multi-baris",
        "ops":[{
            "name":"textarea",
            "attr":{

            }
        }],
        "attrAll":{}
    },{
        "name":"optgroup",
        "alt":"Mendefinisikan sekelompok opsi terkait dalam daftar drop-down",
        "ops":[{
            "name":"optgroup",
            "attr":{

            }
        }],
        "attrAll":{}
    },{
        "name":"select ",
        "alt":"Mendefinisikan daftar drop-down",
        "ops":[{
            "name":"select",
            "attr":{

            }
        }],
        "attrAll":{}
    },{
        "name":"datalist",
        "alt":"Menentukan daftar opsi yang telah ditentukan sebelumnya untuk kontrol input",
        "ops":[{
            "name":"datalist",
            "attr":{

            }
        }],
        "attrAll":{}
    }
];