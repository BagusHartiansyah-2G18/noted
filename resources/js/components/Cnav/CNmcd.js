import React from "react";
function CNmcd({ dt }){ 
    return (
        <nav className="">
            <ul class="mcd-menu bdark">
                {
                    dt.map((v,i)=>{
                        const {name,ket,url, aktif, click }=v;
                        return (
                            <li key={i}>
                                <a  {...(click!= undefined? {onClick:click}: {href:url} )}   className={`btn cwhite ${(aktif? 'active':'')}`}>
                                    <i class="fa fa-edit"></i>
                                    <strong>{name}</strong>
                                    {(
                                         ket.toString().split("\n").length == 1 && <small>{ket}</small>
                                    )}
                                    
                                </a>
                            </li>
                        )
                    })
                } 
            </ul>
        </nav> 
    );
}
export default CNmcd;
{/* <nav className="">
    <ul class="mcd-menu bdark">
        {
            dnote.induk.map((v,i)=>{

            })
        }
        <li >
            <a href="" className="cwhite">
                <i class="fa fa-home"></i>
                <strong>Home</strong>
                <small>sweet home</small>
            </a>
        </li>
        
        <li>
            <a href="" className="cwhite">
                <i class="fa fa-gift"></i>
                <strong>Features</strong>
                <small>sweet home</small>
            </a>
        </li>
        <li>
            <a href="" className="cwhite">
                <i class="fa fa-globe"></i>
                <strong>News</strong>
                <small>sweet home</small>
            </a>
        </li>
        <li>
            <a href="" className="cwhite">
                <i class="fa fa-comments-o"></i>
                <strong>Blog</strong>
                <small>what they say</small>
            </a>
            <ul>
                <li><a href="#"><i class="fa fa-globe"></i>Mission</a></li>
                <li>
                    <a href="#"><i class="fa fa-group"></i>Our Team</a>
                    <ul>
                        <li><a href="#"><i class="fa fa-female"></i>Leyla Sparks</a></li>
                        <li>
                            <a href="#"><i class="fa fa-male"></i>Gleb Ismailov</a>
                            <ul>
                                <li><a href="#"><i class="fa fa-leaf"></i>About</a></li>
                                <li><a href="#"><i class="fa fa-tasks"></i>Skills</a></li>
                            </ul>
                        </li>
                        <li><a href="#"><i class="fa fa-female"></i>Viktoria Gibbers</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa fa-trophy"></i>Rewards</a></li>
                <li><a href="#"><i class="fa fa-certificate"></i>Certificates</a></li>
            </ul>
        </li>
        <li>
            <a href="" className="cwhite">
                <i class="fa fa-picture-o"></i>
                <strong>Portfolio</strong>
                <small>sweet home</small>
            </a>
        </li>
        <li>
            <a href="" className="cwhite">
                <i class="fa fa-envelope-o"></i>
                <strong>Contacts</strong>
                <small>drop a line</small>
            </a>
        </li>
            
    </ul>
</nav>  */}