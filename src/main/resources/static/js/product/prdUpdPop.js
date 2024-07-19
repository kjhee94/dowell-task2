window.onload = function () {
	//부모창에서 객제 받기
	const sendData = JSON.parse(localStorage.getItem('prdData'));
	//설정된 데이터 넣기
	document.getElementById("prdNm").value = sendData.prdNm;
	document.getElementById("prdCd").value = sendData.prdCd;
	document.getElementById("prdCsmrUpr").value = sendData.prdCsmrUpr;
	document.getElementById("prdPchUpr").value = sendData.prdPchUpr;
	document.getElementById("prdImg").innerText = sendData.prdImg;
	if($('input[name="prdTpCd"]:checked').val() != sendData.prdTpCd){
		$("input[name='prdTpCd']").each(function(e){
		    $(this).prop("checked", false);
		    $("input[name='prdTpCd'][value="+sendData.prdTpCd+"]").prop("checked",true);
		})
	}
	if($('input[name="taxCsCd"]:checked').val() != sendData.taxCsCd){
		$("input[name='taxCsCd']").each(function(e){
		    $(this).prop("checked", false);
		    $("input[name='taxCsCd'][value="+sendData.taxCsCd+"]").prop("checked",true);
		})
	}
	if($('input[name="prdSsCd"]:checked').val() != sendData.prdSsCd){
		$("input[name='prdSsCd']").each(function(e){
		    $(this).prop("checked", false);
		    $("input[name='prdSsCd'][value="+sendData.prdSsCd+"]").prop("checked",true);
		})
	}
	
	//유효성검사(숫자 유무)
	$.validEvent();
	
	//상품 수정 feach
	const form = document.querySelector('#prdUpdForm');
	form.addEventListener('submit', async function(event) {
		
		event.preventDefault();
		const formData = new FormData(form);
		const prdCsmrUpr = $.RmvCom(formData.get('prdCsmrUpr'));
		const prdPchUpr = $.RmvCom(formData.get('prdPchUpr'));
	
		formData.set('prdCsmrUpr',prdCsmrUpr);
		formData.set('prdPchUpr',prdPchUpr);
		
		if($.checkAll()){	//유효성체크
			try {
		        const response = await fetch('/api/products', {
					method: 'PUT',
					headers: {
	                	//'Content-Type': 'application/json'
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
					alert("수정이 완료되었습니다.");
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