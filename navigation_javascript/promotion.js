const menuroiE = document.querySelector(".menuroi");

const noidungE = document.querySelector(".noidung");

menuroiE.addEventListener("click", ()=>{
    if (noidungE.style.display == "block"){
        noidungE.style.display = "none";
        console.log("block");
    }else{
        noidungE.style.display = "block";
        console.log("none");

    }
})

