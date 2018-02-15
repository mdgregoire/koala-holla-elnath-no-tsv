console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
$('#viewKoalas').on('click', '.deleteButton', function(){
  deleteKoala($(this).attr('id'));
})

$('#viewKoalas').on('click', '.transferButton', function(){
  transferKoala($(this).attr('id'));
})


  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );

  }); //end addButton on click

}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      writeKoalas(data);
    },   // end success
    error: function(error){
      console.log('failure on get');
    }
  });
 //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas in save: ', data );
      getKoalas();
    },// end success
    error: function(error){
      console.log('failure on post');
    }
  }); //end ajax
}

// this is from the get post above 
function writeKoalas(array){
console.log('in write koala ', array);
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
  stringToAppend += '</td>';
    if(array[i].ready_for_transfer === 'No'){
      stringToAppend += `<td><button class="transferButton" id=${id}>Ready for Transfer</button></td></tr>`;
      }//end if
     else{
      stringToAppend += '</tr>';
      }//end else
      $('#viewKoalas').append(stringToAppend);
    

  


  }//end for loop


}// end write koala function 


function deleteKoala(id){
  console.log(id, 'in deleteKoala');
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
  }//end delete


  function transferKoala(id){
    console.log('in transfer');
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
  }//end transfer koala