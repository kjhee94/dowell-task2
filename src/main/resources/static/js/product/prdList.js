window.onload = function () {
	//페이지 온 로드 시 상품 목록 조회
	getList();
	
	//상품 검색 feach
	const form = document.querySelector('#SearchPrdForm');
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		
		try {
	        const response = await fetch('/api/products/search', {
				method: 'POST',
				headers: {
                	'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
					prdNm: formData.get('prdNm'),
		        	prdCd: formData.get('prdCd')
				})
			});
			console.log(response);
	        if (!response.ok) {
				//실패시 throw
	            throw new Error('Failed to fetch datas');
	        }
	        const res = await response.json();
	        displayData(res);
	    } catch (error) {
	        console.error('Error fetching datas:', error);
	        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
	    }
	});
	
	//상품 등록 버튼 클릭시 팝업 오픈
	$.popupOpen($('#prdAddBtn'),'700','540','/product/prdAddPop','prdAddPop');
	
	//상품 제거 feach
	const delbtn = document.querySelector('#prdDelBtn');
	delbtn.addEventListener('click', async function(event) {
		event.preventDefault();
		
		const ckGroup = document.querySelectorAll('input[name="ckGroup"]:checked');
        const prdCdList = [];
		
		if(ckGroup.length == 0) {
			alert("삭제할 상품을 체크해 주세요.");
		}else {
			if (confirm('판매 상품을 제거하시겠습니까?')){
				
	            ckGroup.forEach(function(checkbox) {
	                prdCdList.push(checkbox.id);
	            });
				
				console.log(prdCdList);
				
				try {
			        const response = await fetch('/api/products/delete', {
						method: 'POST',
						headers: {
		                	'Content-Type': 'application/json'
			            },
			            body: JSON.stringify(prdCdList)
					});
					console.log(response);
			        if (!response.ok) {
			            throw new Error('Failed to fetch datas');
			        }
			        alert("상품 제거가 완료되었습니다.");
			        location.reload();
			    } catch (error) {
			        console.error('Error fetching datas:', error);
			        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
			    }
			}
		}
	});
} 

//상품 전체 목록 feach
async function getList() {
    try {
        const response = await fetch('/api/products',{
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
				<div id="row${index}" class="one-content" ondblclick="prdUpdPop(${index})">
					<input type="hidden" name="prdTpCd" value="${result.prdTpCd}">
					<input type="hidden" name="prdSsCd" value="${result.prdSsCd}">
					<input type="hidden" name="taxCsCd" value="${result.taxCsCd}">
					<span class="checkbox"><input id="${result.prdCd}" type="checkbox" name="ckGroup"></span>
					<span class="prdCd">${result.prdCd}</span>
					<span class="prdNm">${result.prdNm}</span>
					<span class="prdTpNm">${result.prdTpNm}</span>
					<span class="prdSsNm">${result.prdSsNm}</span>
					<span class="prdCsmrUpr">${result.prdCsmrUpr.toLocaleString()}</span>
					<span class="prdPchUpr">${result.prdPchUpr.toLocaleString()}</span>
					<span class="taxCsNm">${result.taxCsNm}</span>
					<span class="prdImg"><a href="/api/products/download/${result.prdImgNm}">${result.prdImgNm}</a></span>
				</div>
			`;
			element.insertAdjacentHTML('beforeend', template);
		});
	} else {
		element.innerHTML = `<p>해당하는 상품이 없습니다.</p>`
	}
}

//상품 수정시 전달 객체 세팅
function prdUpdPop(index) {
	let element = document.getElementById('row'+index);
	
	const product = {
		prdCd: element.children[4].innerText,
        prdNm: element.children[5].innerText,
        prdCsmrUpr: element.children[8].innerText,
        prdPchUpr: element.children[9].innerText, 
        prdTpCd: element.children[0].value,
        prdSsCd: element.children[1].value,
        taxCsCd: element.children[2].value,
        prdImg: element.children[11].children[0].innerText,
	}
	
	localStorage.setItem('prdData', JSON.stringify(product));
	let option = 'width=700, height=550, top=50, left=50, location=no';
	let prdUpdPop = window.open('/product/prdUpdPop', 'prdUpdPopOpen', option);
}

//이미지 다운로드
function downloadImage(prdImgNm) {
	alert(prdImgNm);
	try {
        const response = fetch('/api/products/download'+prdImgNm, {
			method: 'POST',
			headers: {
            	'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				prdImgNm: prdImgNm
			})
		});
		console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch datas');
        }
    } catch (error) {
        console.error('Error fetching datas:', error);
        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
    }
}