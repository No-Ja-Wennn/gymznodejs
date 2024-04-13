
// event click
let a_tagbox = document.querySelectorAll(".tagbox");
a_tagbox = Array.from(a_tagbox);



a_tagbox.forEach((element, index)=>{
    element.addEventListener("click", function(){
        var allTag = element.closest(".tag-status").querySelectorAll(".tagbox");
        allTag = Array.from(allTag);
        allTag.forEach((element, index) => {

            element.classList.remove('tagBox1');
            element.classList.remove('tagBox2');
            element.classList.remove('tagBox3');
            element.querySelector(".tag").classList.remove('tag1');
            element.querySelector(".tag").classList.remove('tag2');
            element.querySelector(".tag").classList.remove('tag3');
            element.querySelector(".title").classList.remove('title1');
            element.querySelector(".title").classList.remove('title2');
            element.querySelector(".title").classList.remove('title3');
        });
        
        allTag[index].classList.add('tagBox3');
        allTag[index].querySelector(".tag").classList.add('tag3');
        allTag[index].querySelector(".title").classList.add('title3');
    
        
        allTag[index-1].classList.add('tagBox1');
        allTag[index-1].querySelector(".tag").classList.add('tag1');
        allTag[index-1].querySelector(".title").classList.add('title1');
    
        allTag[index+1].classList.add('tagBox2');
        allTag[index+1].querySelector(".tag").classList.add('tag2');
        allTag[index+1].querySelector(".title").classList.add('title2');
    })

    
})
