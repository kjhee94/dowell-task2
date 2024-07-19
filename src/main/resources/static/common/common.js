/**
 * 
 */
$(function(){
	//input 내에서 focus를 value 끝으로 이동
	$.focusEnd = function(){
		var len = $('input[autofocus]').val().length;
		$('input[autofocus]')[0].setSelectionRange(len, len);
	}
	
	//닫기버튼 클릭시 팝업닫기
	$('#closeBtn').click(function(){
		window.close();
	});
	
	//스크롤바 생성 변형 함수
	$.scrollBerTransform = function(select){
		$.fn.hasScrollBar = function() {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
		};
		if($('.result-content').hasScrollBar()) { 				//결과값이 많아 tbody에 스크롤바가 생길 경우
			$('.result-title').css('padding-right','16.5px'); 	//th의 tr에 스크롤바 넓이의 padding 추가
			if(select=='sale'){
				$('.sum-result').css('padding-right','19.2%');
				$('.sum-result>span').css('width','19.3%');
			}else if(select='saleDt'){
				$('.sum-result').css('padding-right','16.5px');
			}
		}else {
			$('.result-title').css('padding-right','0');		//스크롤바가 없는경우 padding 0
			if(select=='sale'){
				$('.sum-result').css('padding-right','18.1%');
				$('.sum-result>span').css('width','19.1%');
			}else if(select='saleDt'){
				$('.sum-result').css('padding-right','0');
			}
		}
	}
	
	//popup 오픈 함수
	$.popupOpen = function(selector,width,height,url,name){
		selector.click(function(){
			var option = 'width='+width+', height='+height+', top=50, left=50, location=no';
			window.open(url, name, option);
		});
	}
	
	//reset 함수
	$.reset = function(selector,url){
		selector.click(function(){
			window.location.href = url;	//새로고침
		});
	}
	
	//체크박스 단일선택
	$.oneCheck = function(){
		$('input[id^="checkbox"]').click(function(){
			if($(this).prop('checked')){ 							//체크박스 하나가 선택 됐을 때
				$('input[id^="checkbox"]').prop('checked',false);	//모든 체크박스 선택 해제
				$(this).prop('checked',true); 						//선택된 것만 다시 체크
			};
		});
	}
	
	//popup 검색 공통함수
	$.allPopSearchFunc = function(){
		//스크롤바 생성 변형 함수
		$.scrollBerTransform();
		
		//체크박스 단일선택
		$.oneCheck();
	}
	
	//키보드 Enter 이벤트
	$.keydownEnter = function(selector,click){
		selector.keydown(function(keyNum){		//현재의 키보드의 입력값을 keyNum으로 받음 
			if(keyNum.keyCode == 13){ 			//keydown으로 발생한 keyNum의 숫자체크 : 숫자가 enter의 아스키코드 13과 같으면 
				click.click(); 					//기존에 정의된 클릭함수를 호출 
			};
		});
	}
	
	//가격 콤마 제거
	$.RmvCom = function(value){
		var value = value.replaceAll(',',"");
		return value;
		
	}
	
	//가격 콤마 추가
	$.AddCom = function(value){
        value = value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return value; 
    }
	
	//-------------------------------------------------------------------유효성 검사
	//유효성 검사 이벤트
	$.validEvent = function(){
		//소비자단가 검사
		$('#prdCsmrUpr').change(function(){ 
			var number = $(this).val();
			var unCommaNum = $.RmvCom(number);
			var commaNum = $.AddCom(unCommaNum);
			if($.checkNumberValid('#prdCsmrUpr')){
				if(number=='0' && $('input[name="prdTpCd"]:checked').val()==10){
					$.validResult('본품의 소비자단가를 0으로 설정할 수 없습니다.','#prdCsmrUpr');
				}else {
					$(this).val(commaNum);
				}
			}
		});
		//매입단가 검사
		$('#prdPchUpr').blur(function(){ 
			var number = $(this).val();
			var commaNum = $.AddCom(number);
			if($.checkNumberValid('#prdPchUpr')){
				if(number=='0' && $('input[name="prdTpCd"]:checked').val()==10){
					$.validResult('본품의 소비자단가를 0으로 설정할 수 없습니다.','#prdPchUpr');
				}else {
					$(this).val(commaNum);
				}
			}
		});
		//라디오버튼 검사
		$('input[name="prdTpCd"]').change(function(){
			var prdTpCd = $("input[name='prdTpCd']:checked").val();
			
			if(prdTpCd==10){
				if($("#prdCsmrUpr").val()==0){
					$("#prdCsmrUpr").val('');
				}
				if($("#prdPchUpr").val()==0){
					$("#prdPchUpr").val('');
				}
			}else {
				$("#prdCsmrUpr").val('0');
				$("#prdPchUpr").val('0');
			}	
		});
	}
	
	//input 내용이 숫자인가?
	$.isNumber =  function(str,select){
		var result = str.replace(/[^0-9,]/g,'');
		/*if(select=='comma'){
			var result = str.replace(/[^0-9,]/g,'');
		}else {
			var result = str.replace(/[^0-9]/g,'');
		}*/
		
		if(str!=result){
			return false;
		}else {
			return true;
		}
	}
	
	//숫자 유효성
	$.checkNumberValid = function(selector){
		var data = $(selector).val();
		
		//숫자만 입력 가능
		if(!$.isNumber(data)){
			$.validResult('숫자만 입력해 주세요.',selector);
			return false;
		}
		return true;
	}
	
	//유효성 결과 처리
	$.validResult = function(msg,selector){
		if(msg!='None'){
			alert(msg);
		}
		setTimeout(function(){ 
			$(selector).focus(); 
		}, 10)
		$(selector).val("");
		return false;
	}
	
	//유효성 전체검사
	$.checkAll = function() {
		var prdNm = $('#prdNm').val().trim();
		var prdCsmrUpr = $('#prdCsmrUpr').val().trim();
		var prdPchUpr = $('#prdPchUpr').val().trim();
		
		if(prdNm.length==0){																	//고객명 미입력
			$.validResult('상품명을 입력해 주세요.','#prdNm');
		}else if(prdCsmrUpr.length==0){																//생년월일 미입력
			$.validResult('소비자단가를 입력해 주세요.','#prdCsmrUpr');
		}else if(prdPchUpr.length==0){																//생년월일 미입력
			$.validResult('매입단가를 입력해 주세요.','#prdPchUpr');
		}
		//모두통과시 true
		else{
			return true;
		}
	}
});