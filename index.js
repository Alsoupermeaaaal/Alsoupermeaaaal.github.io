function changeModalHeaderColor(status){
    let modalHeader = document.getElementById('modal-header');
    modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-danger');
    switch (status) {
        case 'ongoing':
          modalHeader.classList.add('bg-warning');
         break;
        case 'On Queue':
         break;      
        case 'cancelled':
            modalHeader.classList.add('bg-primary');
         break;      
        default:
     break;                    
     }
     
}




function assignRowFieldValues(row){
    let tableNmae = row.parentElement.parentElement;
    let cancelled = row.parentElement.parentElement;

    let columns = row.getElementsByTagName('td');
    let projectnum = row.getElementsByTagName('th');

    let title = document.getElementById('request-title');
    title.value = columns[0].textContent;

    let customer_name = document.getElementById('ordered-by');
    customer_name.value = columns[1].textContent;

    let loc = document.getElementById('location');
    loc.value = columns[2].textContent;

    let odate = document.getElementById('ordered-date');
    odate.value = columns[3].textContent;

    let shipdate = document.getElementById('shipment-date');
    shipdate.value = columns[4].textContent;

    let quantity = document.getElementById('quantity');
    quantity.value = columns[5].textContent;

    let payment_mode = document.getElementById('payment-mode');
    payment_mode.value = columns[6].textContent;

    // let Canccelled_Date = document.getElementById('cancelled-date');
    // let canceldate = document.getElementById('canceld');

    // Canccelled_Date.value = columns[4].textContent;
    // if(cancelled.getAttribute("id") == 'on Going' || cancelled.getAttribute("id") == 'completed'){
    //     Canccelled_Date.classList.add('d-none');
    //     Canccelled_Date.classList.add('d-none');
    // } else {
    //     Canccelled_Date.classList.remove('d-none');
    // }
    


    let status = document.getElementById('field-status');
    if(tableNmae.getAttribute("id") == 'on-going'){
        status.value = columns[8].textContent;
    } else {
        status.value = columns[7].textContent;
    }

    console.log(columns[7].textContent);


    

    changeModalHeaderColor(columns[7].textContent);

    

}

//Hide Buttons
function showHideModalButtons(row, state ='')
{
    const status = row.getElementsByTagName('td')[7].innerHTML;
    const modalMain = document.querySelector('#viewTicketModal');
    
    if(status.includes("On Going")){    

        if(state == ""){
            let showcompleteBtns = modalMain.querySelector("#modal-btn-complete");
            showcompleteBtns.classList.remove('d-none');
            let showcancelBtns = modalMain.querySelector("#modal-btn-Cancel");
            showcancelBtns.classList.remove('d-none');
            let showsaveBtns = modalMain.querySelector("#modal-btn-save");
            showsaveBtns.classList.add('d-none');
        }else if(state == "edit") {
            let showcompleteBtns = modalMain.querySelector("#modal-btn-complete");
            showcompleteBtns.classList.add('d-none');
            let showcancelBtns = modalMain.querySelector("#modal-btn-Cancel");
            showcancelBtns.classList.add('d-none');
            let showsaveBtns = modalMain.querySelector("#modal-btn-save");
            showsaveBtns.classList.remove('d-none');
        }
    }
    if(status.includes("Completed")){    

        if(state == ""){
            let showcloseBtns = modalMain.querySelector("#modal-btn-close");
            showcloseBtns.classList.remove('d-none');
            let showcancelBtns = modalMain.querySelector("#modal-btn-Cancel");
            showcancelBtns.classList.add('d-none');
            let showsaveBtns = modalMain.querySelector("#modal-btn-save");
            showsaveBtns.classList.add('d-none');
            let showcompleteBtns = modalMain.querySelector("#modal-btn-complete");
            showcompleteBtns.classList.add('d-none');
        }
    }
    if(status.includes("Cancelled")){    

        if(state == ""){
            let showcloseBtns = modalMain.querySelector("#modal-btn-close");
            showcloseBtns.classList.remove('d-none');
            let showcancelBtns = modalMain.querySelector("#modal-btn-Cancel");
            showcancelBtns.classList.add('d-none');
            let showsaveBtns = modalMain.querySelector("#modal-btn-save");
            showsaveBtns.classList.add('d-none');
            let showcompleteBtns = modalMain.querySelector("#modal-btn-complete");
            showcompleteBtns.classList.add('d-none');
        }
    }

    
}

function clearFieldValues(){
    let modalMain   = document.querySelector("#viewTicketModal");
    let statuss     = document.querySelector('#field-status');
    let title     = document.querySelector('#request-title');
    let orderedby     = document.querySelector('#ordered-by');
    let loc     = document.querySelector('#location');
    let ordereddate     = document.querySelector('#ordered-date');
    let shipdate1     = document.querySelector('#shipment-date');
    let quantity1     = document.querySelector('#quantity');
    let modeofpayment     = document.querySelector('#payment-mode');

    statuss.value ="";
    title.value ="";
    orderedby.value ="";
    loc.value ="";  
    ordereddate.value ="";
    shipdate1.value ="";
    quantity1.value ="";
    modeofpayment.value ="";

    let showcloseBtns = modalMain.querySelector("#modal-btn-close");
    showcloseBtns.classList.remove('d-none');
    let showcancelBtns = modalMain.querySelector("#modal-btn-Cancel");
    showcancelBtns.classList.add('d-none'); 
    let showsaveBtns = modalMain.querySelector("#modal-btn-save");
    showsaveBtns.classList.add('d-none');
    let showcompleteBtns = modalMain.querySelector("#modal-btn-complete");
    showcompleteBtns.classList.add('d-none');
    let showBtns = modalMain.querySelector("#modal-btn-create");
    showBtns.classList.remove('d-none');
    
    
}
  
//MAIN CONTENT
document.addEventListener('DOMContentLoaded', function() {
    let activeRow = null;

    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
       const columns = row.getElementsByTagName('td');
       if(columns[6].textContent == 'completed'){
          let removeButtons = columns[7].querySelectorAll(".btn-warning,.btn-danger");
          removeButtons[0].classList.add('d-none'); //edit
          removeButtons[1].classList.add('d-none'); //delete
       }
    });

    //View Button
    viewButton = document.querySelectorAll('.view-ticket');
    viewButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;
            // assign values to fields base on selected row
            assignRowFieldValues(row);
            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "cancel-date" && input.id != "field-status"  && input.id != "request-title" && input.id != "ordered-by" && input.id != "location" && input.id != "ordered-date" && input.id != "shipment-date" && input.id != "quantity" && input.id != "payment-mode" ) {
                    input.removeAttribute("disabled");
                }
            });
            showHideModalButtons(row, "");
        });
    });

    //Edit Button
    editButton = document.querySelectorAll('.edit-ticket');
    editButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;
            assignRowFieldValues(row);
            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "cancel-date" && input.id != "field-status") {
                    input.removeAttribute("disabled");
                }
            });
            showHideModalButtons(row, "edit");
        });
    
    });
    // Modal-Save Button
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('td');
        const modalMain = document.querySelector('#viewTicketModal');

        columns[0].textContent = modalMain.querySelector('#request-title').value  
        columns[2].textContent = modalMain.querySelector('#location').value  
        columns[4].textContent = modalMain.querySelector('#shipment-date').value  
        columns[5].textContent = modalMain.querySelector('#quantity').value  
        columns[6].textContent = modalMain.querySelector('#payment-mode').value  



    });

    //MODAL WINDOW
    modalWindow =  document.querySelector('#viewTicketModal');
    modalWindow.addEventListener("hidden.bs.modal", function(){
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
           input.setAttribute("disabled","");
        });
    })

    //Add Button
    addButton = document.querySelector('#add-ticket');
    addButton.addEventListener('click', function(){
        console.log("ADD BUTTON WAS CLICK");
        clearFieldValues();
        
    });


    
    // Delete Button
    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button)
    {
        button.addEventListener('click', function()
        {
            let row = this.parentElement.parentElement; 
            const modalDelete = document.querySelector("#deleteModal");
            const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
            confirmDelBtn.addEventListener("click", function()
            {
                row.remove();
            });
        });

    });
    

});
 




    

    
    
    
    


