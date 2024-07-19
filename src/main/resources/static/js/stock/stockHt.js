window.onload = function () {
	//페이지 온 로드 시 매장별 재고 목록 조회
	getList();
	
	//매장별 재고 변경이력 검색 feach
	const form = document.querySelector('#SearchStockForm');
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		
		if(formData.get('prtCd').length == 0 && formData.get('prtNm').length == 0) {
			alert("매장을 입력해 주세요");
			return false;
		}
		
		try {
	        const response = await fetch('/api/stocks/history/search', {
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
	
	//매장명 input 클릭시 팝업 오픈
	$.popupOpen($('#prtSearchBtn'),'450','500','/stock/prtPop','prtPopOpen');
} 

//매장별 재고 변경이력 feach
async function getList() {
	const prtCd = document.getElementById('prtCd').value
	
    try {
        const response = await fetch('/api/stocks/history',{
			method: 'POST',
			headers: {
            	'Content-Type': 'application/json'
            },
            body: JSON.stringify(prtCd)
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
					<span class="chgDt">${result.chgDt}</span>
					<span class="prdCd">${result.prdCd}</span>
					<span class="prdNm">${result.prdNm}</span>
					<span class="chgBfIvcoQty">${result.chgBfIvcoQty}</span>
					<span class="chgAfIvcoQty">${result.chgAfIvcoQty}</span>
					<span class="chgQty">${result.chgQty}</span>
					<span class="chgRsnCd">${result.chgRsnNm}</span>
					<span class="chgRsnDt">${result.chgRsnDt}</span>
				</div>
			`;
			element.insertAdjacentHTML('beforeend', template);
		});
	} else {
		element.innerHTML = `<p>검색결과가 없습니다.</p>`
	}
}

