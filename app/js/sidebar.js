$(document).ready(function(){

  sidebarOpen( $('.hamburger'), $('.account-sidebar') );
  sidebarOpen( $('.search-toggle'), $('.search-sidebar') );

  // sidebar open
  function sidebarOpen(sidebarOpen, sidebar) {
    sidebarOpen.click(function(){
      sidebar.addClass('sb-active');
      $('body').addClass('scroll-lock');
      $('.sidebar-overlay').css('visibility', 'visible');
      sidebarClose();
      $('.search-sidebar input').focus();
    });
  }

  // sidebar close
  function sidebarClose() {
    $('.sidebar-overlay, .sb-close, .account-buttons .btn').click(function(){
      if( $('.sidebar').hasClass('sb-active') ) {
        $('.sidebar').removeClass('sb-active');
        $('body').removeClass('scroll-lock');
        $('.sidebar-overlay').css('visibility', 'hidden');
      }
    });
  }

  // list search filter
  var searchExchange = {
    valueNames: [ 'name' ]
  };
  var ExchangeList = new List('exchange-list', searchExchange);
  
});
