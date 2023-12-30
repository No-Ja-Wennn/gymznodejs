const dropDown = document.querySelector(".header__inner__navigation__sevice")
const menuroiE = document.querySelector(".menuroi");

const noidungE = document.querySelector(".noidung");

dropDown.addEventListener("click", ()=>{
    if (noidungE.style.display == "block"){
        noidungE.style.display = "none";
        console.log("block");
    }else{
        noidungE.style.display = "block";
        console.log("none");

    }
})

