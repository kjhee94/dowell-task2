window.onload = function () {
	//유효성검사(숫자 유무)
	$.validEvent();
	
	//상품 등록 feach
	const form = document.querySelector('#prdAddForm');
	form.addEventListener('submit', async function(event) {
		
		event.preventDefault();
		const formData = new FormData(form);
		const prdCsmrUpr = $.RmvCom(formData.get('prdCsmrUpr'));
		const prdPchUpr = $.RmvCom(formData.get('prdPchUpr'));
	
		formData.set('prdCsmrUpr',prdCsmrUpr);
		formData.set('prdPchUpr',prdPchUpr);
		
		if($.checkAll()){	//유효성체크 후 진행(빈칸 확인)
			try {
		        const response = await fetch('/api/products', {
					method: 'POST',
					headers: {
						//'Content-Type': 'application/json'
	                	//'Content-Type': 'multipart/form-data'
		            },
		            body: formData
				});
				console.log(response);
		        if (!response.ok) {
					if(response.status==403) {
						alert("이미지파일만 등록 가능합니다.");
					}else {
						throw new Error('Failed to fetch datas');
					}
		        }else {
					alert("등록이 완료되었습니다.");
			        window.close();
			        opener.location.reload();
				}
		    } catch (error) {
		        console.error('Error fetching datas:', error);
		        alert("에러코드 : "+error+" / 관리자에게 문의해 주세요." );
		    }
		}
	});
}

//파일 삭제
function delFile() {
	let file= $("input[type=file]");
	file.val("");
}