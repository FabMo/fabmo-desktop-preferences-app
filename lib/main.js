
var fabmo = new FabMoDashboard();

var config;
var variables;

var getKeyVals = function(e){
    switch (e.target.type) {
    case "radio":
      return [e.target.name, e.target.value]
    default:
      return [e.target.id, parseFloat(e.target.value)]
  }
};

function update() {
    fabmo.getConfig(function(err, config){
    console.log(config);
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
    }
  });
}

$(document).ready(function(){
  $(document).on('change', function(e){
    var keyVals = getKeyVals(e);
    //config.opensbp.variables[keyVals[0]] = keyVals[1];
    var cfg = {opensbp:{variables:{}}}
    cfg.opensbp.variables[keyVals[0]] = keyVals[1];
    console.info(cfg)
    fabmo.setConfig(cfg, function(err, data){
      if(err){ return console.error(err); } 
      update();
    });
  });

  update();

});

$("input[name='mtc_mode']").change(function(e){
  if($(this).val() === 'MTC') {
    $('.mtc_options').slideDown();
  } else {
    $('.mtc_options').slideUp();
  }
});

$("input[name='mtc_z_mode']").change(function(e){
  if($(this).val() === 'FIXED') {
    $('.z_options').slideDown();
  } else {
    $('.z_options').slideUp();
  }
});

$("input[name='mtc_xy_mode']").change(function(e){
  if($(this).val() === 'FIXED') {
    $('.xy_options').slideDown();
  } else {
    $('.xy_options').slideUp();
  }
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

$('.select-button').click(function(e) {
    e.preventDefault()
    $(this).parent().find('a').removeClass('is-primary')
    val = $(this).addClass('is-primary')
});

fabmo.on('status',function(status){
  console.log(status);
})