$(document).ready(function() {
	var sidebar = $('.sidebar-opportunity .sidebar-container');
	var originSideBarHeight = sidebar.height();
	function sideBarFit(){
		if($(window).scrollTop() + $(window).height() > $('#footer').offset().top){
		  	sidebar.css('position', 'absolute');
		  	sidebar.css('top', $('main').height() - originSideBarHeight);
		}else {
			sidebar.css('position','fixed');
			sidebar.css('top',$('header').height());
		}
	}

	sideBarFit();

	$(window).scroll(function(){
		sideBarFit();
  	});


});
