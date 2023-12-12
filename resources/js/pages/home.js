import React from "react";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {Link} from "react-router-dom";

// layout
import HeaderM from '../layout/header';

// componen
import BiconText from '../components/box/bIconText';
import Gslider from "../components/galery/Gslider";
import ModalM from "../components/Modal/modal";

// support Function
import { htmlS } from "../states/sf/html/action";
import sfmodal  from "../components/Modal/sfModal";

const dpoint=[
    {
        ic:"mdi-book-heart", cb:"binfoG",
        borderBottom:"borderBInfo-5 blight04",
        judul:"Catatan",
        text:`
            yakni mengidentifikasi judul, nama, ide dll dari sebuah kegiatan / pekerjaan yang hendak dilakukan.
            data yang diperlukan adalah Judul kegiatan, deskripsi, file dan dokumentasi kegiatan.
        `
    },{
        ic:"mdi-file-cog", cb:"bmutedG",
        borderBottom:"borderBMuted-5 blight04",
        judul:"File & Dokumentasi",
        text:`yakni file berupa sebuah dokumen PDF yang menampung informasi lengkap dari sebuah judul kegiatan.
        adapun Dokumentasi berupa sebuah gambar (PNG & JPG) sebagai bukti dukung pelaksanaan kegiatan dan tujuan lainnya`
    },{
        ic:"mdi-chart-bar-stacked", cb:"bsuccessG",
        borderBottom:"borderBSuccess-5 blight04",
        judul:"Values",
        text:`yakni nilai yang menjadi sumber data yang akan dikelolah dan menghasilkan informasi yang dapat dimanfaatkan untuk menentukan sebuah keputusan / tindakan yang akan dilaksanakan.`
    },{
        ic:"mdi-chart-timeline", cb:"bwarningG",
        borderBottom:"borderBWarning-5 blight04",
        judul:"Sub Judul",
        text:`yakni sebuah turunan dari Induk Judul yang menjelaskan alur / tahapan / gambaran yang lebih lengkap untuk meningkatkan akurasi data pada Induk Judul.`
    }
];

const ddashboard = [
    {
        img:"/svg/analisisData.webp",
        judul:"Analisis",
        text:"tahapan mendalami suatu permasalahan, yang menjadi sumber informasi untuk menentukan sebuah keputusan. dimulai dari :",
        list:["Data Enginer","Analisis Data","Visualisasi Data","Implementasi Metode"]
    },{
        img:"/svg/design.jpg",
        judul:"USER INTERFACE (UI)",
        text:"tahapan  membangun antarmuka perangkat lunak yang berfokus pada tampilan yang dapat menggambarkan setiap tahapan yang akan dikembangkan. dapat menggunakan tools :",
        list:["Figma","Canva","dll"]
    },{
        img:"/svg/develop.png",
        judul:"Develop",
        text:"tahapan pengembangan sebuah sistem berdasarkan hasil Analisis dan Design UI. dapat menggunakan Flatform :",
        list:["Dekstop","Website","Mobile"]
    },{
        img:"/svg/tester.jpg",
        judul:"Tester",
        text:"tahapan pengujian kinerja sistem, berfokus pada alur pengembangan yang telah dibuat pada hasil Analisis dan Design UI. dapat menggunakan berbagai library menyesuaikan Flatform",
        list:[]
    },{
        img:"/svg/deploy.png",
        judul:"Deploy",
        text:"tahapan distribusi sebuah sistem , berfokus pada kesiapan penggunaan sistem.",
        list:[]
    }
];
function Home(){
    const dispatch = useDispatch();
    const [modalC , modalCS] = useState('');



    const sigin = () =>{
        window.location.replace('/login');
    }
    // modalCS(
    //     sfmodal.form({
    //         label : "Konfirmasi",
    //         mclose:()=>{actModal(false)},
    //         children : (
    //             <p>Apa benar ingin Mengapus data ini ?</p>
    //         ),
    //         footer : (
    //             sfmodal.btn({
    //                 mclose:()=>{actModal(false)},
    //                 xdeled:()=>{}
    //             })
    //         )
    //     })
    // );
    // actModal(true);
    // const actModal= (modal) =>{
    //     dispatch(
    //         htmlS({
    //             modal
    //         })
    //     )
    // }
    const sigup = () =>{
        window.location.replace('/register');
    }

    return(
        <>
            <div className='minHeader'>
                <HeaderM></HeaderM> {/* 3. header*/}
                <div>
                    <h1>Make a list of your notes.</h1>
                    <h2><u><b className='fpacifico'>Derivative Notes</b> <i className='fBebasNeue'>"DN / CT"</i></u></h2>
                    <button className='btnRadius50 bprimary' onClick={sigin}>Sig In</button>
                    <button className='btnRadius50 bwarning' onClick={sigup}>Sig Up</button>
                </div>
            </div>
            <div className="containerHome">
                <h2 className="fBebasNeue tcenter pwrap__3p">
                    <u>4 Points for building a data set</u>
                    <p className="tjustify fzL mauto tcenter farial mxw500">memulai membangun sebuah data set, akan meningkatkan kualitas kegiatan yang akan lakukan dengan memanfaatkan teknologi Informasi</p>
                </h2>
                <div className="grid-4c">
                    {
                        dpoint.map((v,i)=>{
                            return (
                                <BiconText
                                    {...v}
                                    key={i}
                                />)
                        })
                    }
                </div>

                <h2 className="fBebasNeue tcenter pwrap__3p">
                    <u>5 stages of creating your information Dashboard</u>
                    <p className="tjustify fzL mauto tcenter farial mxw600">
                        mulai menampilkan informasi yang dapat membantu dalam pengambilan keputusan atau tindakan, dengan memanfaatkan data set
                    </p>
                </h2>
                <Gslider data={ddashboard}/>
            </div>
            <h2 className="fBebasNeue tcenter pwrap__3p">
                <u>Contact Information</u>
                <p className="tjustify fzL mauto tcenter farial mxw600">
                    konsultasi perencanaan untuk sebuah gerakan
                </p>
            </h2>
            <div className="wrapContact">
                <div className="mxw400">
                    <div className="flexR">
                        <img src="/svg/dev-mini.png" height="80px"/>
                        <h2 className="aiC fpacifico">M Software Center</h2>
                    </div>
                    <p>berdiri sejak tahun 2021, dengan menggeluti bidang pengembangan sistem untuk berbagai kebutuhan.</p>
                </div>
                <table>
                    <tr>
                        <td><span className="mdi mdi-google-maps fzL1 cinfo"></span></td>
                        <td><p className="pm0 tbold">Sumbawa Barat</p><label>Desa Meraran, kec. Seteluk</label></td>
                    </tr>
                    <tr>
                        <td><span className="mdi mdi-cellphone fzL1 cinfo"></span></td>
                        <td>+6282 - 4495 - 2937</td>
                    </tr>
                    <tr>
                        <td><span className="mdi mdi-email fzL1 cinfo"></span></td>
                        <td>bagushartiansyah07@gmail.com</td>
                    </tr>
                </table>
            </div>
            <ModalM
                children ={modalC}
            ></ModalM>
        </>
        // <div className="aboutSistem">
        //     <img src="./svg/sistem-data.jpg" className="radius-10 boxSLeft" />
        //     <div className="pwrap_3p">
        //         <b>as</b>
        //     </div>
        // </div>
    )
}
export default Home;
