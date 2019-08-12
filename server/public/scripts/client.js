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
    }).catch( function( err ){
        alert( 'Error posting task. See console for details' );
        console.log( err );
    })
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
            console.log( 'checking:', response[i].complete );
            if( response[i].complete ){
                taskString += `<li class="completedTask">` 
            }
            else{
                taskString += `<li>` 
            }
            taskString += `${ response[i].task }`;
            taskString += ` <button>Complete</button><button>Delete</button></li>`;
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
}