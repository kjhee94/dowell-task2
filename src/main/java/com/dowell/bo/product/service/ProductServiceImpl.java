package com.dowell.bo.product.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dowell.bo.product.mapper.ProductMapper;
import com.dowell.bo.product.model.Product;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductMapper productMapper;
	
	//모든 상품 조회
	@Override
	public List<Product> getProduct() {
		return productMapper.getProduct();
	}
	
	//특정 상품 검색
	@Override
	public List<Product> searchPrd(Product prd) {
		return productMapper.searchPrd(prd);
	}
	
	//제품 등록
	@Override
	@Transactional
	public boolean createProduct(Product prd) throws IllegalStateException, IOException {
        //제품코드 생성
        String prdCd = productMapper.getPrdCd();
        prd.setPrdCd(prdCd);
        
        //이미지 등록
        int uldRst = uploadImage(prd);
        //제품 등록
        int istRst = productMapper.createProduct(prd);
		
        if(uldRst==1 && istRst==1) {
        	return true;
        }else {
        	return false;
        }
	}
	
	//제품 수정
	@Override
	@Transactional
	public boolean updatePrd(Product prd) throws IllegalStateException, IOException {
		
		//이미지 새로 등록
		int uldRst = uploadImage(prd);
		int updRst = productMapper.updatePrd(prd);
		
		if(uldRst==1 && updRst==1) {
        	return true;
        }else {
        	return false;
        }
	}
	
	//제품 삭제
	@Override
	public int deletePrd(Integer[] prdCdList) {
		return productMapper.deletePrd(prdCdList);
	}
	
	//이미지 등록
	public int uploadImage(Product prd) throws IllegalStateException, IOException {
		log.info("uploadImage========================================");
		//파일 객체
        MultipartFile uploadFile = prd.getPrdImg();
        String prdCd = prd.getPrdCd();
        
        //이미지가 있을 경우 인입 시작
        if(!uploadFile.isEmpty()) {	
        	//이미지 useYn 'N'업데이트
    		productMapper.updateImgYn(prdCd);
    		
            //파일명 설정
            String orginFileName = uploadFile.getOriginalFilename();
	        Date now = new Date();
	        SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
	        //파일ID : 현재시각기준 yyMMddHHmmss
	        String prdImgId = sdf.format(now);
	        //파일명 : 상품코드_파일ID
	        String prdImgNm = prdCd+'_'+prdImgId;
	        String prdImgExt = orginFileName.substring(orginFileName.lastIndexOf(".")+1);
	        long prdImgSize = uploadFile.getSize();
	        
	        log.info("prdImgNm = {}", prdImgNm);
	        
	        //경로 설정
	        String prdImgAddr = "C:\\dev\\workspace\\stock\\stock\\src\\main\\resources\\static\\uploads\\"+prd.getPrdCd();
	        //폴더 없을 시 생성
	        File file = new File(prdImgAddr);
	        if(!file.exists()) file.mkdirs();
	        
	        String savePath = prdImgAddr+File.separator+prdImgNm+"."+prdImgExt;
	        uploadFile.transferTo(new File(savePath));
	        
	        //DB인입용 데이터 설정
	        prd.setPrdImgId(prdImgId);
	        prd.setPrdImgAddr(prdImgAddr);
	        prd.setPrdImgNm(prdImgNm);
	        prd.setPrdImgSize(prdImgSize);
	        prd.setPrdImgExt(prdImgExt);
	        
	        return productMapper.uploadImage(prd);
        }
        return 1;
	}
}
