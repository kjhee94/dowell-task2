window.onload = function () {
	//매장 검색 feach
	const searchBtn = document.querySelector('#prtSearchBtn');
	searchBtn.addEventListener('click', async function(event) {
		event.preventDefault();
		
		const keyword = document.getElementById('keyword').value
		
		try {
	        const response = await fetch('/api/stocks/prt/search', {
				method: 'POST',
				headers: {
                	'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(keyword)
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
	
	//form이 아니라 키보드 Enter 이벤트 따로 적용
	$.keydownEnter($('#keyword'),$('#prtSearchBtn'));
	
	//적용버튼 클릭시 데이터 저장
	const applyBtn = document.querySelector('#applyBtn');
	applyBtn.addEventListener('click', function(event) {
		let ckBox = document.querySelector('input[id^="checkbox"]:checked');

		if(ckBox == null) {
			alert("체크박스를 선택해 주세요.");
		}else {
			let prtCd = ckBox.parentNode.nextElementSibling.innerText;
			let prtNm = ckBox.parentNode.nextElementSibling.nextElementSibling.innerText;
			
			opener.document.getElementById("prtCd").value = prtCd;
			opener.document.getElementById("prtNm").value = prtNm;
			opener.document.getElementById("prdNm").focus();
			window.close();
		}
	})
}

//데이터 탬플릿
function displayData(res) {
	let element = document.querySelector("#result");
	element.innerHTML = "";
	
	if (res.length > 0) {
		res.forEach(function (result, index) {
			let template = `
				<div class="one-content">
					<span class="checkbox"><input id="checkbox"${index} type="checkbox"></span>
					<span class="prtCd">${result.prtCd}</span>
					<span class="prtNm">${result.prtNm}</span>
					<span class="prtSsNm">${result.prtSsNm}</span>
				</div>
			`;
			element.insertAdjacentHTML('beforeend', template);
		});
		
		//popup 검색 공통함수
		$.allPopSearchFunc();
		
	} else {
		element.innerHTML = `<p>해당하는 매장이 없습니다.</p>`
	}
	
}