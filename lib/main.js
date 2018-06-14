
var fabmo = new FabMoDashboard();

var config;
var variables;
//var temp = {tool_change_x : 24};


var getKeyVals = function(e){
    var target = $(e.target)
    switch (target.prop('tagName').toLowerCase()) {
    case "a":
      return [target.data('variable'), target.data('value')]
    default:
      return [e.target.id, parseFloat(e.target.value)]
  }
};

function update(config, err) {
    fabmo.getConfig(function(err, config){
    if(err){
      console.log(err);
    } else {
      var variables = config.opensbp.variables;
      for(var val in variables) {
        var target = $('#' + val);
        if(target && target.length) {
          switch (target.prop('tagName').toLowerCase()) {
          case "div":
            target.find('.select-button').each(function(idx) {        
              if($(this).data('variable') == val) {
                if($(this).data('value') == variables[val]) {
                  $(this).addClass('is-primary');
                } else {
                  $(this).removeClass('is-primary');
                }
              }
            });
            case 'input':
              target.val(variables[val]);
              break;
          }
        }          
      }

      $('.expand-section').each(function(idx) {
        var section = $(this);
        if(variables[section.data('variable')] == section.data('expand-value')) {
          section.slideDown();
        } else {
          section.slideUp();
        }
      });
    }
  });
}

$(document).ready(function(){
  $(document).on('change', function(e){
    var keyVals = getKeyVals(e);
    var cfg = {opensbp:{variables:{}}}
    cfg.opensbp.variables[keyVals[0]] = keyVals[1];
    fabmo.setConfig(cfg, function(err, data){
      if(err){ return console.error(err); } 
      update();
    });
  });

  update();

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
    fabmo.runSBP(file);
  })
});

$('.select-button').click(function(e) {
    e.preventDefault()
    var keyVals = getKeyVals(e);
    var cfg = {opensbp:{variables:{}}}
    cfg.opensbp.variables[keyVals[0]] = keyVals[1];
    fabmo.setConfig(cfg, function(err, data){
      if(err){ return console.error(err); } 
      update();
    });
});

fabmo.on('status',function(status){
  console.info(status);
})