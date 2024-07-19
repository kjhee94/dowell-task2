package com.dowell.bo.product.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Product {
	private String prdCd;		//상품코드
	private String prdNm;		//상품명
	private String prdTpCd;		//상품유형코드
	private String prdTpNm;		//상품유형
	private int prdCsmrUpr;		//상품소비자단가
	private int prdPchUpr;		//상품매입단가
	private String taxCsCd;		//세금분류코드
	private String taxCsNm;		//세금분류
	private String prdSsCd;		//상품상태코드
	private String prdSsNm;		//상품상태
	
	private MultipartFile prdImg;	//이미지 객체
	private String prdImgId;  	//이미지ID
	private String prdImgAddr;	//이미지주소
	private String prdImgNm;	//이미지명
	private long prdImgSize;	//이미지사이즈
	private String prdImgExt;	//이미지확장자
}
