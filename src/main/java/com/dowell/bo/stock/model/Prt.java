package com.dowell.bo.stock.model;

import lombok.Data;

@Data
public class Prt {
	private String prtCd;	//매장코드
	private String prtNm;	//매장명
	private String prtDtCd;	//거래처구분코드
	private String prtDtNm;	//거래처구분명
	private String prtSsCd;	//거래처상태코드
	private String prtSsNm;	//거래처상태명
}
