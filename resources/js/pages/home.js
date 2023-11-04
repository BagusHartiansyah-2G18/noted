import React from "react";

// componen
import BiconText from '../components/box/bIconText';

function Home(){
    return(
        <div className="containerHome">
            <h2 className="fBebasNeue tcenter pwrap__3p">
                4 Points for building a data set
                <p className="tjustify fzL mauto tcenter farial mxw500">memulai membangun sebuah data set, akan meningkatkan kualitas kegiatan yang akan lakukan dengan memanfaatkan teknologi Informasi</p>
            </h2>
            <div className="grid-3c">
                <BiconText
                    ic="mdi-book-heart"
                    cb="binfo"
                    borderBottom='borderBInfo-5'
                    judul="Catatan"
                    text="
                        yakni mengidentifikasi judul, nama, ide dll dari sebuah kegiatan / pekerjaan yang hendak dilakukan.
                        data yang diperlukan adalah Judul kegiatan, deskripsi, file dan dokumentasi kegiatan.
                    "
                />
                <BiconText
                    ic="mdi-file-cog"
                    cb="bmuted"
                    borderBottom='borderBMuted-5'
                    judul="File & Dokumentasi"
                    text="
                        yakni file berupa sebuah dokumen PDF yang menampung informasi lengkap dari sebuah judul kegiatan.
                        adapun Dokumentasi berupa sebuah gambar (PNG & JPG) sebagai bukti dukung pelaksanaan kegiatan dan tujuan lainnya
                    "
                />
                <BiconText
                    ic="mdi-chart-bar-stacked"
                    cb="bsuccess"
                    borderBottom='borderBSuccess-5'
                    judul="Values"
                    text="
                        yakni nilai yang menjadi sumber data yang akan dikelolah dan menghasilkan informasi yang dapat dimanfaatkan untuk menentukan sebuah keputusan / tindakan yang akan dilaksanakan.
                    "
                />
                <BiconText
                    ic="mdi-chart-timeline"
                    cb="bwarning"
                    borderBottom='borderBWarning-5'
                    judul="Sub Judul"
                    text="
                        yakni sebuah turunan dari Induk Judul yang menjelaskan alur / tahapan / gambaran yang lebih lengkap untuk meningkatkan akurasi data pada Induk Judul.
                    "
                />
                <div></div>
                <div></div>
            </div>
        </div>
        // <div className="aboutSistem">
        //     <img src="./svg/sistem-data.jpg" className="radius-10 boxSLeft" />
        //     <div className="pwrap_3p">
        //         <b>as</b>
        //     </div>
        // </div>
    )
}
export default Home;
