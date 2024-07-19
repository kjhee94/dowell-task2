package com.dowell.bo.stock.model;

import lombok.Data;

@Data
public class Stock {
	private String prtCd;		//매장코드
	private String prtNm;		//매장명
	private String prdCd;		//상품코드
	private String prdNm;		//상품명
	private int ivcoQty;		//IVCO_QTY
	private int chgBfIvcoQty;	//변경전재고수량
	private int chgAfIvcoQty;	//조정수량
	private int chgQty;			//변경후재고수량
	private String chgRsnCd;	//조정사유코드
	private String chgRsnNm;	//조정사유명
	private String chgRsnDt;	//기타조정사유
	private String chgDt;		//변경일자(YYYYMMDD)
}
