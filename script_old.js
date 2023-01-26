let title = document.getElementById('title');
let note = document.getElementById('note');

let copyNote = document.getElementById('copyNote');
let copyNoteDiv = document.getElementById('copyNoteDiv');
let buttonAdd = document.getElementById('buttonAdd');
let buttonSave = document.getElementById('buttonSave');
let buttonReset = document.getElementById('buttonReset');
let buttonRemove = document.getElementById('buttonRemove');

let obj;
let bookmarks = [];

let titleCheck = false;

let code;

// title.addEventListener('input',function(){
//     copyNote.value = this.value;
// })




buttonAdd.addEventListener('click', addNewNote);

buttonSave.addEventListener('click', saveNote);

buttonReset.addEventListener('click', function(){
        localStorage.clear();
        copyNoteDiv.innerHTML = '';
        title.value ='';
        note.value = '';
})

buttonRemove.addEventListener('click', function(){

    let element =  document.getElementById(code);

    // copyNoteDiv.removeChild(element);

    localStorage.removeItem(bookmarks[code]);

      let data = JSON.parse(localStorage.getItem('bookmarks')); 

      if(data){
   for (let i=0; i<data.length; i++){
    if(data[i].code === code){
        bookmarks.splice(i, 1);
    }
   }
}

   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


})


note.addEventListener('input', function(){
    if(title.value.length === 0){
        alert('Please Add a Title')
        note.value = '';
       
    }
})

document.addEventListener('click', function(e){
    let data = JSON.parse(localStorage.getItem('bookmarks'));

    if(typeof(parseInt(e.target.id))=== 'number'){;
        code = e.target.id;
        }

    if(data){
    for(let i=0; i<data.length; i++){
            if( e.target.value === data[i].title){
                 console.log(typeof(parseInt(e.target.id)));
                title.value = data[i].title;
                note.value = data[i].note;
                titleCheck = false;
            }
    }    
}
   
}
   
);



function saveNote(){
    let data = JSON.parse(localStorage.getItem('bookmarks'));
  

    if(title.value.length !== 0 ) {
        if(data){
            obj = {
                title: title.value,
                note: note.value,
                code: data.length
            }
        }else{
            obj = {
                title: title.value,
                note: note.value,
                code: 0
            }
        }
 

    //same title or not
   
    if (data){
        for(let i=0; i<data.length; i++){
            let storageTitle = data[i].title
            if(titleCheck=== true){
                if(title.value === storageTitle ){
                    alert('Title already exists');
                    return;
                }
            }
         
}
  
    }
   

    if((localStorage.getItem('bookmarks')== null)){
        
         bookmarks.push(obj);
    
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        fetchBookmark();
    }
    else{
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(obj);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        fetchBookmark();
    }
}


}

function addNewNote(){
    title.value = '';
    note.value = '';
    titleCheck = true;
}

function fetchBookmark(){
    let data = JSON.parse(localStorage.getItem('bookmarks'));
        
    let dataPosition = data[data.length-1]
    let title = dataPosition.title

    // for(let i=0; i<data.length; i++){
    //     let title = data[i].title;
        // let note = data[i].note
        
        // copyNoteDiv.innerHTML += "<div> <h1> da <h1></div>";
        copyNoteDiv.innerHTML += `<input id='${dataPosition}' value="${title}">`;  
    

};

function onLoadBody(){
    let data = JSON.parse(localStorage.getItem('bookmarks'));
    if(data){
        for(let i=0; i<data.length; i++){
    
            let dataPosition = i;

            
            let title = data[i].title;
            copyNoteDiv.innerHTML += `<input id='${dataPosition}' value="${title}">`;  
    };
   }  ;   
};
