let TC = document.querySelector(".ticket-container");
let allFilter = document.querySelectorAll(".filter");
let deletebtn = document.querySelector(".delete")
let modalVisible = false;
let selectedPriority = "pink";
for(let i = 0; i<allFilter.length; i++){
    allFilter[i].addEventListener("click", filterHandler);
}

function filterHandler(e){
    let filter = e.currentTarget.children[0].classList[0];
    TC.style.backgroundColor = filter.split("-")[0];
}

let addbtn = document.querySelector(".add");

addbtn.addEventListener("click", showModal);

function showModal(e){
    if(modalVisible == false){
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
                        <div class="task-to-be-added" data-type="false" contenteditable="true">
                            <span class="placeholder">Enter your text</span>
                        </div>
                        <div class="priority-list">
                            <div class="pink-modal-filter modal-filter active"></div>
                            <div class="black-modal-filter modal-filter"></div>
                            <div class="green-modal-filter modal-filter"></div>
                            <div class="blue-modal-filter modal-filter"></div>
                        </div>
                    `;
        selectedPriority = "pink";
        TC.appendChild(modal);
        let taskTyper = document.querySelector(".task-to-be-added");

        taskTyper.addEventListener("click", function(e){
             if(e.currentTarget.getAttribute("data-type") == "false")
                e.currentTarget.innerHTML = "";
                e.currentTarget.setAttribute("data-type", "true");    
        })

        taskTyper.addEventListener("keypress", addTicket.bind(this, taskTyper));
        modalVisible = true;
        let modalFilters = document.querySelectorAll(".modal-filter");
        for(let i = 0; i<modalFilters.length; i++){
            modalFilters[i].addEventListener("click", prioritySelector);
        }
    }
}

function prioritySelector(e){
       let activeFilter = document.querySelector(".modal-filter.active")
       activeFilter.classList.remove("active");
       selectedPriority = e.currentTarget.classList[0].split("-")[0];
       //.getComputedStyle gives css object
       e.currentTarget.classList.add("active"); 
}

function addTicket(taskTyper, e){
    if(e.key == "Enter" && e.shiftKey == false && taskTyper.innerText.trim() != ""){
        // trim remove white spaces ex: _____________rishabh goyal__________ 
        //white spaces before and after whole text are remove not the between one
        let ticket = document.createElement("div");
        ticket.classList.add("ticket");

        // idhr ticket ko node ki trh bnana [pdega addeventlistener lgane ke liye
        ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedPriority}"></div>
        <div class="ticket-id">#dfghjkl</div>
        <div class="task">
            ${taskTyper.innerText}
        </div>`;
        document.querySelector(".modal").remove();
        modalVisible = false;
        
        ticket.addEventListener("click", function(e){
        if(e.currentTarget.classList.contains("active")){
            e.currentTarget.classList.remove("active")
        }else{
            e.currentTarget.classList.add("active");
        }
        })
        TC.appendChild(ticket);
    // TC.innerHTML = TC.innerHTML + ticket;  
    //yeh nhi chlega becoz node ko add kren ke liye append child use krna pdega
    
    }else if(e.key == "Enter" && e.shiftKey == false){
        e.preventDefault();
        alert("Enter the task first");
    }
}

deletebtn.addEventListener("click", function(e){
    let selectedtickets = document.querySelectorAll(".ticket.active");
    for(let i = 0; i<selectedtickets.length; i++){
        selectedtickets[i].remove();
    }
})
