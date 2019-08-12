$( document ).ready( readyNow );

function addTask(){
    console.log( 'in addTask' );
    // get user input, packafge in an object, send to server
    let objectToSend = {
        task: $( '#taskNameIn').val()
    }
    console.log( 'sending:', objectToSend  );
}

function readyNow(){
    $( '#addTaskButton' ).on( 'click', addTask );
}