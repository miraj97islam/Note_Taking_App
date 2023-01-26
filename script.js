let title = document.getElementById('title');
let note = document.getElementById('note');

let copyNoteDiv = document.getElementById('copyNoteDiv');


let buttonAdd = document.getElementById('buttonAdd');
let buttonSave = document.getElementById('buttonSave');
let buttonRemove = document.getElementById('buttonRemove');
let buttonReset = document.getElementById('buttonReset');

// local storage Data
let ls_Data ; 

// to track elements in copyNoteDiv
let codeNumber = 0;

let obj;
let bookmarks = [];

title.focus();

buttonAdd.addEventListener('click', addNewNote);
buttonSave.addEventListener('click', function(){
                                                    if(title.value !== ''){
                                                        saveNote();    
                                                    };
                                                });
buttonRemove.addEventListener('click', removeNote);
buttonReset.addEventListener('click', function(){
                                        if(confirm(' Do you want to delete all notes ? ') === true){
                                            localStorage.removeItem('bookmarks');
                                            copyNoteDiv.innerHTML = '';
                                            title.value ='';
                                            note.value = '';
                                            codeNumber = 0;
                                            bookmarks = [];
                                        };            
                                    });

copyNoteDiv.addEventListener('click', copyNoteDivClick);


//onClick add button
function addNewNote(){
    title.value = '';
    note.value = '';
    codeNumber= 0;

    title.focus();
}


//onClick save button
function saveNote(){

    //parse local storage data
    ls_Data = JSON.parse(localStorage.getItem('bookmarks'));
    
    //if first note or new note 
    if(codeNumber === 0){
        //if new note 
        if(localStorage.length !== 0){
                    obj = {
                        title: title.value,
                        note: note.value,
                        code: ls_Data[ls_Data.length-1].code + 1
                    };

                    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

                    bookmarks.push(obj);

                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

                    codeNumber = obj.code;

                    fetchBookmark();
        //else if first note
        }else{
                    obj = {
                        title: title.value,
                        note: note.value,
                        code: 1
                    };

                    bookmarks.push(obj);

                    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

                    codeNumber = obj.code;

                    fetchBookmark();
             };
    }else{
            ls_Data[codeNumber-1].title = title.value;
            ls_Data[codeNumber-1].note = note.value;

            localStorage.setItem('bookmarks', JSON.stringify(ls_Data));
 
            let copyDivElement = document.getElementById(`${codeNumber}`);
            copyDivElement.value =      title.value;
    };
};


//onClick removeButton
function removeNote(){

    ls_Data = JSON.parse(localStorage.getItem('bookmarks'));

    if(confirm(' Do you want to delete the note ? ') === true){

        if(ls_Data.length > 1){

                ls_Data.splice(codeNumber-1, 1);

                for(let i=0; i<ls_Data.length; i++){
                    ls_Data[i].code = i+1;
                }

                bookmarks = [];

                bookmarks = ls_Data;

                localStorage.removeItem('bookmarks');

                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

                location. reload() ;

        }else if(ls_Data.length === 1){
                bookmarks = [];

                localStorage.removeItem('bookmarks');

                location. reload(); 

         };
    };
};


//appearing saved data in front end
function fetchBookmark(){
   
    ls_Data = JSON.parse(localStorage.getItem('bookmarks'));

    let title = ls_Data[ls_Data.length-1].title;

    let codeNumber = ls_Data[ls_Data.length-1].code; 

    //track elements with their code as id
    copyNoteDiv.innerHTML += `<input id='${codeNumber}' value="${title}" readonly>`;  

    let element  = document.getElementById(codeNumber);

    copyNoteDiv.classList.add('copyNoteDiv');
    element.classList.add('copyNoteDiv'); 

};


//when page loads
function onLoadBody(){
    ls_Data = JSON.parse(localStorage.getItem('bookmarks'));
    let last_ls_Data_Position ;
    let title;

    if(localStorage.length !=0){
        for(let i=0; i<ls_Data.length; i++){
            last_ls_Data_Position = i;

            title = ls_Data[last_ls_Data_Position].title

            copyNoteDiv.innerHTML += `<input id='${last_ls_Data_Position+1}' value="${title}" readonly >`; 
            
            let element  = document.getElementById(last_ls_Data_Position+1);
            
            copyNoteDiv.classList.add('copyNoteDiv');
            element.classList.add('copyNoteDiv'); 
        };
    };
};


//maintain which element in local storage will update after onClick saveButton, if the note or title changed
function copyNoteDivClick(e){
    ls_Data = JSON.parse(localStorage.getItem('bookmarks'));
    
    codeNumber = e.target.id;

    title.value = ls_Data[codeNumber-1].title;
    note.value = ls_Data[codeNumber-1].note;
};