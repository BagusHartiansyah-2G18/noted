import exceljs from "exceljs";
const ExportJsonExcel = require("js-export-excel"); 
const sfLib =(()=>{

    function coptionLabelLength(option) {
        return option.map(({label, value})=>{
            return {
                value,
                label:(String(label).length >50 ? String(label).substring(1,50)+"...":label)
            }
        })
    }
    function coptionSelect({dt,row,xind=false}){
        // sfLib.coptionSelect({ 
        //     dt:v.valueOption,
        //     row:{label:0,value:1}
        // })
        let xdt=[];
        dt.forEach((val,ind) => { 
           xdt.push({
                value:(xind?ind:val[row.value]),
                label:val[row.label]
           })
        });
        return xdt;
    }
    function objToCB({dt,label,value}){
        let xdt=[];
        label.forEach((val,ind) => {
            xdt.push({
                    value:dt[value[ind]],
                    label:dt[val]
            })
        });
        return xdt;
    } 
    function valueCB({dt, xind=false}){
        let xdt=[];
        dt.forEach((val,ind) => {
            xdt.push({
                    value:(xind?ind:val),
                    label:val
            })
        });
        return xdt;
    }
    function _$(val){
        const uang = new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 3
            }
        );
        var tam="";
        if(val==null || val=='null'){
            return '';
        }
        if(uang.format(val).substring(0,1)=="$"){
            tam=uang.format(val).substring(1);
        }else{
            tam=uang.format(val);
        }
        return tam.substring(0,tam.length-4);
    }
    function readFile(v,callback){
        var file = v.files[0];
        var fileReader = new FileReader();

        new Promise(function(res){
            fileReader.onload = function(event) {
                var typedarray = new Uint8Array(event.target.result);
                return res({
                    size    :file.size,
                    nama    :file.name,
                    type    :"application/pdf",
                    data    :btoa(Uint8ToString(typedarray))
                })
            };
            fileReader.readAsArrayBuffer(file);
        }).then(resp=>{
            callback(resp);
        });

        // console.log(fileReader);
    }
    function readJson(v,callback) { 
        var reader = new FileReader();
        // reader.onload = onReaderLoad;
        // reader.readAsText(v.files[0]);  
        new Promise(function(res){ 
            reader.onload = function(event) {
                return res(JSON.parse(event.target.result));
            };
            reader.readAsText(v.files[0]);
        }).then(resp=>{ 
            callback(resp);
        });
    } 
    function Uint8ToString(u8a){
        var CHUNK_SZ = 0x8000;
        var c = [];
        for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
          c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
        }
        return c.join("");
    }
    function exportExcell ({ sheet, header, data, colWidth,keyObj }){   
        // return console.log((String(sheet).length >30? sheet.substring(0,30) :sheet));
        var option = {}; 
        option.fileName =sheet ; 
        option.datas = [
        {
            
            // sheetData: [
            // { one: "bagus H", two: "ieia" },
            // { one: "saaa", two: "sasasa" },
            // ],
            // sheetName: "sheet",
            
            // sheetFilter: ["two", "one"],
            // sheetHeader: ["sasasa", "sa"],
            // columnWidths: [20, 20],
            sheetName: (String(sheet).length >30? String(sheet).substring(0,30) :String(sheet)),
            sheetData:data,
            sheetFilter: keyObj,
            sheetHeader: header, 
            columnWidths:colWidth,
        },
        // {
        //     sheetData: [
        //     { one: "sa", two: "sasa" },
        //     { one: "sasa", two: "sasa" },
        //     ],
        // },
        ]; 
        var toExcel = new ExportJsonExcel(option); 
        toExcel.saveExcel();  

    };
    function replaceMultipleChars(str, charsToReplace, replacement) {
        // replaceMultipleCharsReduce("hello world", "eo", "*");
        return str.split('').reduce((acc, char) => 
            acc + (charsToReplace.includes(char) ? replacement : char), ''
        );
    } 
    return {
        coptionSelect,
        objToCB,
        _$,
        readFile,
        readJson,
        valueCB,
        coptionLabelLength,
        exportExcell,
        replaceMultipleChars
    }
})();
export default sfLib;
