var data_votes = '[{"name" : "Kanye West", "positive" : "20", "negative":"210"},{"name" : "Mark Zuckerberg", "positive" : "95", "negative":"332"},{"name" : "Cristina Fernández de Kirchner", "positive" : "335", "negative":"402"},{"name" : "Malala Yousafzai", "positive" : "426", "negative":"15"}]';


document.addEventListener("DOMContentLoaded",function(){
   
    initializeVotes(data_votes);
   
    let header_obj = document.querySelector("header");
   
    window.onscroll = function() {
        FixHeader(header_obj);
    };
    
    
    var voting_button = document.querySelectorAll(".exe-vote");
    
    voting_button.forEach((e)=>{
        e.addEventListener("click", function(){
            ActivateVote(e);
       });
    });
    
    
    var new_vote = document.querySelectorAll(".new-vote");

    new_vote.forEach((g) =>{
        g.addEventListener("click", function (){
            Vote(g);
        });
    });
    
    
    var vote_again = document.querySelectorAll(".vote-again");
    
    vote_again.forEach((k) =>{
        k.addEventListener("click", function(){
            ResetVote(k);
        });
    });
    
    
    
    
});


var initializeVotes =(data)=>{
    
    var mydata = JSON.parse(data);
    
    let cont_text = document.querySelectorAll(".mid-section .cont-info");
    
    let i=0;
    
    cont_text.forEach((e)=>{
        
        let cont_icon = e.querySelector(".ctn-gradient .info-vote");
        let cont_i = e.querySelector(".ctn-gradient .info-vote i");
        
        let cont_percents = e.querySelector(".cont-percets");
        
        
        let positive_votes = localStorage.getItem(`positive_${i}`);
        
        if(positive_votes === null){
            positive_votes = mydata[i].positive;
        }
        
        positive_votes = parseInt(positive_votes);
        
        let negative_votes = localStorage.getItem(`negative_${i}`);
        
        if(negative_votes === null){
            negative_votes = parseInt(mydata[i].negative);
        }
        
        negative_votes = parseInt(negative_votes);
        
        if(positive_votes > negative_votes){
        
            if(cont_icon.classList.contains("substract")){
                cont_icon.classList.remove("substract");
            }

            cont_icon.classList.add("add");

            if(cont_i.classList.contains("icon-thumbs-down")){
                cont_i.classList.remove("icon-thumbs-down");
            }

            cont_i.classList.add("icon-thumbs-up");

        }
        else{

            if(cont_icon.classList.contains("add")){
                cont_icon.classList.remove("add");
            }

            cont_icon.classList.add("substract");

            if(cont_i.classList.contains("icon-thumbs-up")){
                cont_i.classList.remove("icon-thumbs-up");
            }

            cont_i.classList.add("icon-thumbs-down");

        }
        
        
        let total = positive_votes + negative_votes;
        
        let percent_positives = (positive_votes*100)/total;
        
        let percent_negatives = (negative_votes*100)/total;
        
        percent_positives = percent_positives.toFixed(2);
        
        percent_negatives = percent_negatives.toFixed(2);
        
        cont_percents.querySelector(".positive").style.width = `${percent_positives}%`;
        
        cont_percents.querySelector(".positive").dataset.votes = positive_votes;
        
        cont_percents.querySelector(".negative").style.width = `${percent_negatives}%`;
        
        cont_percents.querySelector(".negative").dataset.votes = negative_votes;
        
        cont_percents.querySelector(".positive span").textContent = `${percent_positives}%`;
        
        cont_percents.querySelector(".negative span").textContent = `${percent_negatives}%`;
        
        i++;
        
    });
    
    
} 


var FixHeader =(obj)=>{
    
    if(window.scrollY >0){
        obj.classList.add("nav-fixed");
    }
    else{
        obj.classList.remove("nav-fixed");
    }
    
};

var ActivateVote =(obj)=>{
    
    let action_button = obj.dataset.voteaction;

    let cont_buttons = obj.closest(".voting-buttons");

    let button_action = cont_buttons.querySelector(".new-vote");

    button_action.dataset.action = action_button;

    let buttons = cont_buttons.querySelectorAll(".exe-vote");

    buttons.forEach((k)=>{
        k.classList.remove("active"); 
    });

    obj.classList.add("active");
    
}; 

var Vote =(obj)=>{
  
    let action_vote = obj.dataset.action;
       
    let index_item = obj.dataset.index;
    
    if(action_vote==="" || action_vote === null){

        alert(`Select if you approve this person or not`);
        return false;
    }

    let cont_bars = obj.closest(".voting-buttons").closest(".cont-text-title").closest(".ctn-gradient").closest(".cont-info").querySelector(".cont-percets"); 

    let cont_final = obj.closest(".voting-buttons").closest(".cont-text-title").closest(".ctn-gradient").querySelector(".info-vote");

    let icon_final = cont_final.querySelector("i");

    let positive_bar = cont_bars.querySelector(".positive");
    let negative_bar = cont_bars.querySelector(".negative");


    let positive_votes = positive_bar.dataset.votes;

    let negative_votes = negative_bar.dataset.votes;

    positive_votes =  parseInt(positive_votes); 

    negative_votes =  parseInt(negative_votes); 

    if(action_vote == "add"){
        positive_votes++;
    }
    else if(action_vote == "substract"){
        negative_votes++;
    }

    if(positive_votes > negative_votes){
        
        if(cont_final.classList.contains("substract")){
            cont_final.classList.remove("substract");
        }
        
        cont_final.classList.add("add");
        
        if(icon_final.classList.contains("icon-thumbs-down")){
            icon_final.classList.remove("icon-thumbs-down");
        }
        
        icon_final.classList.add("icon-thumbs-up");
        
    }
    else{
        
        if(cont_final.classList.contains("add")){
            cont_final.classList.remove("add");
        }
        
        cont_final.classList.add("substract");
        
         if(icon_final.classList.contains("icon-thumbs-up")){
            icon_final.classList.remove("icon-thumbs-up");
        }
        
        icon_final.classList.add("icon-thumbs-down");
        
    }
    
    localStorage.setItem(`positive_${index_item}`,positive_votes);
    localStorage.setItem(`negative_${index_item}`,negative_votes);
    
    

    let total = positive_votes + negative_votes;

    let percent_positive = (positive_votes*100)/total;

    let percent_negative = (negative_votes*100)/total;


    percent_positive = percent_positive.toFixed(2);

    percent_negative = percent_negative.toFixed(2);

    positive_bar.dataset.votes = positive_votes;

    negative_bar.dataset.votes = negative_votes;

    positive_bar.style.width = `${percent_positive}%`;
    negative_bar.style.width = `${percent_negative}%`;


    positive_bar.querySelector("span").textContent = `${percent_positive}%`;
    negative_bar.querySelector("span").textContent = `${percent_negative}%`;


    obj.closest(".cont-now").style.display = "none";
    obj.closest(".cont-now").closest(".cont-text-title").querySelector(".cont-again").style.display = "block";
    
};

var ResetVote=(obj)=>{
  
    let cont_again = obj.closest(".cont-again");
            
    let cont_now = cont_again.closest(".cont-text-title").querySelector(".cont-now");

    let buttons_vote = cont_now.querySelectorAll(".exe-vote");

    let button_action = cont_now.querySelector(".new-vote");;

    buttons_vote.forEach((i)=>{
        i.classList.remove("active");
    });

    button_action.dataset.action = "";

    cont_again.style.display = "none";
    cont_now.style.display = "flex";
    
}; 

