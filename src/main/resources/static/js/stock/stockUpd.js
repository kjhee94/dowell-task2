window.onload = function () {
	//페이지 온 로드 시 매장별 재고 목록 조회
	getList();
	
	//매장별 재고 검색 feach
	const form = document.querySelector('#SearchStockForm');
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		
		if(formData.get('prtCd').length == 0 && formData.get('prtNm').length == 0) {
			alert("매장을 입력해 주세요");
			return false;
		}
		
		try {
	        const response = await fetch('/api/stocks/product/search', {
				method: 'POST',
				headers: {
                	'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
					prtCd: formData.get('prtCd'),
					prtNm: formData.get('prtNm'),
					prdNm: formData.get('prdNm'),
		        	prdCd: formData.get('prdCd')
				})
			});
			console.log(response);
	        if (!response.ok) {
	            throw new Error('Failed to fetch datas');
	        }
	        const res = await response.json();
	        displayData(res);
	    } catch (error) {
	        console.error('Error fetching datas:', error);
	        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
	    }
	});
	
	//매장별 재고 수정 fetch
	const saveBtn = document.querySelector('#stockSaveBtn');
	saveBtn.addEventListener('click', async function(event) {
		event.preventDefault();
		
		//변경된 내역만
		var chgQty = document.querySelectorAll('.changed');
		
		if(chgQty.length==0){
			alert('재고조정 내역이 없습니다.');
			return false;
		}
		
		var stockUpdates = [];
		$('.changed').each(function() {
            var prtCd = $('#prtCd').val();
            var prdCd = $(this).siblings('.prdCd').text();
            var chgBfIvcoQty = $(this).siblings('.chgBfIvcoQty').text();
			var chgAfIvcoQty = $(this).siblings('.chgAfIvcoQty').children().val();
			var chgQty = $(this).text();
			var chgRsnCd = $(this).siblings('.chgRsnCd').children().val();
			var chgRsnDt = $(this).siblings('.chgRsnDt').children().val();
            
            if(chgRsnCd==null){
				alert('조정사유를 선택해 주세요');
				stockUpdates = [];
				return false;
			}else {
				stockUpdates.push({
					prtCd: prtCd, 
					prdCd: prdCd, 
					chgBfIvcoQty: chgBfIvcoQty,
					chgQty: chgQty,
					chgAfIvcoQty: chgAfIvcoQty,
					chgRsnCd: chgRsnCd,
					chgRsnDt: chgRsnDt
				});
			}
        });
        console.log(stockUpdates);
        
        if(stockUpdates.length >= 1){
			if(confirm('재고 변경 내역을 저장 하시겠습니까?')){
				try {
			        const response = await fetch('/api/stocks', {
						method: 'PUT',
						headers: {
		                	'Content-Type': 'application/json'
			            },
			            body: JSON.stringify(stockUpdates)
					});
					console.log(response);
			        if (!response.ok) {
			            throw new Error('Failed to fetch datas');
			        }
			        alert("재고 조정이 완료되었습니다.");
			    } catch (error) {
			        console.error('Error fetching datas:', error);
			        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
			    }
			}
		}
	});
	
	//매장명 input 클릭시 팝업 오픈
	$.popupOpen($('#prtSearchBtn'),'450','500','/stock/prtPop','prtPopOpen');
} 

//매장별 재고 목록 feach
async function getList() {
	const prtCd = document.getElementById('prtCd').value
	const prdCd = document.getElementById('prdCd').value
	
    try {
        const response = await fetch('/api/stocks/product',{
			method: 'POST',
			headers: {
            	'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				prtCd: prtCd,
				prdCd: prdCd
			})
		});
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch datas');
        }
        const res = await response.json();
        displayData(res);
    } catch (error) {
        console.error('Error fetching datas:', error);
        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
    }
}

//데이터 탬플릿
function displayData(res) {
	let element = document.querySelector("#fieldListBody");
	element.innerHTML = "";
	
	if (res.length > 0) {
		res.forEach(function (result, index) {
			let template = `
				<div class="one-content">
					<span class="checkbox"><input type="checkbox" name="ckGroup" disabled></span>
					<span class="prdCd">${result.prdCd}</span>
					<span class="prdNm">${result.prdNm}</span>
					<span class="chgBfIvcoQty">${result.chgBfIvcoQty}</span>
					<span class="chgAfIvcoQty"><input class="style-input style-input-result" type="text" name="chgAfIvcoQty" value="${result.chgBfIvcoQty}" autocomplete='off'></span>
					<span class="chgQty">0</span>
					<span class="chgRsnCd">
						<select name="chgRsnCd" class="style-input style-input-result">
							<option selected disabled>선택</option>
						</select>
						<span class="material-icons select-arrow">expand_more</span>
					</span>
					<span class="chgRsnDt"><input class="style-input style-input-result" type="text" name="chgRsnDt" autocomplete='off'></span>
				</div>
			`;
			element.insertAdjacentHTML('beforeend', template);
		});
		
		displaySelect();
		
		//차이수량 계산
		$('input[name="chgAfIvcoQty"]').change(function() {
            var afdata = $(this).val();
            var bfdata = $(this).parent().prev().text();
            var chgQty = $(this).parent().next();
            var checkbox = $(this).parent().siblings('.checkbox').children();
            var chgRsnCd = $(this).parent().siblings('.chgRsnCd').find('option:eq(0)');
            var chgRsnDt = $(this).parent().siblings('.chgRsnDt').children();
            
            if(!$.isNumber(afdata)){
				alert('숫자만 입력해 주세요.');
				setTimeout(function(){$(this).focus();}, 10)
				$(this).val(bfdata);
				chgQty.text("0");
				chgQty.removeClass("changed");
				checkbox.prop('checked',false);
				checkbox.prop('disabled',true);
				chgRsnCd.prop('selected', true);
				chgRsnDt.val("");
			}else {
				if(afdata!=bfdata) {
					//조정수량 발생시
					chgQty.addClass("changed");
					chgQty.text(afdata-bfdata);
					checkbox.prop('checked',true);
					checkbox.prop('disabled',false);
				}else {
					//조정수량 0일 때
					chgQty.text("0");
					chgQty.removeClass("changed");
					checkbox.prop('checked',false);
					checkbox.prop('disabled',true);
					chgRsnCd.prop('selected', true);
					chgRsnDt.val("");
				}
			}
        });
        
        $('input[type="checkbox"]').change(function() {
			var bfdata = $(this).parent().siblings('.chgBfIvcoQty').text();
			var afdata = $(this).parent().siblings('.chgAfIvcoQty').children();
			var chgQty = $(this).parent().siblings('.chgQty');
			var chgRsnCd = $(this).parent().siblings('.chgRsnCd').find('option:eq(0)');
			var chgRsnDt = $(this).parent().siblings('.chgRsnDt').children();
			
			if(!$(this).is(':checked')){
				afdata.val(bfdata);
				chgQty.text("0");
				chgQty.removeClass("changed");
				$(this).prop('disabled',true);
				chgRsnCd.prop('selected', true);
				chgRsnDt.val("");
			}
		});
        
	} else {
		element.innerHTML = `<p>검색결과가 없습니다.</p>`
	}
}

function displaySelect() {
	let selectElements = document.querySelectorAll(".chgRsnCd > select");
	
	options.forEach(function(option) {
        let newOption = '<option value="' + option.chgRsnCd + '">' + option.chgRsnNm + '</option>';
   		selectElements.forEach(function(selectElement) {
            selectElement.insertAdjacentHTML('beforeend', newOption);
        });
    });
}

function stockHtPop() {
	const prtCd = document.querySelector('#prtCd').value;
    const prtNm = document.querySelector('#prtNm').value;
	
	location.href="/stock/stockHt?prtCd="+prtCd+"&prtNm="+prtNm;
}