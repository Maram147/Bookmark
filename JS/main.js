//& variables
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var visitBtn = document.getElementById("visitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var tableContent = document.getElementById("tableContent");
var cartona;

//&Local storage
if(JSON.parse(localStorage.getItem('todoList'))==null){
    cartona=[];
}
else{
    cartona=JSON.parse(localStorage.getItem('todoList'));
    displayTodo(); 
    
}




//& validation this inputs
var regex = {
    bookmarkName: /^[a-z]{3,}$/,
    bookmarkURL: /^(https:\/\/|http:\/\/)?(www\.)?[a-z]{2,}\.com\/?$/
}
function vaildation(input) {
    if (regex[input.id].test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

//&add
function addTodo() {
    if (vaildation(bookmarkName) && vaildation(bookmarkURL)) {
        if (searchedTodo()) {
            Swal.fire({
                title: "Warning",
                text: "Sorry, This site name is already exist",
                icon: "warning"
            });
        }
        else {
            var todoObj = {
                bookmarkName: bookmarkName.value,
                bookmarkURL: bookmarkURL.value
            }
            cartona.push(todoObj);
            localStorage.setItem('todoList',JSON.stringify(cartona));
        }
    }
    else {
        Swal.fire({
            title: `
                <div class='items d-flex gap-1'>
                 <div class='item item1'></div>
                <div class='item item2'></div>
                <div class='item item3'></div>
                </div><p class='text-black fs-5 mt-3'>Site Name or Url is not valid, Please follow the rules below :</p>`,
            html: `<ol class="rules list-unstyled">
                    <li>
                      <i class="fa-regular fa-circle-right p-2 text-danger"></i>
                      <span class='text-dark'>Site name must
                      contain at least 3 characters</span>
                    </li>
                    <li>
                      <i class="fa-regular fa-circle-right p-2 text-danger"></i><span class='text-dark'>Site URL must be a
                      valid one</span>
                    </li></ol>`,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
        });
    }

}
//&search
function searchedTodo() {
    var term = bookmarkName.value.toLowerCase();
    for (var i = 0; i < cartona.length; i++) {
        if (cartona[i].bookmarkName.toLowerCase() === term) {
            return true;
        }
    }
    return false;
}
//&delete
function deleteTodo() {
    cartona.splice(index, 1);
    displayTodo();
}

//&Display
function displayTodo() {
    var todo = '';
    for (var i = 0; i < cartona.length; i++) {
        todo += `<tr>
            <td>${i + 1}</td>
            <td>${cartona[i].bookmarkName}</td>
            <td><button class="btnVisit btn" id="btnVisit"><a target="_blank" class="text-white" href="${cartona[i].bookmarkURL}"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
            <td><button class="btnDelete btn btn-danger" id="btnDelete" onclick="deleteTodo(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
          </tr>`
    }
    tableContent.innerHTML = todo;
}

//&delete
function deleteTodo(index) {
    cartona.splice(index, 1);
    localStorage.setItem('todoList',JSON.stringify(cartona));
    displayTodo();
}

//&sumbit
submitBtn.onclick = function () {
    addTodo();
    clearForm();
    displayTodo();

}
function clearForm() {
    bookmarkName.value = null;
    bookmarkURL.value = null;
    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
}
