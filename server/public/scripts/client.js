$( document ).ready( readyNow );

function addTask(){
    console.log( 'in addTask' );
    // get user input, packafge in an object, send to server
    let objectToSend = {
        task: $( '#taskNameIn').val()
    }
    console.log( 'sending:', objectToSend  );
    $.ajax({
        type: 'POST',
        url: 'todo',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error posting task. See console for details' );
        console.log( err );
    })
}

function completeTask(){
    console.log( 'in completeTask:', $( this ).data( 'id' ) );
    $.ajax({
        type: 'PUT',
        url: 'todo/' + $( this ).data( 'id' ),
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'problem updating. see console for details.' );
        console.log( err );
    })
}

function deleteTask(){
    console.log( 'in deleteTask:', $( this ).data( 'id' ) );
    $.ajax({
        type: 'DELETE',
        url: '/todo/' + $( this ).data( 'id' )
    }).then( function( response ){
        console.log( 'back from DELETE with:', response );
        getTasks();
    }).catch( function( err ){  
        alert( 'error deleting task, check console for details' );
        console.log( err );
    } )
}

function getTasks(){
    console.log( 'in getTasks' );
    $.ajax({
        type: 'GET',
        url: 'todo'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // display tasks on DOM
        let el = $( '#tasksOut' );
        el.empty();
        for( let i= 0; i < response.length; i++ ){
            let taskString = ``;
            if( response[i].complete ){
                taskString += `<li class="completedTask">` 
            }
            else{
                taskString += `<li>` 
            }
            taskString += `${ response[i].task }`;
            taskString += ` <button class="completeButton" data-id="${ response[i].id }">Complete</button>`;
            taskString += `<button class="deleteButton" data-id="${ response[i].id }">Delete</button></li>`;
            el.append( taskString );
        }
        
    }).catch( function( err ){
        alert( 'Error getting tasks from server. See Console for more' );
        console.log( err );
    })
}

function readyNow(){
    getTasks();
    $( '#addTaskButton' ).on( 'click', addTask );
    $( '#tasksOut' ).on( 'click', '.completeButton', completeTask );
    $( '#tasksOut' ).on( 'click', '.deleteButton', deleteTask );
}