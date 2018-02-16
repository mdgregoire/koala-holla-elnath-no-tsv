let counter = 0; //this counter keeps track of the showReadyToggle clicks


$( document ).ready( function(){

  $('#editField').hide();//hides the edit field
  $('#viewKoalas').on('click', '.deleteButton', function(){
    deleteKoala($(this).attr('id'));
  })//end on click delete
  $('#viewKoalas').on('click', '.transferButton', function(){
    transferKoala($(this).attr('id'));
  })//end on click transfer
  $('#viewKoalas').on('click', '.edit', function(){
    editKoalaGet($(this).attr('id'));
  })//end on click edit
  $('#editField').on('click', '.editKoalaSubmit', function(){
    submitEditedKoala($(this).attr('id'));
  })//end onclick submit edit
  $('#showReadyToggle').on('click', function(){
    counter++;
    showReadyToggle(counter);
  })//end onclick showReadyToggle
  $( '#addButton' ).on( 'click', function(){
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    saveKoala( objectToSend );// call saveKoala with the new obejct
  }); //end addButton on click
  getKoalas();// load existing koalas on page load
}); // end doc ready

function deleteKoala(id){
  $.ajax({
    type: 'DELETE',
    url: '/koalas',
    data: {data:id}
  })
  .done(function(response){
    console.log('delete was success', response);
    getKoalas();
  })
  .fail(function(error){
    console.log(error, 'delete');
  })
}//end deleteKoala

function editKoalaGet(id){
  $('#editField').show();
  $.ajax({
    type: 'POST',
    url: '/koalas/editPost',
    data: { id: id}
  }).done(function(response){
    console.log('editKoalaGet Success', response);
    $('#nameEdit').val(response[0].name);
    $('#ageEdit').val(response[0].age);
    $('#genderEdit').val(response[0].gender);
    $('#transferEdit').val(response[0].ready_for_transfer);
    $('#notesEdit').val(response[0].notes);
    $('#editField').append(`<button class = "editKoalaSubmit" id= ${response[0].id}>Submit Changes</button>`)
  }).fail(function(response){
    console.log('editKoalaGet fail', response);
  });
}//end editKoalaGet

function getKoalas(){
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      writeKoalas(data);
    },
    error: function(error){
      console.log('failure on get');
    }
  });
} // end getKoalas

function saveKoala( newKoala ){
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas in save: ', data );
      getKoalas();
    },
    error: function(error){
      console.log('failure on post');
    }
  });
}// end saveKoala

function showReadyToggle(counter){
  console.log('inshowreadyToggle', counter);
  if(counter % 2 == 0){//if the counter is even displays koalas as normal
    getKoalas()
  }//end if
  else{//odd counter toggles out the koalas that are not ready
    $.ajax({
      url: '/koalas/toggle',
      type: 'GET',
      success: function( data ){
        console.log( 'got some toggle koalas: ', data );
        writeKoalas(data);
      },
      error: function(error){
        console.log('failure on get toggle');
      }
    });
  }//end else
}// end showReadyToggle



function submitEditedKoala(id){
  $.ajax({
    type: 'PUT',
    url: '/koalas/editSubmit',
    data: {
        id: id,
        name: $('#nameEdit').val(),
        age: $('#ageEdit').val(),
        gender: $('#genderEdit').val(),
        ready_for_transfer: $('#transferEdit').val(),
        notes: $('#notesEdit').val()
          }
  }).done(function(response){
    console.log('submitEditedKoala Success', response);
    getKoalas();
    $('#editField').hide();
    $('.editKoalaSubmit').remove();
  }).fail(function(response){
    console.log('submitEditedKoala fail', response);
  });
}//end submitEditedKoala

function transferKoala(id){
  $.ajax({
    type: 'PUT',
    url: '/koalas',
    data: {data:id}
  })
  .done(function(response){
    console.log(' UPDATE was success', response);
    getKoalas();
  })
  .fail(function(error){
    console.log(error, 'update');
  })
}//end transferKoala

function writeKoalas(array){
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
  $('#viewKoalas').empty();

  for(i=0; i<array.length; i++){
    let id = array[i].id;
    let stringToAppend = `<tr class='individualKoala'><td>`;
    stringToAppend += array[i].name+'</td><td>'+array[i].age+'</td><td>'+array[i].gender;
    stringToAppend += '</td><td>'+array[i].ready_for_transfer+'</td><td>'+array[i].notes;
    stringToAppend += '</td><td>'+`<button class="deleteButton" id=${id}>Delete Koala</button>`;
    stringToAppend += `</td><td><button class = "edit" id = ${id}>Edit Koala</button></td>`;
      if(array[i].ready_for_transfer === 'No'){
        stringToAppend += `<td><button class="transferButton" id=${id}>Ready for Transfer</button></td></tr>`;
        }//end if
       else{
        stringToAppend += '</tr>';
        }//end else
    $('#viewKoalas').append(stringToAppend);//this draws the koalas on the DOM
  }//end for loop
}// end writeKoalas function
