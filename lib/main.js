
var fabmo = new FabMoDashboard();

var config;
var variables;

$(document).ready(function(){
  fabmo.getConfig(function(err, config){
    if(err){
      console.log(err);
    } else {
      config = config;
      variables = config.opensbp.variables;
      for(var val in variables){
        if($('#'+val).length){
          $('#'+val).val(variables[val]);
        }
      }
      $(document).on('change', function(e){
        var id = e.target.id;
        config.opensbp.variables[id] = parseFloat($('#'+id).val());
        fabmo.setConfig(config, function(err, data){
          if(err){
            console.log(err);
          } else {
            console.log(data);
          }
        });
      });
    }
  });

});

$('#runSquare').click(function(){
  fabmo.runSBP('C10');
});

$('.panel-block').click(function(){
  var clicked = $(this).attr('id');
  $('.'+clicked).show();
  $('.panel').hide();
});

$('.delete').click(function(){
  $('.section').hide();
  $('.panel').show();
});

$('#ZZeroPlateThickness').on('change',function(){
  if($(this).val() === 'custom') {
    $('#custom-z').show();
  } else {
    $('#custom-z').hide();
  }
});


$('#set-offsets').click(function(){
  $.get('./files/offset.sbp', function(data){
    var file = data.toString();
    console.log(file);
    fabmo.runSBP(file);
  })
});


fabmo.on('status',function(status){
  console.log(status);
})