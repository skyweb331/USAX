$(document).ready(function() {

  // header height resize
  $(window).on('resize', function() {
    var headerHeight = $('header').height();
    $('#main').css('margin-top', headerHeight);
  }).resize();
  $('select').niceSelect(); // converts all select to jquery nice select
  $('input').iCheck({
    checkboxClass: 'icheckbox_square-grey',
    radioClass: 'iradio_square-grey'    
  });
});
