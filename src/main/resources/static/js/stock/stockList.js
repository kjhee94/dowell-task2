window.onload = function () {
	//페이지 온 로드 시 매장별 재고 목록 조회
	getList();
	
	//매장별 재고 검색 feach
	const form = document.querySelector('#SearchStockForm');
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		
		try {
	        const response = await fetch('/api/stocks/search', {
				method: 'POST',
				headers: {
                	'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
					prtNm: formData.get('prtNm'),
					prtCd: formData.get('prtCd'),
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

//매장별 재고 목록 feach
async function getList() {
    try {
        const response = await fetch('/api/stocks',{
			method: 'GET',
			headers: {
            	'Content-Type': 'application/json'
            }
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
				<div id="row${index}" class="one-content" ondblclick="stockUpdPop(${index})">
					<span class="prtCd">${result.prtCd}</span>
					<span class="prtNm">${result.prtNm}</span>
					<span class="prdCd">${result.prdCd}</span>
					<span class="prdNm">${result.prdNm}</span>
					<span class="ivcoQty">${result.ivcoQty}</span>
				</div>
			`;
			element.insertAdjacentHTML('beforeend', template);
		});
	} else {
		element.innerHTML = `<p>검색결과가 없습니다.</p>`
	}
}


//매장별 재고조정 페이지 오픈시 전달 객체 세팅
function stockUpdPop(index) {
	let element = document.getElementById('row'+index);
	
	const prtCd = element.children[0].innerText;
    const prtNm = element.children[1].innerText;
    const prdCd = element.children[2].innerText;
    const prdNm = element.children[3].innerText;
	
	location.href="/stock/stockUpd?prtCd="+prtCd+"&prtNm="+prtNm+"&prdCd="+prdCd+"&prdNm="+prdNm;
}