/**
 * 
 */
$(function(){
	//gnb slide
	$('.gnb-list').click(function() {
		//slide가 접힌(안보이는)상태일 때
    	if($(this).next('.lnb').css('display')=='none'){
    		//메뉴가 아래로 열리며 화살표 회전
    		$(this).next('.lnb').slideDown(250);
    		$(this).find('.icon-arrow').css('transform','rotate(90deg)');
    		//클릭한 메뉴 외의 다른 메뉴 닫고 화살표 회전
    		$('.lnb').not($(this).next('.lnb')).slideUp(250);
			$('.icon-arrow').not($(this).find('.icon-arrow')).css('transform','rotate(0deg)');
    	}
    	//slide가 열린(보이는)상태일 때
    	else {
    		//메뉴 닫고 화살표 회전
    		$(this).next('.lnb').slideUp(250);
    		$(this).find('.icon-arrow').css('transform','rotate(0deg)');
    	}
    });
});