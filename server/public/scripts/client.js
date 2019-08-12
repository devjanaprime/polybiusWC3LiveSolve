$( document ).ready( readyNow );

function addTask(){
    console.log( 'in addTask' );
    // get user input, packafge in an object, send to server
    let objectToSend = {
        task: $( '#taskNameIn').val()
    }
    console.log( 'sending:', objectToSend  );
}

function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
        type: 'GET',
        url: 'todo'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
    }).catch( function( err ){
        alert( 'Error getting tasks from server. See Console for more' );
        console.log( err );
    })
}

function readyNow(){
    getTasks();
    $( '#addTaskButton' ).on( 'click', addTask );
}